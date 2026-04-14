// import React, { useContext, useEffect, useState } from "react";
// import { StoreContext } from "../../context/StoreContext";
// import { toast } from "react-toastify";
// import {
//   FaChartLine,
//   FaRupeeSign,
//   FaClipboardList,
//   FaStar,
//   FaUtensils,
//   FaSpinner,
//   FaCalendarAlt,
//   FaMoneyBillWave,
//   FaHandshake,
// } from "react-icons/fa";

// const RestaurantDashboard = () => {
//   const { user, token } = useContext(StoreContext);
//   const [loading, setLoading] = useState(true);
//   const [allDeliveredOrders, setAllDeliveredOrders] = useState([]);
//   const [filterDate, setFilterDate] = useState("");
//   const [filteredOrders, setFilteredOrders] = useState([]);

//   // State for statistics
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [averageOrderValue, setAverageOrderValue] = useState(0);
//   const [topMenuItems, setTopMenuItems] = useState([]);
//   const [dailyRevenueData, setDailyRevenueData] = useState({ labels: [], datasets: [] });
//   const [dailyOrderCountData, setDailyOrderCountData] = useState({ labels: [], datasets: [] });

//   useEffect(() => {
//     const fetchOrdersForDashboard = async () => {
//       try {
//         const response = await fetch(
//           `https://localhost:7274/api/Restaurant/${user.email}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           if (data.orders && Array.isArray(data.orders)) {
//             const deliveredOrders = data.orders.filter(
//               (order) => order.delivery?.status === "delivered"
//             );
//             setAllDeliveredOrders(deliveredOrders);
//           } else {
//             toast.info("No orders found for this restaurant yet.");
//           }
//         } else {
//           toast.error("Failed to fetch restaurant orders.");
//         }
//       } catch (error) {
//         console.error("Error fetching restaurant orders:", error);
//         toast.error("An error occurred while fetching data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.email) {
//       fetchOrdersForDashboard();
//     }
//   }, [user, token]);

//   useEffect(() => {
//     let ordersToProcess = allDeliveredOrders;

//     if (filterDate) {
//       ordersToProcess = allDeliveredOrders.filter((order) => {
//         const paymentTimeDate = order.payment?.paymentTime
//           ? new Date(order.payment.paymentTime).toISOString().split("T")[0]
//           : null;
//         return paymentTimeDate === filterDate;
//       });
//       if (ordersToProcess.length === 0 && allDeliveredOrders.length > 0) {
//         toast.info("No orders found for the selected date.");
//       }
//     }
//     setFilteredOrders(ordersToProcess);
//     calculateStatistics(ordersToProcess);
//   }, [filterDate, allDeliveredOrders]);

//   const calculateStatistics = (orders) => {
//     let revenue = 0;
//     let ordersCount = orders.length;
//     const menuItemSales = {};
//     const dailyRevenue = {};
//     const dailyOrderCounts = {};

//     orders.forEach((order) => {
//       if (order.payment?.amount) {
//         revenue += order.payment.amount;
//       }
//       if (order.payment?.paymentTime) {
//         const date = new Date(order.payment.paymentTime).toLocaleDateString("en-CA"); // YYYY-MM-DD
//         dailyRevenue[date] = (dailyRevenue[date] || 0) + (order.payment?.amount || 0);
//         dailyOrderCounts[date] = (dailyOrderCounts[date] || 0) + 1;
//       }

//       order.orderMenuItems.forEach((item) => {
//         const itemName = item.menuItem.name;
//         menuItemSales[itemName] = (menuItemSales[itemName] || 0) + item.quantity;
//       });
//     });

//     setTotalRevenue(revenue);
//     setTotalOrders(ordersCount);
//     setAverageOrderValue(ordersCount > 0 ? revenue / ordersCount : 0);

