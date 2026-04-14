// import React, { useContext } from "react";
// import { StoreContext } from "../../context/StoreContext";
// import { toast } from "react-toastify";

// const OrderSummary = () => {
//   const { cart, clearCart } = useContext(StoreContext); // Access cart and clearCart from StoreContext
//   const cartItems = Object.values(cart); // Convert cart object to an array

//   // Calculate the total amount
//   const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

//   const handlePlaceOrder = () => {
//     // Replace with actual order placement logic if needed
//     toast.success("Order placed successfully!");
//     clearCart(); // Clear the cart after placing the order
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {cartItems.map((item) => (
//           <div
//             key={`${item.restaurantID}-${item.itemID}`}
//             className="border rounded p-4 shadow-md"
//           >
//             <h3 className="font-bold text-lg">{item.name}</h3>
//             <p className="text-gray-500">Price: ₹{item.price}</p>
//             <p className="text-gray-500">Quantity: {item.count}</p>
//             <p className="text-gray-500">
//               Subtotal: ₹{item.price * item.count}
//             </p>
//           </div>
//         ))}
//       </div>
//       <div className="mt-4">
//         <h3 className="text-lg font-bold">Total Amount: ₹{totalAmount}</h3>
//         <button
//           onClick={handlePlaceOrder}
//           className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;








// this file is not used ////



import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext"; // Make sure path is correct
import { toast } from "react-toastify";
import {
  FaShoppingCart,
  FaBox,
  FaRupeeSign,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Don't forget to import useNavigate!

const OrderSummary = () => {
  // Destructure user and token from StoreContext
  const { cart, clearCart, user, token } = useContext(StoreContext); // <--- HERE

  const cartItems = Object.values(cart);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
  const navigate = useNavigate(); // Make sure useNavigate is initialized

  const placeOrder = async () => {
    try {
      // Now 'user' and 'token' should be defined if they are properly set in context
      if (!user || !user.customerID) { // More robust check for user object presence
        toast.error("Customer ID is missing. Please log in again.");
        return;
      }

      if (!token) { // Ensure token exists for authenticated requests
        toast.error("Authentication token is missing. Please log in again.");
        return;
      }

      if (cartItems.length === 0) {
        toast.warn("Your cart is empty. Please add items before placing an order.");
        return;
      }

      // Check if all cart items belong to the same restaurant (important for a single order)
      const uniqueRestaurantIDs = new Set(cartItems.map(item => item.restaurantID));
      if (uniqueRestaurantIDs.size !== 1) {
          toast.error("All items in the cart must be from the same restaurant to place an order.");
          return;
      }

      const menuItemIDs = cartItems.flatMap((item) =>
        Array(item.count).fill(item.itemID)
      );

      const restaurantID = cartItems[0]?.restaurantID; // Safe access with optional chaining
      if (!restaurantID) {
        toast.error("Restaurant information missing for items in cart.");
        return;
      }

      const orderPayload = {
        customerID: user.customerID,
        restaurantID: restaurantID,
        menuItemIDs: menuItemIDs,
        status: "pending", // Initial status
      };

      console.log("Order Payload:", orderPayload);

      // --- 1. POST Order ---
      const response = await fetch("https://localhost:7274/api/Order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use the token from context
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Order API Error:", errorData);
        throw new Error(errorData.message || `Failed to place order: ${response.status} ${response.statusText}`);
      }

      const orderData = await response.json();
      console.log("Order Creation Response Data:", orderData); // Log the full response

      const orderID = orderData.orderID || orderData.$id; // Check for orderID or $id if your API returns $id
      if (!orderID) {
          throw new Error("Order ID not received from API response.");
      }

      // --- 2. PATCH Order Status to "confirmed" ---
      // Note: The body for PATCH is typically an array of operations for JSON Patch.
      // If your API expects a simple string for status, then your existing body might work,
      // but usually, it's an array of objects. Let's assume your API expects a string for simplicity,
      // but be aware this might need adjustment if your API uses standard JSON Patch.
      const patchResponse = await fetch(
        `https://localhost:7274/api/Order/${orderID}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json-patch+json", // This content type is specific to JSON Patch
            Authorization: `Bearer ${token}`,
          },
          // If your API expects a simple string, keep it as is:
          body: JSON.stringify("confirmed"),
          // If your API expects JSON Patch format, it might look like this:
          // body: JSON.stringify([
          //   { "op": "replace", "path": "/status", "value": "confirmed" }
          // ]),
        }
      );

      if (!patchResponse.ok) {
        const errorData = await patchResponse.json();
        console.error("Patch API Error:", errorData);
        throw new Error(errorData.message || `Failed to update order status: ${patchResponse.status} ${patchResponse.statusText}`);
      }
      console.log("Order status patched to 'confirmed'.");


      // --- 3. GET Order Details (to get paymentID) ---
      const getOrderResponse = await fetch(
        `https://localhost:7274/api/Order/${orderID}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!getOrderResponse.ok) {
        const errorData = await getOrderResponse.json();
        console.error("GET Order API Error:", errorData);
        throw new Error(`Failed to fetch order details after placement: ${errorData.message || getOrderResponse.statusText}`);
      }

      const orderDetails = await getOrderResponse.json();
      console.log("Full Order Details after GET:", orderDetails);

      const paymentID = orderDetails.payment?.paymentID || orderDetails.payment?.$id; // Adjust based on your API's payment object structure
      if (!paymentID) {
        throw new Error("Payment ID is missing in the order details after fetching. Check API response for payment structure.");
      }

      // --- Success actions ---
      toast.success("Order placed successfully! Redirecting to payment...");
      clearCart();
      // Navigate to payment page with the extracted paymentID
      navigate(`/customer-management/payment/${paymentID}`);

    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(`Failed to place order: ${error.message || "An unexpected error occurred."}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 transform transition duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center drop-shadow-md flex items-center justify-center">
          <FaShoppingCart className="mr-4" /> Order Summary
        </h2>

        {cartItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartItems.map((item) => (
                <div
                  key={`${item.restaurantID}-${item.itemID}`}
                  className="bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-sm flex flex-col justify-between transform transition duration-300 hover:shadow-md hover:scale-[1.02]"
                >
                  <h3 className="font-bold text-xl text-blue-700 mb-2 flex items-center">
                    <FaBox className="mr-2 text-blue-600" /> {item.name}
                  </h3>
                  <p className="text-gray-700 mb-1 flex items-center">
                    <strong className="font-semibold text-blue-700">Price:</strong>{" "}
                    <FaRupeeSign className="ml-1 mr-0.5" />{item.price}
                  </p>
                  <p className="text-gray-700 mb-1 flex items-center">
                    <strong className="font-semibold text-blue-700">Quantity:</strong> {item.count}
                  </p>
                  <p className="text-lg font-semibold text-gray-900 mt-2 flex items-center">
                    <strong className="text-blue-800">Subtotal:</strong>{" "}
                    <FaRupeeSign className="ml-1 mr-0.5" />{item.price * item.count}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t-2 border-blue-200 flex flex-col md:flex-row justify-between items-center">
              <h3 className="text-2xl font-bold text-blue-800 flex items-center mb-4 md:mb-0">
                Total Amount: <FaRupeeSign className="ml-2 mr-1" />{totalAmount}
              </h3>
                <button
                  onClick={placeOrder}
                  className="w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-8 rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out font-medium text-lg flex items-center justify-center"
                >
                  <FaCheckCircle className="mr-2" /> Place Order
                </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 text-xl py-8">
            Your cart is empty. Nothing to summarize!
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;