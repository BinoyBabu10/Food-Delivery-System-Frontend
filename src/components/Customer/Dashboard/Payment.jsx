// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify"; // Import toast for notifications
// import "react-toastify/dist/ReactToastify.css"; // Import toast styles
 
// const Payment = () => {
//   const { paymentID } = useParams();
//   const [paymentDetails, setPaymentDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
 
//   useEffect(() => {
//     const fetchPaymentDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://localhost:7274/api/Payment/${paymentID}/search`
//         );
 
//         if (!response.ok) {
//           throw new Error("Failed to fetch payment details");
//         }
 
//         const data = await response.json();
//         setPaymentDetails(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching payment details:", error);
//         toast.error("Failed to fetch payment details. Please try again.");
//         setLoading(false);
//       }
//     };
 
//     fetchPaymentDetails();
//   }, [paymentID]);
 
//   const updatePaymentStatus = async () => {
//     try {
//       const response = await fetch(
//         `https://localhost:7274/api/Payment/${paymentID}/status`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json-patch+json",
//           },
//           body: JSON.stringify("completed"),
//         }
//       );
 
//       if (!response.ok) {
//         throw new Error("Failed to update payment status");
//       }
 
//       toast.success("Payment completed and order placed successfully!");
//       navigate("/customer-management/order-history");
//     } catch (error) {
//       console.error("Error updating payment status:", error);
//       toast.error("Failed to update payment status. Please try again.");
//     }
//   };
 
//   if (loading) {
//     return <p>Loading payment details...</p>;
//   }
 
//   return (
//     <div className="mt-4">
//       <h2 className="text-xl font-bold mb-2">Payment Details</h2>
//       {paymentDetails ? (
//         <div className="border rounded p-4 shadow-md">
//           <p><strong>Payment ID:</strong> {paymentDetails.paymentID}</p>
//           <p><strong>Order ID:</strong> {paymentDetails.orderID}</p>
//           <p><strong>Customer Name:</strong> {paymentDetails.order.customer.name}</p>
//           <p><strong>Restaurant Name:</strong> {paymentDetails.order.restaurant.restaurantName}</p>
//           <p><strong>Payment Amount:</strong> ₹{paymentDetails.amount}</p>
//           <p><strong>Payment Method:</strong> {paymentDetails.paymentMethod}</p>
//           <button
//             onClick={updatePaymentStatus}
//             className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
//           >
//             Complete Payment
//           </button>
//         </div>
//       ) : (
//         <p>Payment details not found.</p>
//       )}
//     </div>
//   );
// };
 
// export default Payment;
 




/////////// test ///////////



// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { StoreContext } from "../../context/StoreContext";
// import { toast } from "react-toastify";
// import {
//   FaShoppingCart,
//   FaTrash,
//   FaMapMarkerAlt,
//   FaCheckCircle,
//   FaRupeeSign,
//   FaPlus,
//   FaMinus
// } from "react-icons/fa";

// const Cart = () => {
//   const { cart, removeFromCart, clearCart, user, token, addToCart, removeAllOfItemFromCart } = useContext(StoreContext);

//   // --- IMPORTANT CHANGE HERE ---
//   // Filter out items with count 0 before displaying or calculating total
//   const cartItems = Object.values(cart).filter(item => item.count > 0);
//   // --- END IMPORTANT CHANGE ---

//   const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

//   const placeOrder = async () => {
//     try {
//       if (!user?.customerID) {
//         toast.error("Customer ID is missing. Please log in again.");
//         return;
//       }

//       if (cartItems.length === 0) {
//         toast.warn("Your cart is empty. Please add items before placing an order.");
//         return;
//       }

//       const menuItemIDs = cartItems.flatMap((item) =>
//         Array(item.count).fill(item.itemID)
//       );

//       const restaurantID = cartItems[0]?.restaurantID;
//       if (!restaurantID) {
//         toast.error("Restaurant information missing for items in cart.");
//         return;
//       }

//       const orderPayload = {
//         customerID: user.customerID,
//         restaurantID: restaurantID,
//         menuItemIDs: menuItemIDs,
//         status: "pending",
//       };