//     const sortedMenuItems = Object.entries(menuItemSales)
//       .sort(([, countA], [, countB]) => countB - countA)
//       .slice(0, 5) // Get top 5
//       .map(([name, quantity]) => ({ name, quantity }));
//     setTopMenuItems(sortedMenuItems);

//     // Prepare data for daily revenue chart
//     const sortedDailyRevenueDates = Object.keys(dailyRevenue).sort();
//     setDailyRevenueData({
//       labels: sortedDailyRevenueDates,
//       datasets: [
//         {
//           label: "Daily Revenue (₹)",
//           data: sortedDailyRevenueDates.map((date) => dailyRevenue[date]),
//           backgroundColor: "rgba(75, 192, 192, 0.6)",
//           borderColor: "rgba(75, 192, 192, 1)",
//           borderWidth: 1,
//         },
//       ],
//     });

//     // Prepare data for daily order count chart
//     const sortedDailyOrderCountDates = Object.keys(dailyOrderCounts).sort();
//     setDailyOrderCountData({
//       labels: sortedDailyOrderCountDates,
//       datasets: [
//         {
//           label: "Daily Orders",
//           data: sortedDailyOrderCountDates.map((date) => dailyOrderCounts[date]),
//           backgroundColor: "rgba(153, 102, 255, 0.6)",
//           borderColor: "rgba(153, 102, 255, 1)",
//           borderWidth: 1,
//         },
//       ],
//     });
//   };

//   const handleDateChange = (e) => {
//     setFilterDate(e.target.value);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <FaSpinner className="animate-spin text-orange-500 text-6xl" />
//         <p className="text-gray-700 text-2xl ml-4">Loading dashboard data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 p-8">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-4xl font-extrabold text-indigo-800 mb-8 text-center drop-shadow-md flex items-center justify-center">
//           <FaChartLine className="mr-4 text-indigo-600" /> Restaurant Dashboard
//         </h2>

//         {/* Date filter input */}
//         <div className="mb-8 flex items-center justify-center">
//           <label htmlFor="filterDate" className="text-lg font-semibold text-gray-700 mr-3">
//             <FaCalendarAlt className="inline-block mr-2 text-indigo-500" />Filter by Date:
//           </label>
//           <input
//             type="date"
//             id="filterDate"
//             value={filterDate}
//             onChange={handleDateChange}
//             className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {allDeliveredOrders.length === 0 && !filterDate ? (
//           <p className="text-center text-gray-600 text-xl py-8 bg-white rounded-lg shadow-md">
//             No delivered orders yet to generate statistics.
//           </p>
//         ) : (
//           <>
//             {/* Key Statistics Section */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//               <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
//                 <div>
//                   <p className="text-lg text-gray-600">Total Revenue</p>
//                   <p className="text-3xl font-bold text-green-700 mt-1">
//                     <FaRupeeSign className="inline-block mr-2" />
//                     {totalRevenue.toFixed(2)}
//                   </p>
//                 </div>
//                 <FaMoneyBillWave className="text-green-500 text-5xl opacity-75" />
//               </div>

//               <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
//                 <div>
//                   <p className="text-lg text-gray-600">Total Orders</p>
//                   <p className="text-3xl font-bold text-blue-700 mt-1">
//                     <FaClipboardList className="inline-block mr-2" />
//                     {totalOrders}
//                   </p>
//                 </div>
//                 <FaClipboardList className="text-blue-500 text-5xl opacity-75" />
//               </div>

//               <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
//                 <div>
//                   <p className="text-lg text-gray-600">Avg. Order Value</p>
//                   <p className="text-3xl font-bold text-purple-700 mt-1">
//                     <FaRupeeSign className="inline-block mr-2" />
//                     {averageOrderValue.toFixed(2)}
//                   </p>
//                 </div>
//                 <FaHandshake className="text-purple-500 text-5xl opacity-75" />
//               </div>

