

// import React, { useContext, useEffect, useState } from "react";
// import { StoreContext } from "../../context/StoreContext"; // Adjust path if necessary
// import { toast } from "react-toastify";
 
// const OrderHistory = () => {
//   // Destructure API from StoreContext to use the centralized Axios instance
//   const { user, token, API } = useContext(StoreContext);
//   const [orderHistory, setOrderHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
 
//   useEffect(() => {
//     const fetchOrderHistory = async () => {
//       // Ensure user details are available and the user is a 'customer'
//       if (user?.email && user.role === "customer") {
//         try {
//           // Use the centralized API instance. Axios automatically includes the Authorization header
//           // because of the interceptor set up in StoreContext.
//           const response = await API.get(`/Customer/${user.email}`);
 
//           // Axios treats 2xx status codes as success; data is in response.data
//           if (response.status === 200) {
//             const data = response.data;
//             console.log("Fetched customer data with orders:", data); // Debugging: See the full customer object
 
//             // Check if data.orders exists before attempting to sort
//             const sortedOrders = data.orders
//               ? [...data.orders].sort((a, b) => {
//                   const dateA = new Date(a.delivery.estimatedTimeOfArrival);
//                   const dateB = new Date(b.delivery.estimatedTimeOfArrival);
//                   return dateB.getTime() - dateA.getTime(); // Descending order (latest first)
//                 })
//               : [];
 
//             setOrderHistory(sortedOrders);
//           } else {
//             // This toast might be redundant as Axios usually throws for non-2xx
//             toast.error("Failed to fetch order history.");
//           }
//         } catch (error) {
//           // Log specific Axios error details if available
//           console.error("Error fetching order history:", error.response?.data || error.message);
//           toast.error("An error occurred while fetching order history.");
//         } finally {
//           setLoading(false); // Always stop loading, whether success or error
//         }
//       } else {
//         // If not a customer or email is missing, stop loading and set empty orders
//         setLoading(false);
//         setOrderHistory([]);
//         // Optional: inform user if they are not logged in as a customer
//         if (!user || user.role !== "customer") {
//           toast.info("Please log in as a customer to view your order history.");
//         }
//       }
//     };
 
//     fetchOrderHistory();
//     // Dependencies: Re-run when user or token changes. API is stable but included for completeness.
//   }, [user, token, API]);
 
//   // Conditional rendering based on loading and order history state
//   if (loading) {
//     return <p>Loading order history...</p>;
//   }
 
//   if (orderHistory.length === 0) {
//     return <p>No orders found.</p>;
//   }
 
//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6">Order History</h2>
//       {orderHistory.map((order) => (
//         <div
//           key={order.orderID}
//           className="bg-white p-6 rounded-lg shadow-md mb-4"
//         >
//           <h3 className="text-xl font-bold mb-2">
//             Order ID: {order.orderID} - Status: {order.status}
//           </h3>
//           <p className="mb-2">
//             <strong>Restaurant:</strong> {order.restaurant?.restaurantName || "N/A"}
//           </p>
//           <p className="mb-2">
//             <strong>Contact:</strong> {order.restaurant?.restaurantContact || "N/A"}
//           </p>
//           <p className="mb-2">
//             <strong>Address:</strong> {order.restaurant?.address || "N/A"}
//           </p>
//           <p className="mb-2">
//             <strong>Total Amount:</strong> ₹{order.totalAmount}
//           </p>
//           <p className="mb-2">
//             <strong>Delivery Status:</strong> {order.delivery?.status || "N/A"}
//           </p>
//           <p className="mb-2">
//             <strong>ETA:</strong>{" "}
//             {/* Check if delivery and estimatedTimeOfArrival exist before formatting */}
//             {order.delivery?.estimatedTimeOfArrival
//               ? new Date(order.delivery.estimatedTimeOfArrival).toLocaleString()
//               : "N/A"}
//           </p>
//           <h4 className="text-lg font-bold mt-4">Ordered Items:</h4>
//           <ul className="list-disc pl-6">
//             {order.orderMenuItems?.length > 0 ? (
//               order.orderMenuItems.map((orderMenuItem) => (
//                 <li key={orderMenuItem.itemID} className="mb-2">
//                   <p>
//                     <strong>{orderMenuItem.menuItem?.name || "N/A"}</strong> - ₹
//                     {orderMenuItem.menuItem?.price || "0"} (Quantity:{" "}
//                     {orderMenuItem.quantity})
//                   </p>
//                   <p className="text-gray-600">
//                     {orderMenuItem.menuItem?.description || "No description"}
//                   </p>
//                 </li>
//               ))
//             ) : (
//               <li>No items found for this order.</li>
//             )}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };
 
// export default OrderHistory;






////////////////// main //////////////////

// import React, { useContext, useEffect, useState } from "react";
// import { StoreContext } from "../../context/StoreContext"; // Adjust path if necessary
// import { toast } from "react-toastify";

// const OrderHistory = () => {
//   const { user, token, API } = useContext(StoreContext); // Access user, token, and API from context
//   const [activeOrders, setActiveOrders] = useState([]); // State for active orders
//   const [orderHistory, setOrderHistory] = useState([]); // State for order history
//   const [loading, setLoading] = useState(true); // State to manage loading

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (user?.email && user.role === "customer") {
//         try {
//           const response = await API.get(`/Customer/${user.email}`);

//           if (response.status === 200) {
//             const data = response.data;

//             if (data.orders && Array.isArray(data.orders)) {
//               // Filter active orders and order history
//               const activeOrders = data.orders
//                 .filter(
//                   (order) =>
//                     order.payment?.status === "Completed" &&
//                     order.delivery?.status !== "delivered"
//                 )
//                 .sort((a, b) => {
//                   const dateA = new Date(a.delivery.estimatedTimeOfArrival);
//                   const dateB = new Date(b.delivery.estimatedTimeOfArrival);
//                   return dateB - dateA; // Sort by latest first
//                 });

//               const historyOrders = data.orders
//                 .filter((order) => order.delivery?.status === "delivered")
//                 .sort((a, b) => {
//                   const dateA = new Date(a.delivery.estimatedTimeOfArrival);
//                   const dateB = new Date(b.delivery.estimatedTimeOfArrival);
//                   return dateB - dateA; // Sort by latest first
//                 });

//               setActiveOrders(activeOrders); // Set active orders
//               setOrderHistory(historyOrders); // Set order history
//             } else {
//               toast.error("No orders found.");
//             }
//           } else {
//             toast.error("Failed to fetch orders.");
//           }
//         } catch (error) {
//           console.error("Error fetching orders:", error.response?.data || error.message);
//           toast.error("An error occurred while fetching orders.");
//         } finally {
//           setLoading(false); // Stop loading
//         }
//       } else {
//         setLoading(false);
//         setActiveOrders([]);
//         setOrderHistory([]);
//         if (!user || user.role !== "customer") {
//           toast.info("Please log in as a customer to view your orders.");
//         }
//       }
//     };

//     fetchOrders();
//   }, [user, token, API]);

//   if (loading) {
//     return <p>Loading orders...</p>;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6">Active Orders</h2>
//       {activeOrders.length > 0 ? (
//         activeOrders.map((order) => (
//           <div
//             key={order.orderID}
//             className="bg-white p-6 rounded-lg shadow-md mb-4"
//           >
//             <h3 className="text-xl font-bold mb-2">
//               Order ID: {order.orderID}
//             </h3>
//             <p className="mb-2">
//               <strong>Restaurant:</strong> {order.restaurant?.restaurantName || "N/A"}
//             </p>
//             <p className="mb-2">
//               <strong>Contact:</strong> {order.restaurant?.restaurantContact || "N/A"}
//             </p>
//             <p className="mb-2">
//               <strong>Address:</strong> {order.restaurant?.address || "N/A"}
//             </p>
//             <p className="mb-2">
//               <strong>Total Amount:</strong> ₹{order.totalAmount}
//             </p>
//             <p className="mb-2">
//               <strong>Payment Status:</strong> {order.payment?.status || "N/A"}
//             </p>
//             <p className="mb-2">
//               <strong>Delivery Status:</strong> {order.delivery?.status || "N/A"}
//             </p>
//             <p className="mb-2">
//               <strong>ETA:</strong>{" "}
//               {order.delivery?.estimatedTimeOfArrival
//                 ? new Date(order.delivery.estimatedTimeOfArrival).toLocaleString()
//                 : "N/A"}
//             </p>
//             <h4 className="text-lg font-bold mt-4">Ordered Items:</h4>
//             <ul className="list-disc pl-6">
//               {order.orderMenuItems?.length > 0 ? (
//                 order.orderMenuItems.map((orderMenuItem) => (
//                   <li key={orderMenuItem.itemID} className="mb-2">
//                     <p>
//                       <strong>{orderMenuItem.menuItem?.name || "N/A"}</strong> - ₹
//                       {orderMenuItem.menuItem?.price || "0"} (Quantity:{" "}
//                       {orderMenuItem.quantity})
//                     </p>
//                     <p className="text-gray-600">
//                       {orderMenuItem.menuItem?.description || "No description"}
//                     </p>
//                   </li>
//                 ))
//               ) : (
//                 <li>No items found for this order.</li>
//               )}
//             </ul>
//           </div>
//         ))
//       ) : (
//         <p>No active orders available.</p>
//       )}

//       <h2 className="text-3xl font-bold mt-8 mb-6">Order History</h2>
//       {orderHistory.length > 0 ? (
//         orderHistory.map((order) => (
//           <div
//             key={order.orderID}
//             className="bg-gray-100 p-6 rounded-lg shadow-md mb-4"
//           >
//             <h3 className="text-xl font-bold mb-2">
//               Order ID: {order.orderID}
//             </h3>
//             <p className="mb-2">
//               <strong>Restaurant:</strong> {order.restaurant?.restaurantName || "N/A"}
//             </p>
//             <p className="mb-2">
//               <strong>Contact:</strong> {order.restaurant?.restaurantContact || "N/A"}
//             </p>
//             <p className="mb-2">
//               <strong>Address:</strong> {order.restaurant?.address || "N/A"}
//             </p>
//             <p className="mb-2">
//               <strong>Total Amount:</strong> ₹{order.totalAmount}
//             </p>
//             <p className="mb-2">
//               <strong>Payment Status:</strong> {order.payment?.status || "N/A"}
//             </p>
//             <p className="mb-2">
//               <strong>Delivery Status:</strong> {order.delivery?.status || "N/A"}
//             </p>
//             <p className="mb-2">
//               <strong>ETA:</strong>{" "}
//               {order.delivery?.estimatedTimeOfArrival
//                 ? new Date(order.delivery.estimatedTimeOfArrival).toLocaleString()
//                 : "N/A"}
//             </p>
//             <h4 className="text-lg font-bold mt-4">Ordered Items:</h4>
//             <ul className="list-disc pl-6">
//               {order.orderMenuItems?.length > 0 ? (
//                 order.orderMenuItems.map((orderMenuItem) => (
//                   <li key={orderMenuItem.itemID} className="mb-2">
//                     <p>
//                       <strong>{orderMenuItem.menuItem?.name || "N/A"}</strong> - ₹
//                       {orderMenuItem.menuItem?.price || "0"} (Quantity:{" "}
//                       {orderMenuItem.quantity})
//                     </p>
//                     <p className="text-gray-600">
//                       {orderMenuItem.menuItem?.description || "No description"}
//                     </p>
//                   </li>
//                 ))
//               ) : (
//                 <li>No items found for this order.</li>
//               )}
//             </ul>
//           </div>
//         ))
//       ) : (
//         <p>No order history available.</p>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;










/////////////////test //////////////



import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext"; // Adjust path if necessary
import { toast } from "react-toastify";
import {
  FaHistory, // Icon for overall history heading
  FaBoxOpen, // Icon for active orders section
  FaClipboardList, // Icon for order history section
  FaUtensils, // Icon for restaurant name
  FaPhone, // Icon for contact
  FaMapMarkerAlt, // Icon for address
  FaMoneyBillWave, // Icon for total amount
  FaCreditCard, // Icon for payment status
  FaMotorcycle, // Icon for delivery status
  FaClock, // Icon for ETA
  FaShoppingCart, // Icon for ordered items heading
  FaRupeeSign, // Icon for price
} from "react-icons/fa"; // Importing icons

const OrderHistory = () => {
  const { user, token, API } = useContext(StoreContext); // Access user, token, and API from context
  const [activeOrders, setActiveOrders] = useState([]); // State for active orders
  const [orderHistory, setOrderHistory] = useState([]); // State for order history
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.email && user.role === "customer") {
        try {
          const response = await API.get(`/Customer/${user.email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            const data = response.data;

            if (data.orders && Array.isArray(data.orders)) {
              // Sort by latest orderDate first
              const sortedOrders = [...data.orders].sort((a, b) => {
                const dateA = new Date(a.orderDate);
                const dateB = new Date(b.orderDate);
                return dateB - dateA;
              });

              const active = sortedOrders.filter(
                (order) =>
                  order.payment?.status === "Completed" &&
                  order.delivery?.status !== "delivered"
              );

              const history = sortedOrders.filter(
                (order) => order.delivery?.status === "delivered"
              );

              setActiveOrders(active);
              setOrderHistory(history);
            } else {
              toast.info("No orders found for your account.");
            }
          } else {
            toast.error("Failed to fetch order details.");
          }
        } catch (error) {
          console.error("Error fetching orders:", error.response?.data || error.message);
          toast.error("An error occurred while fetching your orders.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setActiveOrders([]);
        setOrderHistory([]);
        if (!user || user.role !== "customer") {
          toast.info("Please log in as a customer to view your orders.");
        }
      }
    };

    fetchOrders();
  }, [user, token, API]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <p className="text-center text-gray-600 text-xl py-8">
          Loading your order details...
        </p>
      </div>
    );
  }

  const renderOrderDetails = (order, isHistory = false) => (
    <div
      key={order.orderID}
      className={`p-6 rounded-lg border shadow-sm mb-4 transform transition duration-300 ${
        isHistory
          ? "bg-gray-50 border-gray-200 opacity-90 hover:shadow-md hover:opacity-100"
          : "bg-blue-50 border-blue-200 hover:shadow-md hover:scale-[1.01]"
      }`}
    >
      <h4
        className={`text-xl font-bold mb-3 ${isHistory ? "text-gray-800" : "text-blue-800"}`}
      >
        Order ID: {order.orderID}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-gray-800">
        <p className="flex items-center">
          <FaUtensils className={`${isHistory ? "text-gray-600" : "text-blue-600"} mr-2`} />
          <strong className={`font-semibold ${isHistory ? "text-gray-700" : "text-blue-700"}`}>Restaurant:</strong>{" "}
          {order.restaurant?.restaurantName || "N/A"}
        </p>
        <p className="flex items-center">
          <FaPhone className={`${isHistory ? "text-gray-600" : "text-blue-600"} mr-2`} />
          <strong className={`font-semibold ${isHistory ? "text-gray-700" : "text-blue-700"}`}>Contact:</strong>{" "}
          {order.restaurant?.restaurantContact || "N/A"}
        </p>
        {/* Address now spans full width to ensure proper alignment */}
        <p className="flex items-start col-span-full">
          <FaMapMarkerAlt className={`${isHistory ? "text-gray-600" : "text-blue-600"} mr-2 mt-1`} />
          <strong className={`font-semibold ${isHistory ? "text-gray-700" : "text-blue-700"} flex-shrink-0`}>Address:</strong>{" "}
          <span className="flex-grow">{order.restaurant?.address || "N/A"}</span>
        </p>
        <p className="flex items-center">
          <FaMoneyBillWave className="text-green-600 mr-2" />
          <strong className={`font-semibold ${isHistory ? "text-gray-700" : "text-blue-700"}`}>Total Amount:</strong>{" "}
          <span className="flex items-center"> <FaRupeeSign className="ml-1 mr-0.5" />{order.totalAmount}</span>
        </p>
        <p className="flex items-center">
          <FaCreditCard className="text-purple-600 mr-2" />
          <strong className={`font-semibold ${isHistory ? "text-gray-700" : "text-blue-700"}`}>Payment Status:</strong>{" "}
          <span className={`font-medium ${order.payment?.status === "Completed" ? "text-green-700" : "text-red-700"}`}>
            {order.payment?.status || "N/A"}
          </span>
        </p>
        <p className="flex items-center">
          <FaMotorcycle className={`${isHistory ? "text-gray-600" : "text-orange-600"} mr-2`} />
          <strong className={`font-semibold ${isHistory ? "text-gray-700" : "text-blue-700"}`}>Delivery Status:</strong>{" "}
          <span className={`font-medium ${isHistory ? "text-green-700" : "text-orange-700"}`}>
            {order.delivery?.status || "N/A"}
          </span>
        </p>
        <p className="flex items-center">
          <FaClock className={`${isHistory ? "text-gray-600" : "text-blue-600"} mr-2`} />
          <strong className={`font-semibold ${isHistory ? "text-gray-700" : "text-blue-700"}`}>{isHistory ? "Delivered On:" : "ETA:"}</strong>{" "}
          {order.delivery?.estimatedTimeOfArrival
            ? new Date(order.delivery.estimatedTimeOfArrival).toLocaleString()
            : "N/A"}
        </p>
      </div>
      <h4
        className={`text-xl font-bold mt-6 mb-3 flex items-center border-t pt-4 ${isHistory ? "text-gray-800 border-gray-200" : "text-blue-800 border-blue-200"}`}
      >
        <FaShoppingCart className={`mr-2 ${isHistory ? "text-gray-600" : "text-blue-600"}`} /> Ordered Items:
      </h4>
      <ul className={`list-disc pl-8 space-y-2 ${isHistory ? "text-gray-700" : "text-gray-800"}`}>
        {order.orderMenuItems?.length > 0 ? (
          order.orderMenuItems.map((orderMenuItem) => (
            <li key={orderMenuItem.itemID}>
              <p className="font-medium">
                <strong className="text-gray-900">
                  {orderMenuItem.menuItem?.name || "N/A"}
                </strong>{" "}
                - <FaRupeeSign className="inline-block" />
                {orderMenuItem.menuItem?.price || "0"} (Quantity:{" "}
                {orderMenuItem.quantity})
              </p>
              {orderMenuItem.menuItem?.description && (
                <p className={`text-sm italic ${isHistory ? "text-gray-500" : "text-gray-600"}`}>
                  "{orderMenuItem.menuItem.description}"
                </p>
              )}
            </li>
          ))
        ) : (
          <li className={`${isHistory ? "text-gray-500" : "text-gray-600"}`}>No items found for this order.</li>
        )}
      </ul>
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 transform transition duration-500 ">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center drop-shadow-md flex items-center justify-center">
          <FaHistory className="mr-4" /> Your Order History
        </h2>

        {/* Active Orders Section */}
        <div className="mb-10">
          <h3 className="text-3xl font-bold text-blue-700 mb-6 flex items-center">
            <FaBoxOpen className="mr-3 text-blue-600" /> Active Orders
          </h3>
          {activeOrders.length > 0 ? (
            activeOrders.map((order) => renderOrderDetails(order, false))
          ) : (
            <p className="text-center text-gray-600 text-lg py-4">
              You currently have no active orders.
            </p>
          )}
        </div>

        {/* Order History Section */}
        <div>
          <h3 className="text-3xl font-bold text-blue-700 mb-6 flex items-center border-t pt-8 mt-8 border-blue-200">
            <FaClipboardList className="mr-3 text-blue-600" /> Past Orders
          </h3>
          {orderHistory.length > 0 ? (
            orderHistory.map((order) => renderOrderDetails(order, true))
          ) : (
            <p className="text-center text-gray-600 text-lg py-4">
              You have no past orders.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;