//       const response = await fetch("https://localhost:7274/api/Order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(orderPayload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to place order");
//       }

//       const orderData = await response.json();
//       const orderID = orderData.orderID;

//       const patchResponse = await fetch(
//         `https://localhost:7274/api/Order/${orderID}/status`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json-patch+json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify("confirmed"),
//         }
//       );

//       if (!patchResponse.ok) {
//         const errorData = await patchResponse.json();
//         throw new Error(errorData.message || "Failed to update order status");
//       }

//       const getOrderResponse = await fetch(
//         `https://localhost:7274/api/Order/${orderID}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!getOrderResponse.ok) {
//         throw new Error("Failed to fetch order details after placement.");
//       }

//       const orderDetails = await getOrderResponse.json();
//       const paymentID = orderDetails.payment.paymentID;

//       clearCart();
//       navigate(`/customer-management/payment/${paymentID}`);
//     } catch (error) {
//       console.error("Error placing order:", error);
//       toast.error(`Failed to place order: ${error.message || "An unknown error occurred."}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 transform transition duration-500 hover:scale-105">
//         <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center drop-shadow-md flex items-center justify-center">
//           <FaShoppingCart className="mr-4" /> Your Cart
//         </h2>

//         {cartItems.length > 0 ? (
//           <>
//             <div className="space-y-6">
//               {cartItems.map((item) => (
//                 <div
//                   key={`${item.restaurantID}-${item.itemID}`}
//                   className="bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-sm flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4"
//                 >
//                   <div className="flex-grow">
//                     <h3 className="font-bold text-xl text-blue-700 mb-1">{item.name}</h3>
//                     <p className="text-gray-700 flex items-center mb-1">
//                       <FaRupeeSign className="text-green-600 mr-2" />
//                       <strong className="font-semibold text-blue-700">Price:</strong> ₹{item.price}
//                     </p>
//                     <p className="text-gray-700 mb-1">
//                       <strong className="font-semibold text-blue-700">Restaurant:</strong> {item.restaurant?.restaurantName || "Unknown"}
//                     </p>
//                     <div className="flex items-center space-x-2 mt-2">
//                       <strong className="font-semibold text-blue-700">Quantity:</strong>
//                       <button
//                         onClick={() => removeFromCart(item.restaurantID, item.itemID)}
//                         className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200"
//                         aria-label="Decrement quantity"
//                       >
//                         <FaMinus size={14} />
//                       </button>
//                       <span className="font-bold text-lg text-blue-800">{item.count}</span>
//                       <button
//                         onClick={() => addToCart(item)}
//                         className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200"
//                         aria-label="Increment quantity"
//                       >
//                         <FaPlus size={14} />
//                       </button>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => removeAllOfItemFromCart(item.restaurantID, item.itemID)}
//                     className="bg-gradient-to-r from-red-500 to-rose-600 text-white py-2 px-6 rounded-lg hover:from-red-600 hover:to-rose-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 ease-in-out font-medium text-lg flex items-center justify-center"
//                   >
//                     <FaTrash className="mr-2" /> Remove Item
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-8 pt-6 border-t-2 border-blue-200 flex flex-col md:flex-row justify-between items-center">
//               <h3 className="text-2xl font-bold text-green-600 flex items-center mb-4 md:mb-0">
//                 Total Amount: <FaRupeeSign className="ml-2 mr-1 text-green-600" />{totalAmount}
//               </h3>
//               <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
//                 <button
//                   onClick={() => navigate("/customer-management/select-location")}
//                   className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-8 rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out font-medium text-lg flex items-center justify-center"
//                 >
//                   <FaMapMarkerAlt className="mr-2" /> Select Location
//                 </button>
//                 <button
//                   onClick={placeOrder}
//                   className="w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-8 rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out font-medium text-lg flex items-center justify-center"
//                 >
//                   <FaCheckCircle className="mr-2" /> Place Order
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <p className="text-center text-gray-600 text-xl py-8">
//             Your cart is empty. Start adding some delicious food!
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;