//               <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
//                 <div>
//                   <p className="text-lg text-gray-600">Top Menu Items</p>
//                   <ul className="text-sm text-gray-800 mt-2 space-y-1">
//                     {topMenuItems.length > 0 ? (
//                       topMenuItems.map((item, index) => (
//                         <li key={index} className="flex items-center">
//                           <FaStar className="text-yellow-500 mr-2" /> {item.name} (Qty: {item.quantity})
//                         </li>
//                       ))
//                     ) : (
//                       <li>No top items yet.</li>
//                     )}
//                   </ul>
//                 </div>
//                 <FaUtensils className="text-orange-500 text-5xl opacity-75" />
//               </div>
//             </div>

//             {/* Charts Section */}
           
            
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RestaurantDashboard;





/////////////test////////////

import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import {
  FaChartLine,
  FaRupeeSign,
  FaClipboardList,
  FaStar,
  FaUtensils,
  FaSpinner,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaHandshake,
  FaConciergeBell, // New icon for engagement/satisfaction
  FaBoxOpen, // New icon for pending orders if applicable
} from "react-icons/fa";

const RestaurantDashboard = () => {
  const { user, token } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [allDeliveredOrders, setAllDeliveredOrders] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  // State for statistics
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [topMenuItems, setTopMenuItems] = useState([]);

  useEffect(() => {
    const fetchOrdersForDashboard = async () => {
      try {
        // Ensure user and token are available before making the API call
        if (!user?.email || !token) {
          setLoading(false);
          // Optionally, redirect to login or show an error
          toast.error("Authentication details missing. Please log in.");
          return;
        }

        const response = await fetch(
          `https://localhost:7274/api/Restaurant/${user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.orders && Array.isArray(data.orders)) {
            const deliveredOrders = data.orders.filter(
              (order) => order.delivery?.status === "delivered"
            );
            setAllDeliveredOrders(deliveredOrders);
          } else {
            toast.info("No orders found for this restaurant yet.");
          }
        } else {
          // Log the response status and text for debugging API errors
          console.error(`Failed to fetch restaurant orders: ${response.status} - ${response.statusText}`);
          toast.error("Failed to fetch restaurant orders.");
        }
      } catch (error) {
        console.error("Error fetching restaurant orders:", error);
        toast.error("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email && token) { // Only fetch if user email and token are present
      fetchOrdersForDashboard();
    }
  }, [user, token]); // Depend on user and token for refetching if they change

  useEffect(() => {
    let ordersToProcess = allDeliveredOrders;

    if (filterDate) {
      ordersToProcess = allDeliveredOrders.filter((order) => {
        const paymentTimeDate = order.payment?.paymentTime
          ? new Date(order.payment.paymentTime).toISOString().split("T")[0]
          : null;
        return paymentTimeDate === filterDate;
      });
      if (ordersToProcess.length === 0 && allDeliveredOrders.length > 0) {
        toast.info("No orders found for the selected date.");
      }
    }
    setFilteredOrders(ordersToProcess); // Update filtered orders state
    calculateStatistics(ordersToProcess);
  }, [filterDate, allDeliveredOrders]);

  const calculateStatistics = (orders) => {
    let revenue = 0;
    let ordersCount = orders.length;
    const menuItemSales = {};

    orders.forEach((order) => {
      if (order.payment?.amount) {
        revenue += order.payment.amount;
      }

      // Ensure orderMenuItems exists and is an array before iterating
      if (order.orderMenuItems && Array.isArray(order.orderMenuItems)) {
        order.orderMenuItems.forEach((item) => {
          if (item.menuItem?.name && item.quantity) {
            const itemName = item.menuItem.name;
            menuItemSales[itemName] = (menuItemSales[itemName] || 0) + item.quantity;
          }
        });
      }
    });

    setTotalRevenue(revenue);
    setTotalOrders(ordersCount);
    setAverageOrderValue(ordersCount > 0 ? revenue / ordersCount : 0);

    const sortedMenuItems = Object.entries(menuItemSales)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 5) // Get top 5
      .map(([name, quantity]) => ({ name, quantity }));
    setTopMenuItems(sortedMenuItems);
  };

  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <FaSpinner className="animate-spin text-purple-600 text-6xl" />
        <p className="text-gray-700 text-2xl ml-4 font-semibold">Loading your restaurant's insights...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <h2 className="text-5xl font-extrabold text-purple-800 mb-10 text-center drop-shadow-lg flex items-center justify-center">
          <FaChartLine className="mr-5 text-purple-600" /> Restaurant Performance Overview
        </h2>

        {/* Date filter and clear button */}
        <div className="mb-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <label htmlFor="filterDate" className="text-xl font-semibold text-gray-700 flex items-center">
            <FaCalendarAlt className="inline-block mr-3 text-indigo-500 text-2xl" />Filter Data by Date:
          </label>
          <input
            type="date"
            id="filterDate"
            value={filterDate}
            onChange={handleDateChange}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-indigo-400 focus:border-transparent text-lg"
          />
          {filterDate && (
            <button
              onClick={() => setFilterDate("")}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-md"
            >
              Clear Filter
            </button>
          )}
        </div>

        {allDeliveredOrders.length === 0 && !filterDate ? (
          <p className="text-center text-gray-500 text-2xl py-12 bg-gray-50 rounded-xl shadow-inner border border-dashed border-gray-300">
            It looks a little quiet here! No delivered orders yet to showcase your insights.
          </p>
        ) : (
          <>
            {/* Key Statistics Section - Refined Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {/* Total Revenue Card */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out border border-green-200">
                <div className="p-4 bg-green-200 rounded-full mb-4 shadow-lg">
                  <FaMoneyBillWave className="text-green-700 text-5xl" />
                </div>
                <p className="text-xl text-gray-700 font-medium mb-1">Total Revenue</p>
                <p className="text-4xl font-extrabold text-green-800 flex items-center">
                  <FaRupeeSign className="mr-2 text-3xl" />
                  {totalRevenue.toFixed(2)}
                </p>
              </div>

              {/* Total Orders Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out border border-blue-200">
                <div className="p-4 bg-blue-200 rounded-full mb-4 shadow-lg">
                  <FaClipboardList className="text-blue-700 text-5xl" />
                </div>
                <p className="text-xl text-gray-700 font-medium mb-1">Total Orders</p>
                <p className="text-4xl font-extrabold text-blue-800 flex items-center">
                  {totalOrders}
                </p>
              </div>

              {/* Average Order Value Card */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out border border-purple-200">
                <div className="p-4 bg-purple-200 rounded-full mb-4 shadow-lg">
                  <FaHandshake className="text-purple-700 text-5xl" />
                </div>
                <p className="text-xl text-gray-700 font-medium mb-1">Avg. Order Value</p>
                <p className="text-4xl font-extrabold text-purple-800 flex items-center">
                  <FaRupeeSign className="mr-2 text-3xl" />
                  {averageOrderValue.toFixed(2)}
                </p>
              </div>

              {/* Top Menu Items Card */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out border border-yellow-200 lg:col-span-1">
                <div className="p-4 bg-yellow-200 rounded-full mb-4 shadow-lg">
                  <FaUtensils className="text-yellow-700 text-5xl" />
                </div>
                <p className="text-xl text-gray-700 font-medium mb-3">Top Menu Items</p>
                <ul className="text-lg text-gray-800 space-y-2 w-full">
                  {topMenuItems.length > 0 ? (
                    topMenuItems.map((item, index) => (
                      <li key={index} className="flex items-center justify-between bg-yellow-50 p-2 rounded-md shadow-sm">
                        <span className="flex items-center">
                          <FaStar className="text-yellow-500 mr-2 text-xl" />
                          <span className="font-semibold">{item.name}</span>
                        </span>
                        <span className="text-gray-600">Qty: {item.quantity}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-600 text-center py-4">No top items yet for this period.</li>
                  )}
                </ul>
              </div>




            </div>


          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantDashboard;