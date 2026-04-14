import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import {
  FaHistory,
  FaRupeeSign,
  FaCalendarAlt,
  FaSpinner,
} from "react-icons/fa";

const OrdersHistory = () => {
  const { user, token } = useContext(StoreContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
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
            const historyOrders = data.orders.filter(
              (order) => order.delivery?.status === "delivered"
            );
            setAllOrders(historyOrders);
            setOrderHistory(historyOrders);
          } else {
            toast.info("No past orders found for this restaurant.");
          }
        } else {
          toast.error("Failed to fetch order history.");
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
        toast.error("An error occurred while fetching order history.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchOrders();
    }
  }, [user, token]);

  useEffect(() => {
    if (filterDate) {
      const filtered = allOrders.filter((order) => {
        const paymentTimeDate = order.payment?.paymentTime
          ? new Date(order.payment.paymentTime).toISOString().split("T")[0]
          : null;
        return paymentTimeDate === filterDate;
      });
      setOrderHistory(filtered);
      if (filtered.length === 0) {
        toast.info("No orders found for the selected date.");
      }
    } else {
      setOrderHistory(allOrders);
    }
  }, [filterDate, allOrders]);

  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <FaSpinner className="animate-spin text-orange-500 text-6xl" />
        <p className="text-gray-700 text-2xl ml-4">Loading order history...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-orange-800 mb-8 text-center drop-shadow-md flex items-center justify-center">
          <FaHistory className="mr-4 text-orange-600" /> Order History
        </h2>

        <div className="mb-6 flex items-center justify-center">
          <label htmlFor="filterDate" className="text-lg font-semibold text-gray-700 mr-3">
            <FaCalendarAlt className="inline-block mr-2 text-orange-500" />Filter by Date:
          </label>
          <input
            type="date"
            id="filterDate"
            value={filterDate}
            onChange={handleDateChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {orderHistory.length > 0 ? (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-orange-600 text-white uppercase text-sm font-semibold">
                  <th className="px-5 py-3 border-b-2 border-orange-700 text-left tracking-wider">Order ID</th>
                  <th className="px-5 py-3 border-b-2 border-orange-700 text-left tracking-wider">Agent Name</th>
                  <th className="px-5 py-3 border-b-2 border-orange-700 text-left tracking-wider">Date</th>
                  <th className="px-5 py-3 border-b-2 border-orange-700 text-left tracking-wider">Customer</th>
                  <th className="px-5 py-3 border-b-2 border-orange-700 text-left tracking-wider">Items</th>
                  <th className="px-5 py-3 border-b-2 border-orange-700 text-left tracking-wider">Total Amount</th>
                  <th className="px-5 py-3 border-b-2 border-orange-700 text-left tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((order) => (
                  <tr key={order.orderID} className="border-b border-gray-200 hover:bg-orange-50 transition-colors duration-200">
                    <td className="px-5 py-5 text-sm text-gray-800">{order.orderID}</td>
                    <td className="px-5 py-5 text-sm text-gray-800">{order.delivery.agent.name}</td>

                    <td className="px-5 py-5 text-sm text-gray-800">
                      {order.payment?.paymentTime ? new Date(order.payment.paymentTime).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-5 py-5 text-sm text-gray-800">
                      <p className="font-semibold">{order.customer?.name}</p>
                      <p className="text-gray-600 text-xs">{order.customer?.phone}</p>
                      <p className="text-gray-600 text-xs">{order.customer?.address}</p>
                    </td>
                    <td className="px-5 py-5 text-sm text-gray-800">
                      <ul className="list-disc list-inside text-xs">
                        {order.orderMenuItems.map((item) => (
                          <li key={item.itemID}>
                            {item.menuItem.name} (x{item.quantity})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-5 py-5 text-sm">
                      <span className="font-bold text-lg text-green-700 flex items-center">
                        <FaRupeeSign className="mr-1" />{order.payment?.amount || "N/A"}
                      </span>
                    </td>
                    <td className="px-5 py-5 text-sm">
                      <span
                        className={`font-semibold px-3 py-1 rounded-full text-xs ${
                          order.status === "completed"
                            ? "bg-green-200 text-green-800"
                            : "bg-blue-200 text-blue-800"
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
        ) : (
          <p className="text-center text-gray-600 text-xl py-8 bg-white rounded-lg shadow-md">
            No past orders in your history yet or no orders found for the selected date.
          </p>
        )}
      </div>
    </div>
  );
};

export default OrdersHistory;
