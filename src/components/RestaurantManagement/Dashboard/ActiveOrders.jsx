import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import {
  FaClipboardList,
  FaCheckCircle,
  FaRupeeSign,
  FaTruck,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaUtensils,
  FaSpinner,
} from "react-icons/fa";

const ActiveOrders = () => {
  const { user, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
            const activeOrders = data.orders.filter(
              (order) =>
                order.payment?.status === "Completed" &&
                order.delivery?.status !== "delivered"
            );
            setOrders(activeOrders);
          } else {
            toast.info("No active orders found for this restaurant.");
          }
        } else {
          toast.error("Failed to fetch active orders.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching active orders.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchOrders();
    }
  }, [user, token]);

  const updateOrderStatus = async (orderID) => {
    try {
      const response = await fetch(
        `https://localhost:7274/api/Order/${orderID}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json-patch+json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify("completed"),
        }
      );

      if (response.ok) {
        toast.success(`Order status updated to "completed"!`);
        const updatedResponse = await fetch(
          `https://localhost:7274/api/Restaurant/${user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          const activeOrders = updatedData.orders.filter(
            (order) =>
              order.payment?.status === "Completed" &&
              order.delivery?.status !== "delivered"
          );
          setOrders(activeOrders);
        } else {
          toast.warn(
            "Orders refreshed, but new status might not be immediate."
          );
        }
      } else {
        toast.error("No Agent is available to assign.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("An error occurred while updating order status.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <FaSpinner className="animate-spin text-orange-500 text-6xl" />
        <p className="text-gray-700 text-2xl ml-4">Loading active orders...</p>
      </div>
    );
  }

  const OrderCard = ({ order }) => (
    <li
      className={`border p-6 mb-4 rounded-xl shadow-md transition-all duration-300 bg-white hover:shadow-xl`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p className="text-gray-700 flex items-center">
          <strong className="text-orange-700 flex items-center mr-2">
            <FaClipboardList className="mr-2" /> Order ID:
          </strong>{" "}
          <span className="font-mono text-sm">{order.orderID}</span>
        </p>
        <p className="text-gray-700 flex items-center">
          <strong className="text-orange-700 flex items-center mr-2">
            <FaCheckCircle className="mr-2" /> Status:
          </strong>{" "}
          <span
            className={`font-semibold ${
              order.status === "completed" ? "text-green-600" : "text-blue-600"
            }`}
          >
            {order.status}
          </span>
        </p>
        <p className="text-gray-700 flex items-center">
          <strong className="text-orange-700 flex items-center mr-2">
            <FaRupeeSign className="mr-2" /> Total Amount:
          </strong>{" "}
          <span className="font-bold text-lg text-green-700">
            ₹{order.payment?.amount || "N/A"}
          </span>
        </p>
        <p className="text-gray-700 flex items-center">
          <strong className="text-orange-700 flex items-center mr-2">
            <FaCheckCircle className="mr-2" /> Payment:
          </strong>{" "}
          <span
            className={`font-semibold ${
              order.payment?.status === "Completed"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {order.payment?.status || "N/A"}
          </span>
        </p>
        <p className="text-gray-700 flex items-center col-span-2">
          <strong className="text-orange-700 flex items-center mr-2">
            <FaTruck className="mr-2" /> Delivery:
          </strong>{" "}
          <span
            className={`font-semibold ${
              order.delivery?.status === "delivered"
                ? "text-purple-600"
                : "text-blue-600"
            }`}
          >
            {order.delivery?.status || "Pending"}
          </span>
        </p>

        {order.delivery?.agent?.name && (
          <p className="text-gray-700 flex items-center col-span-2 mt-2">
            <strong className="text-orange-700 flex items-center mr-2">
              Agent Name:
            </strong>{" "}
            {order.delivery.agent.name}
          </p>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-lg font-semibold text-orange-800 mb-3 flex items-center">
          <FaUser className="mr-2 text-orange-600" /> Customer Details:
        </p>
        <p className="text-gray-700 flex items-center mb-1">
          <strong className="text-gray-600 flex items-center mr-2">
            Name:
          </strong>{" "}
          {order.customer?.name}
        </p>
        <p className="text-gray-700 flex items-center mb-1">
          <strong className="text-gray-600 flex items-center mr-2">
            <FaPhone className="mr-1" /> Phone:
          </strong>{" "}
          {order.customer?.phone}
        </p>
        <p className="text-gray-700 flex items-center">
          <strong className="text-gray-600 flex items-center mr-2">
            <FaMapMarkerAlt className="mr-1" /> Address:
          </strong>{" "}
          {order.customer?.address}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-lg font-semibold text-orange-800 mb-3 flex items-center">
          <FaUtensils className="mr-2 text-orange-600" /> Ordered Items:
        </p>
        <ul className="list-disc list-inside text-gray-800 space-y-1">
          {order.orderMenuItems.map((item) => (
            <li key={item.itemID} className="flex justify-between items-center">
              <span>
                {item.menuItem.name} (x{item.quantity})
              </span>
              <span className="font-semibold text-green-700">
                ₹{item.menuItem.price * item.quantity}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 text-right">
        {/* Hide button if delivery status is "assigned" */}
        {order.delivery?.status !== "assigned" && (
          <button
            onClick={() => updateOrderStatus(order.orderID)}
            className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition duration-300 ease-in-out font-medium flex items-center justify-center ml-auto"
          >
            <FaTruck className="mr-2" /> Mark as Ready for Pickup
          </button>
        )}
      </div>
    </li>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-orange-800 mb-8 text-center drop-shadow-md flex items-center justify-center">
          <FaClipboardList className="mr-4 text-orange-600" /> Active Orders
        </h2>
        {orders.length > 0 ? (
          <ul className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.orderID} order={order} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 text-xl py-8 bg-white rounded-lg shadow-md">
            No active orders available. Time to relax!
          </p>
        )}
      </div>
    </div>
  );
};

export default ActiveOrders;
