// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const RestaurantCards = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch all restaurants when the component mounts
//     const fetchRestaurants = async () => {
//       try {
//         const response = await fetch("https://localhost:7274/api/Restaurant", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setRestaurants(data); // Update the restaurants state
//         } else {
//           setError("Failed to fetch restaurants.");
//         }
//       } catch (error) {
//         console.error("Error fetching restaurants:", error);
//         setError("An error occurred while fetching restaurants.");
//       }
//     };

//     fetchRestaurants();
//   }, []); // Empty dependency array ensures this runs only once

//   const handleRestaurantClick = (restaurant) => {
//     if (!restaurant.availability) {
//       // Show a toast notification if the restaurant is closed
//       toast.error("This restaurant is currently closed.");
//       return;
//     }
//     // Navigate to the RestaurantMenu page with the restaurant ID
//     navigate(`/customer-management/restaurant-menu/${restaurant.restaurantID}`);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Restaurants</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {restaurants.length > 0 ? (
//           restaurants.map((restaurant) => (
//             <div
//               key={restaurant.restaurantID}
//               className={`border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow ${
//                 !restaurant.availability ? "opacity-50 pointer-events-none" : "cursor-pointer"
//               }`}
//               onClick={() => handleRestaurantClick(restaurant)}
//             >
//               <h3 className="text-xl font-bold">{restaurant.restaurantName}</h3>
//               <div className="relative w-full h-32 overflow-hidden rounded-lg mb-2">
//                 {restaurant.menuItems?.length > 0 ? (
//                   <div className="flex w-full h-full overflow-x-scroll scrollbar-hide">
//                     {restaurant.menuItems.map((menuItem, index) => (
//                       <img
//                         key={index}
//                         src={menuItem.imageUrl || "/images/default-menu-item.jpg"}
//                         alt={menuItem.name}
//                         className="w-full h-32 object-cover flex-shrink-0"
//                       />
//                     ))}
//                   </div>
//                 ) : (
//                   <img
//                     src="/images/default-menu-item.jpg"
//                     alt="Default menu item"
//                     className="w-full h-32 object-cover"
//                   />
//                 )}
//               </div>
//               <p className="text-gray-500">{restaurant.address}</p>
//               {!restaurant.availability && (
//                 <p className="text-red-500 font-bold">Closed</p>
//               )}
//               {restaurant.availability && (
//                 <p className="text-green-500 font-bold">Open</p>
//               )}
//             </div>
//           ))
//         ) : (
//           !error && <p>Loading restaurants...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RestaurantCards;







///////////////// test //////////////





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaStore, // Main icon for the heading
  FaMapMarkerAlt, // Icon for address
  FaCheckCircle, // Icon for 'Open' status
  FaTimesCircle, // Icon for 'Closed' status
  FaExclamationTriangle, // Icon for error messages
} from "react-icons/fa";

const RestaurantCards = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("https://localhost:7274/api/Restaurant", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRestaurants(data);
        } else {
          setError("Failed to fetch restaurants.");
          toast.error("Failed to fetch restaurants.");
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setError("An error occurred while fetching restaurants.");
        toast.error("An error occurred while fetching restaurants.");
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    fetchRestaurants();
  }, []);

  const handleRestaurantClick = (restaurant) => {
    if (!restaurant.availability) {
      toast.error("This restaurant is currently closed.");
      return;
    }
    navigate(`/customer-management/restaurant-menu/${restaurant.restaurantID}`);
  };

  return (
    <div className="min-h-screen  to-indigo-100 flex flex-col items-center ">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-8  mb-8 transform transition duration-500 hover:scale-[1.01]">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center drop-shadow-md flex items-center justify-center">
          <FaStore className="mr-4" /> Discover Restaurants
        </h2>

        {loading && (
          <p className="text-center text-gray-600 text-xl py-8">Loading restaurants...</p>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center justify-center mb-6" role="alert">
            <FaExclamationTriangle className="mr-3" />
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!loading && !error && restaurants.length === 0 && (
          <p className="text-center text-gray-600 text-xl py-8">No restaurants found at the moment.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.length > 0 &&
            restaurants.map((restaurant) => (
              <div
                key={restaurant.restaurantID}
                className={`group rounded-xl overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:shadow-lg hover:-translate-y-2 border ${
                  !restaurant.availability
                    ? "bg-gray-100 border-gray-200 opacity-70 cursor-not-allowed"
                    : "bg-white border-blue-100 cursor-pointer"
                }`}
                onClick={() => handleRestaurantClick(restaurant)}
              >
                <div className="relative w-full h-40 overflow-hidden">
                  {/* Displaying only the first menu item image or a placeholder */}
                  <img
                    src={
                      restaurant.menuItems?.[0]?.imageUrl || // Use the first menu item's image
                      "https://via.placeholder.com/400x200?text=Restaurant+Image" // Fallback placeholder
                    }
                    alt={restaurant.restaurantName || "Restaurant image"}
                    className="w-full h-full object-cover"
                  />
                  {!restaurant.availability && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                      <p className="text-white text-xl font-bold">CLOSED</p>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
                    {restaurant.restaurantName}
                  </h3>
                  <p className="text-gray-600 mb-3 flex items-center">
                    <FaMapMarkerAlt className="text-blue-500 mr-2" />
                    {restaurant.address || "No address available"}
                  </p>
                  <div className="flex items-center text-lg font-semibold">
                    {restaurant.availability ? (
                      <p className="text-green-600 flex items-center">
                        <FaCheckCircle className="mr-2" /> Open
                      </p>
                    ) : (
                      <p className="text-red-600 flex items-center">
                        <FaTimesCircle className="mr-2" /> Closed
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCards;