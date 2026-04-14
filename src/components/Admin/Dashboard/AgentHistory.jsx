
// import React, { useContext, useEffect, useState } from "react";
// import { StoreContext } from "../../context/StoreContext"; // Assuming you have a context for user and token
// import { toast } from "react-toastify";

// const OrderDetails = () => {
//   const { user, token } = useContext(StoreContext); // Fetch user and token from context
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch agent details (including orders) by email
//   const fetchAgentDetails = async () => {
//     if (!user?.email || user.role !== "agent") {
//       setError("Unauthorized access. Only agents can view this page.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch(`https://localhost:7274/api/Agent/${user.email}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Fetched agent details:", data); // Debugging log
//         // Map deliveries to extract orders
//         const orders = data.deliveries?.map((delivery) => ({
//           orderID: delivery.order?.orderID || "N/A",
//           customerName: delivery.order?.customer?.name || "N/A",
//           customerAddress: delivery.order?.customer?.address || "N/A",
//           customerPhone: delivery.order?.customer?.phone || "N/A",
//           restaurantName: delivery.order?.restaurant?.restaurantName || "N/A",
//           restaurantAddress: delivery.order?.restaurant?.address || "N/A",
//           totalAmount: delivery.order?.totalAmount || "0.00",
//           status: delivery.order?.status || "N/A",
//         })) || [];

//         setOrders(orders);
//       } else {
//         const errorText = await response.text();
//         console.error("Error response:", errorText); // Debugging log
//         toast.error("Failed to fetch agent details.");
//         setError("Failed to fetch agent details.");
//       }
//     } catch (err) {
//       console.error("Error fetching agent details:", err); // Debugging log
//       toast.error("An error occurred while fetching agent details.");
//       setError("An error occurred while fetching agent details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch agent details when the component mounts
//   useEffect(() => {
//     fetchAgentDetails();
//   }, [user, token]);

//   return (
//     <div className="min-h-screen bg-gray-900 p-8 font-sans text-gray-100 flex flex-col items-center">
//       <h1 className="text-4xl font-extrabold mb-8 text-center text-emerald-400 drop-shadow-lg">
//         Your Deliveries
//       </h1>
//       {loading ? (
//         <p className="text-center text-xl text-gray-300">Loading orders...</p>
//       ) : error ? (
//         <p className="text-red-400 text-center text-xl">Error: {error}</p>
//       ) : orders.length === 0 ? (
//         <p className="text-center text-xl text-gray-300">
//           No orders found for the agent.
//         </p>
//       ) : (
//         <div className="overflow-x-auto w-full max-w-7xl">
//           <table className="min-w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
//             <thead className="bg-gray-700 border-b border-gray-600">
//               <tr>
//                 <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">
//                   Order ID
//                 </th>
//                 <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">
//                   Restaurant
//                 </th>
//                 <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">
//                   Restaurant Address
//                 </th>
//                 <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">
//                   Customer
//                 </th>
//                 <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">
//                   Customer Address
//                 </th>
//                 <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">
//                   Customer Phone
//                 </th>
//                 <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">
//                   Total Price
//                 </th>
//                 <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order, index) => (
//                 <tr
//                   key={index}
//                   className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200 ease-in-out"
//                 >
//                   <td className="py-3 px-6 text-gray-200">{order.orderID}</td>
//                   <td className="py-3 px-6 text-gray-200">
//                     {order.restaurantName}
//                   </td>
//                   <td className="py-3 px-6 text-gray-200">
//                     {order.restaurantAddress}
//                   </td>
//                   <td className="py-3 px-6 text-gray-200">
//                     {order.customerName}
//                   </td>
//                   <td className="py-3 px-6 text-gray-200">
//                     {order.customerAddress}
//                   </td>
//                   <td className="py-3 px-6 text-gray-200">
//                     {order.customerPhone}
//                   </td>
//                   <td className="py-3 px-6 text-emerald-300 font-medium">
//                     ₹ {parseFloat(order.totalAmount).toFixed(2)}
//                   </td>
//                   <td className="py-3 px-6">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         order.status === "Pending"
//                           ? "bg-yellow-600 text-yellow-100"
//                           : order.status === "Delivered"
//                           ? "bg-green-600 text-green-100"
//                           : "bg-blue-600 text-blue-100"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderDetails;



import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const [searchParams] = useSearchParams();
  const agentEmail = searchParams.get("email"); // Get the agent's email from query parameters
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAgentDetails = async () => {
    try {
      const response = await fetch(
        `https://localhost:7274/api/Agent/${agentEmail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const orders = data.deliveries?.map((delivery) => ({
          orderID: delivery.order?.orderID || "N/A",
          customerName: delivery.order?.customer?.name || "N/A",
          customerAddress: delivery.order?.customer?.address || "N/A",
          customerPhone: delivery.order?.customer?.phone || "N/A",
          restaurantName: delivery.order?.restaurant?.restaurantName || "N/A",
          restaurantAddress: delivery.order?.restaurant?.address || "N/A",
          totalAmount: delivery.order?.totalAmount || "0.00",
          status: delivery.order?.status || "N/A",
        })) || [];
        setOrders(orders);
      } else {
        const errorText = await response.text();
        toast.error("Failed to fetch agent details.");
        setError("Failed to fetch agent details.");
      }
    } catch (err) {
      toast.error("An error occurred while fetching agent details.");
      setError("An error occurred while fetching agent details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (agentEmail) {
      fetchAgentDetails();
    } else {
      setError("Agent email is missing.");
      setLoading(false);
    }
  }, [agentEmail]);

  return (
    <div className="min-h-screen bg-gray-900 p-8 font-sans text-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-emerald-400 drop-shadow-lg">
        Deliveries for {agentEmail}
      </h1>
      {loading ? (
        <p className="text-center text-xl text-gray-300">Loading orders...</p>
      ) : error ? (
        <p className="text-red-400 text-center text-xl">Error: {error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-xl text-gray-300">
          No orders found for the agent.
        </p>
      ) : (
        <div className="overflow-x-auto w-full max-w-7xl">
          <table className="min-w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
            <thead className="bg-gray-700 border-b border-gray-600">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">
                  Order ID
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">
                  Restaurant
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">
                  Restaurant Address
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">
                  Customer
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">
                  Customer Address
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">
                  Customer Phone
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">
                  Total Price
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200 ease-in-out"
                >
                  <td className="py-3 px-6 text-gray-200">{order.orderID}</td>
                  <td className="py-3 px-6 text-gray-200">
                    {order.restaurantName}
                  </td>
                  <td className="py-3 px-6 text-gray-200">
                    {order.restaurantAddress}
                  </td>
                  <td className="py-3 px-6 text-gray-200">
                    {order.customerName}
                  </td>
                  <td className="py-3 px-6 text-gray-200">
                    {order.customerAddress}
                  </td>
                  <td className="py-3 px-6 text-gray-200">
                    {order.customerPhone}
                  </td>
                  <td className="py-3 px-6 text-emerald-300 font-medium">
                    ₹ {parseFloat(order.totalAmount).toFixed(2)}
                  </td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Pending"
                          ? "bg-yellow-600 text-yellow-100"
                          : order.status === "Delivered"
                          ? "bg-green-600 text-green-100"
                          : "bg-blue-600 text-blue-100"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;