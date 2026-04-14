import React, { useState, useEffect, useContext } from "react";
import { StoreContext, API } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import {
  FaUtensils,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaIdCard,
  FaSpinner,
  FaExclamationTriangle,
  FaSearch,
  FaTrashAlt, // Import for delete icon
  FaCheckCircle, // Import for 'Yes' confirmation
  FaTimesCircle, // Import for 'No' confirmation
} from "react-icons/fa";
import { toast } from "react-toastify"; // Ensure toast is imported for notifications

const RestaurantDash = () => {
  const { token } = useContext(StoreContext);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // New state to track which restaurant is awaiting confirmation
  const [confirmingRestaurantId, setConfirmingRestaurantId] = useState(null);
  // State to show loading spinner specifically on the deleting restaurant's button
  const [deletingRestaurantId, setDeletingRestaurantId] = useState(null);

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get("/Restaurant", {
        headers: { Authorization: `Bearer ${token}` }, // Assuming token is needed for this endpoint
      });
      setRestaurants(response.data);
      setFilteredRestaurants(response.data);
    } catch (err) {
      console.error("Error fetching restaurants:", err.response || err.message || err);
      const errorMessage = err.response?.data?.message || "Failed to fetch restaurant details. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRestaurants();
    } else {
      setLoading(false);
      setError("Authentication token not found. Please log in.");
      toast.warn("Please log in to view restaurant details."); // Added toast for no token
    }
  }, [token]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === "") {
      setFilteredRestaurants(restaurants);
    } else {
      setFilteredRestaurants(
        restaurants.filter((restaurant) =>
          restaurant.email.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  const handleViewMenuClick = (email) => {
    navigate(`/admin-dashboard/menu-items?email=${email}`);
  };




  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
        <FaSpinner className="animate-spin text-orange-500 text-5xl" />
        <p className="ml-4 text-xl text-gray-700">Loading restaurant data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-6">
        <FaExclamationTriangle className="text-red-600 text-6xl mb-4" />
        <h2 className="text-3xl font-bold text-red-700 mb-2">Error!</h2>
        <p className="text-xl text-red-500 text-center">
          {error}
          <br />
          Please ensure the API is running and you are authenticated.
        </p>
        <button
          onClick={fetchRestaurants}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-red-50 to-orange-100 min-h-screen font-sans">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-wide">
        <FaUtensils className="inline-block mr-3 text-orange-600" />
        Our Partner Restaurants
      </h1>

      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search restaurants by email..."
            className="w-full p-3 pl-10 rounded-full border-2 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 transition-all duration-300 shadow-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              aria-label="Clear search"
            >
              <FaTimesCircle className="text-xl" />
            </button>
          )}
        </div>
      </div>

      {filteredRestaurants.length === 0 && searchTerm !== "" ? (
        <div className="text-center text-gray-600 text-2xl mt-20">
          No restaurants found matching your search.
        </div>
      ) : filteredRestaurants.length === 0 ? (
        <div className="text-center text-gray-600 text-2xl mt-20">
          No restaurant records found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden
                           border border-gray-200
                           relative group"
            >
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 text-white rounded-t-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <h3 className="text-xl font-bold flex items-center mb-1 relative z-10">
                  <FaUtensils className="mr-3 text-orange-200" />
                  {restaurant.restaurantName}
                </h3>
                <p className="text-sm opacity-90 relative z-10 flex items-center">
                  <FaIdCard className="mr-2 text-orange-100" /> ID: {restaurant.restaurantID}
                </p>
              </div>

              <div className="p-6 space-y-3 text-gray-700">
                <p className="flex items-center text-base">
                  <FaEnvelope className="mr-3 text-blue-400" />
                  <span className="font-medium">Email:</span> {restaurant.email}
                </p>
                <p className="flex items-center text-base">
                  <FaMapMarkerAlt className="mr-3 text-red-400" />
                  <span className="font-medium">Address:</span> {restaurant.address}
                </p>
                <p className="flex items-center text-base">
                  <FaPhoneAlt className="mr-3 text-green-500" />
                  <span className="font-medium">Contact:</span> {restaurant.restaurantContact}
                </p>
              </div>

              {/* --- Card Footer with Inline Confirmation Logic --- */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 text-sm text-gray-500 flex justify-between items-center">
                {confirmingRestaurantId === restaurant.restaurantID ? (
                  // Display confirmation buttons if this restaurant's ID matches confirmingRestaurantId
                  <div className="flex items-center w-full justify-between">
                    <span className="text-red-600 font-semibold text-base mr-2">Are you sure?</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => performDeleteRestaurant(restaurant.restaurantID, restaurant.restaurantName)}
                        className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center text-sm"
                        aria-label={`Confirm delete ${restaurant.restaurantName}`}
                      >
                        <FaCheckCircle className="mr-1" /> Yes
                      </button>
                      <button
                        onClick={cancelDeleteConfirmation}
                        className="p-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors flex items-center text-sm"
                        aria-label="Cancel delete"
                      >
                        <FaTimesCircle className="mr-1" /> No
                      </button>
                    </div>
                  </div>
                ) : (
                  // Display standard delete button and View Menu link
                  <>
                    
                    <span
                      className="font-semibold text-orange-600 cursor-pointer hover:underline"
                      onClick={() => handleViewMenuClick(restaurant.email)}
                    >
                      View Menu &rarr;
                    </span>
                  </>
                )}
              </div>
              {/* --- End Card Footer --- */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantDash;