
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaMotorcycle, FaHistory, FaCheck, FaUserCircle, FaMapMarkerAlt, FaPhoneAlt, FaUtensils } from "react-icons/fa";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(StoreContext);

  const [isAvailable, setIsAvailable] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [agentName, setAgentName] = useState("Loading...");

  const fetchAgentDetails = async () => {
    if (!user?.email || user.role !== "agent") {
      toast.error("Unauthorized access. Only agents can view this page.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`https://localhost:7274/api/Agent/${user.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAgentName(data.name || user.name || "Agent");
        setIsAvailable(data.isAvailable);

        const deliveries = data.deliveries || [];
        const assignedDelivery = deliveries.find(
          (delivery) => delivery.status?.trim().toLowerCase() === "assigned"
        );

        if (assignedDelivery) {
          setCurrentOrder({
            orderID: assignedDelivery.order?.orderID || "N/A",
            deliveryID: assignedDelivery.deliveryID,
            customerName: assignedDelivery.order?.customer?.name || "N/A",
            customerPhone: assignedDelivery.order?.customer?.phone || "N/A",
            customerAddress: assignedDelivery.order?.customer?.address || "N/A",
            restaurantName: assignedDelivery.order?.restaurant?.restaurantName || "N/A",
            restaurantAddress: assignedDelivery.order?.restaurant?.address || "N/A",
          });
        } else {
          setCurrentOrder(null);
        }
      } else {
        const errorText = await response.text();
        console.error("Error fetching agent details:", errorText);
        toast.error("Failed to fetch agent details.");
      }
    } catch (error) {
      console.error("Error fetching agent details:", error);
      toast.error("An error occurred while fetching agent details.");
    }
  };

  const handleDelivered = async () => {
    if (!currentOrder?.deliveryID) {
      toast.error("No current order to mark as delivered.");
      return;
    }

    try {
      const response = await fetch(`https://localhost:7274/api/Delivery/${currentOrder.deliveryID}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify("delivered"),
      });

      if (response.ok) {
        setIsAvailable(true);
        setCurrentOrder(null);
        toast.success("Delivery marked as completed. Agent is now available.");
        fetchAgentDetails();
      } else {
        const errorText = await response.text();
        console.error("Error updating delivery status:", errorText);
        toast.error("Failed to update delivery status.");
      }
    } catch (error) {
      console.error("Error updating delivery status:", error);
      toast.error("An error occurred while updating delivery status.");
    }
  };

  useEffect(() => {
    fetchAgentDetails();
  }, [user, token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 text-gray-100 p-6 font-sans"> {/* Reduced overall padding */}
      {/* Header */}
      <header className="flex items-center justify-between mb-8 relative"> {/* Adjusted margin-bottom */}
        <h1 className="text-4xl font-extrabold flex items-center text-indigo-400 drop-shadow-md">
          <FaMotorcycle className="text-5xl mr-4" />
          Agent Dashboard
        </h1>

        {/* Profile Section - Clickable user logo and name */}
        <div className="flex items-center space-x-2"> {/* Adjusted spacing */}
          <Link to="/agent-dashboard/profile" className="flex items-center space-x-2 text-gray-200 hover:text-indigo-300 transition-colors duration-300 cursor-pointer p-1.5 rounded-md hover:bg-gray-700"> {/* Reduced padding and roundness */}
            <FaUserCircle className="text-2xl" /> {/* Slightly reduced icon size */}
            <span className="text-base font-semibold">{agentName}</span> {/* Reduced text size */}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6"> {/* Adjusted gap */}
        {/* Current Order Card */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 transform hover:scale-[1.005] transition-transform duration-300"> {/* Reduced padding, roundness, and hover scale */}
          <h2 className="text-2xl font-bold text-white mb-5 text-center border-b pb-2.5 border-gray-700">Current Order</h2> {/* Reduced text size, padding */}
          {currentOrder ? (
            <div className="space-y-3"> {/* Reduced spacing */}
              <div className="flex items-center text-sm"> {/* Reduced text size */}
                <span className="text-green-400 font-bold w-32 flex items-center"><span className="text-lg mr-1.5">#</span>Order ID:</span> {/* Reduced width and text size */}
                <span className="text-gray-300 font-medium">{currentOrder.orderID}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-green-400 font-bold w-32 flex items-center"><FaUserCircle className="mr-1.5 text-base" />Customer:</span> {/* Reduced width and icon size */}
                <span className="text-gray-300 font-medium">{currentOrder.customerName}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-green-400 font-bold w-32 flex items-center"><FaPhoneAlt className="mr-1.5 text-base" />Phone:</span>
                <a href={`tel:${currentOrder.customerPhone}`} className="text-blue-400 hover:underline font-medium">{currentOrder.customerPhone}</a>
              </div>
              <div className="flex items-start text-sm">
                <span className="text-green-400 font-bold w-32 flex items-center"><FaMapMarkerAlt className="mr-1.5 text-base" />Address:</span>
                <span className="text-gray-300 font-medium flex-1">{currentOrder.customerAddress}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-green-400 font-bold w-32 flex items-center"><FaUtensils className="mr-1.5 text-base" />Restaurant:</span>
                <span className="text-gray-300 font-medium">{currentOrder.restaurantName}</span>
              </div>
              <div className="flex items-start text-sm">
                <span className="text-green-400 font-bold w-32 flex items-center"><FaMapMarkerAlt className="mr-1.5 text-base" />Rest. Address:</span>
                <span className="text-gray-300 font-medium flex-1">{currentOrder.restaurantAddress}</span>
              </div>
              <div className="pt-4 border-t border-gray-700 flex justify-center"> {/* Reduced padding */}
                <button
                  onClick={handleDelivered}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2.5 px-5 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 text-base" // Reduced padding, font size
                >
                  <FaCheck className="text-white text-lg" /> {/* Reduced icon size */}
                  Mark as Delivered
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[150px]"> {/* Reduced min-height */}
              <FaCheck className="text-green-500 text-5xl mb-2 opacity-70" /> {/* Reduced icon size and margin */}
              <p className="text-gray-400 text-lg text-center font-medium">No current order assigned. Enjoy your break!</p> {/* Reduced text size */}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6"> {/* Adjusted gap */}
          {/* Order History Card */}
          <div
            onClick={() => navigate("/agent-dashboard/orders")}
            className="bg-gray-800 p-5 rounded-lg shadow-xl border border-gray-700 cursor-pointer hover:bg-gray-700 transition transform hover:scale-[1.02] duration-300 flex flex-col items-center justify-center text-center min-h-[140px]" 
          >
            <FaHistory className="text-indigo-400 text-4xl mb-2" /> {/* Reduced icon size and margin */}
            <h2 className="text-lg font-semibold text-white">Order History</h2> {/* Reduced text size */}
            <p className="text-gray-400 mt-1 text-xs">View past deliveries</p> {/* Reduced margin and text size */}
          </div>

          {/* Availability Card */}
          <div
            className={`p-5 rounded-lg shadow-xl border flex flex-col items-center justify-center text-center min-h-[140px] transition-all duration-300 ${ // Reduced padding, roundness, min-height
              isAvailable
                ? "bg-gradient-to-br from-green-600 to-green-800 border-green-700 hover:from-green-700 hover:to-green-900"
                : "bg-gradient-to-br from-red-600 to-red-800 border-red-700 hover:from-red-700 hover:to-red-900"
            }`}
          >
            <FaMotorcycle className="text-white text-4xl mb-2" /> {/* Reduced icon size and margin */}
            <p className="font-bold text-xl text-white"> {/* Reduced text size */}
              {isAvailable ? "Available" : "Unavailable"}
            </p>
            <p className="text-white text-opacity-80 mt-1 text-xs">Ready for deliveries</p> {/* Reduced margin and text size */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;