//Abhishek


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import {
  FaCreditCard, // Main icon for payment
  FaReceipt, // Icon for payment ID
  FaShoppingCart, // Icon for order ID
  FaUser, // Icon for customer name
  FaUtensils, // Icon for restaurant name
  FaMoneyBillWave, // Icon for amount
  FaWallet, // Icon for payment method
  FaCheckCircle, // Icon for complete payment button
  FaRupeeSign, // Icon for Rupee symbol
} from "react-icons/fa"; // Importing icons

const Payment = () => {
  const { paymentID } = useParams();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(
          `https://localhost:7274/api/Payment/${paymentID}/search`
        );
 
        if (!response.ok) {
          throw new Error("Failed to fetch payment details");
        }
 
        const data = await response.json();
        setPaymentDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment details:", error);
        toast.error("Failed to fetch payment details. Please try again.");
        setLoading(false);
      }
    };
 
    fetchPaymentDetails();
  }, [paymentID]);
 
  const updatePaymentStatus = async () => {
    try {
      const response = await fetch(
        `https://localhost:7274/api/Payment/${paymentID}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json-patch+json",
          },
          body: JSON.stringify("completed"),
        }
      );
 
      if (!response.ok) {
        throw new Error("Failed to update payment status");
      }
 
      toast.success("Payment completed and order placed successfully!");
      navigate("/customer-management/order-history");
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Failed to update payment status. Please try again.");
    }
  };
 
  if (loading) {
    return <p>Loading payment details...</p>;
  }



  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 transform transition duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center drop-shadow-md flex items-center justify-center">
          <FaCreditCard className="mr-4" /> Payment Details
        </h2>

        {paymentDetails ? (
          <div className="space-y-4">
            <p className="flex items-center text-gray-700 text-lg">
              <FaReceipt className="text-blue-600 mr-3" />
              <strong className="font-semibold text-blue-700">Payment ID:</strong>{" "}
              <span className="ml-2 font-medium">{paymentDetails.paymentID}</span>
            </p>
            <p className="flex items-center text-gray-700 text-lg">
              <FaShoppingCart className="text-blue-600 mr-3" />
              <strong className="font-semibold text-blue-700">Order ID:</strong>{" "}
              <span className="ml-2 font-medium">{paymentDetails.orderID}</span>
            </p>
            {paymentDetails.order?.customer?.name && (
              <p className="flex items-center text-gray-700 text-lg">
                <FaUser className="text-blue-600 mr-3" />
                <strong className="font-semibold text-blue-700">Customer Name:</strong>{" "}
                <span className="ml-2 font-medium">{paymentDetails.order.customer.name}</span>
              </p>
            )}
            {paymentDetails.order?.restaurant?.restaurantName && (
              <p className="flex items-center text-gray-700 text-lg">
                <FaUtensils className="text-blue-600 mr-3" />
                <strong className="font-semibold text-blue-700">Restaurant Name:</strong>{" "}
                <span className="ml-2 font-medium">{paymentDetails.order.restaurant.restaurantName}</span>
              </p>
            )}
            <p className="flex items-center text-gray-700 text-lg">
              <FaMoneyBillWave className="text-green-600 mr-3" />
              <strong className="font-semibold text-blue-700">Payment Amount:</strong>{" "}
              <span className="ml-2 font-medium flex items-center">
                <FaRupeeSign className="mr-0.5" />{paymentDetails.amount}
              </span>
            </p>
            <p className="flex items-center text-gray-700 text-lg">
              <FaWallet className="text-blue-600 mr-3" />
              <strong className="font-semibold text-blue-700">Payment Method:</strong>{" "}
              <span className="ml-2 font-medium">{paymentDetails.paymentMethod || "N/A"}</span>
            </p>

            {paymentDetails.status !== "completed" && ( // Only show button if not already completed
              <button
                onClick={updatePaymentStatus}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-8 rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out font-medium text-lg flex items-center justify-center mt-6"
              >
                <FaCheckCircle className="mr-2" /> Complete Payment
              </button>
            )}
            {paymentDetails.status === "completed" && (
                <p className="text-center text-green-700 text-xl font-semibold mt-6">
                    <FaCheckCircle className="inline-block mr-2" /> Payment Already Completed
                </p>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl py-8">
            Payment details not found or an error occurred.
          </p>
        )}
      </div>
    </div>
  );
};

export default Payment;