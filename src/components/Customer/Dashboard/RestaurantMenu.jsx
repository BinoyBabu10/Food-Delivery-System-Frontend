// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { StoreContext } from "../../context/StoreContext";

// const RestaurantMenu = () => {
//   const { restaurantID } = useParams(); // Get the restaurant ID from the route
//   const [menuItems, setMenuItems] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showGoToCart, setShowGoToCart] = useState(false); // State for "Go to Cart" button visibility
  

//   const { cart, addToCart, removeFromCart } = useContext(StoreContext); // Use StoreContext
//   const navigate = useNavigate();
//   const hasItemsInCart = Object.keys(cart).length > 0;

//   useEffect(() => {
//     // Fetch all menu items
//     const fetchMenuItems = async () => {
//       try {
//         const response = await fetch("https://localhost:7274/api/MenuItem", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           // Filter menu items by restaurantID
//           const filteredItems = data.filter(
//             (item) => item.restaurantID === parseInt(restaurantID)
//           );
//           setMenuItems(filteredItems); // Update the menu items state
//         } else {
//           setError("Failed to fetch menu items.");
//         }
//       } catch (error) {
//         console.error("Error fetching menu items:", error);
//         setError("An error occurred while fetching menu items.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenuItems();
//   }, [restaurantID]);

//   const handleAddToCart = (item) => {
//     addToCart(item); // Add item to cart
//     // toast.success("Item added to cart!"); // Show toast notification
//     setShowGoToCart(true); // Enable "Go to Cart" button
//   };

//   const handleRemoveFromCart = (item) => {
//     removeFromCart(item.restaurantID, item.itemID); // Remove item from cart
//     // toast.info("Item removed from cart."); // Show toast notification
//     setShowGoToCart(true); // Enable "Go to Cart" button
//   };

//   const handleGoToCart = () => {
//     navigate("/customer-management/cart"); // Navigate to the cart page
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Menu</h2>
//       {loading && <p>Loading menu items...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {menuItems.length > 0 ? (
//         <ul className="space-y-4">
//           {menuItems.map((item) => (
//             <li
//               key={item.itemID}
//               className="border rounded-lg shadow-md p-4 bg-white flex justify-between items-center"
//             >
//               <div>
//                 <img
//                   src={item.imageUrl}
//                   alt={item.name}
//                   className="w-20 h-20 object-cover rounded mr-4"
//                 />
//                 <h4 className="text-lg font-bold">{item.name}</h4>
//                 <p className="text-gray-500">{item.description}</p>
//                 <p className="text-gray-700 font-bold">Price: ₹{item.price}</p>
//               </div>
//               <div className="flex items-center">
//                 <button
//                   onClick={() => handleRemoveFromCart(item)}
//                   className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
//                 >
//                   -
//                 </button>
//                 <span className="mx-2">
//                   {cart[`${item.restaurantID}-${item.itemID}`]?.count || 0}
//                 </span>
//                 <button
//                   onClick={() => handleAddToCart(item)}
//                   className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
//                 >
//                   +
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         !loading && <p>No menu items found for this restaurant.</p>
//       )}

//       {/* "Go to Cart" Button */}
//       {hasItemsInCart && (
//         <button
//           onClick={handleGoToCart}
//           className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
//         >
//           Go to Cart
//         </button>
//       )}
//     </div>
//   );
// };

// export default RestaurantMenu;










///////////////// test ///////////////



// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { StoreContext } from "../../context/StoreContext";
// import { toast } from "react-toastify"; // Ensure toast is imported for notifications
// import {
//   FaUtensils, // Main icon for the heading
//   FaPlus, // Add to cart icon
//   FaMinus, // Remove from cart icon
//   FaShoppingCart, // Go to Cart button icon & item icon
//   FaInfoCircle, // Item description icon
//   FaRupeeSign, // Price icon
//   FaExclamationTriangle, // Error icon
//   FaSearch, // No items found icon
// } from "react-icons/fa"; // Importing icons

// const RestaurantMenu = () => {
//   const { restaurantID } = useParams();
//   const [menuItems, setMenuItems] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const { cart, addToCart, removeFromCart } = useContext(StoreContext);
//   const navigate = useNavigate();
//   const hasItemsInCart = Object.keys(cart).length > 0;

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const response = await fetch("https://localhost:7274/api/MenuItem", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           const filteredItems = data.filter(
//             (item) => item.restaurantID === parseInt(restaurantID)
//           );
//           setMenuItems(filteredItems);
//         } else {
//           setError("Failed to fetch menu items.");
//           toast.error("Failed to fetch menu items.");
//         }
//       } catch (error) {
//         console.error("Error fetching menu items:", error);
//         setError("An error occurred while fetching menu items.");
//         toast.error("An error occurred while fetching menu items.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenuItems();
//   }, [restaurantID]); // Dependency array ensures effect runs when restaurantID changes

//   const handleAddToCart = (item) => {
//     addToCart(item);
//     toast.success(`${item.name} added to cart!`);
//   };

//   const handleRemoveFromCart = (item) => {
//     // Only remove if item exists in cart
//     if (cart[`${item.restaurantID}-${item.itemID}`]?.count > 0) {
//       removeFromCart(item.restaurantID, item.itemID);
//       toast.info(`${item.name} removed from cart.`);
//     }
//   };

//   const handleGoToCart = () => {
//     navigate("/customer-management/cart");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-4">
//       <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 mt-8 mb-8 transform transition duration-500 hover:scale-[1.01]">
//         <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center drop-shadow-md flex items-center justify-center">
//           <FaUtensils className="mr-4" /> Restaurant Menu
//         </h2>

//         {loading && (
//           <p className="text-center text-gray-600 text-xl py-8">Loading menu items...</p>
//         )}

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center justify-center mb-6" role="alert">
//             <FaExclamationTriangle className="mr-3" />
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}

//         {!loading && !error && menuItems.length === 0 && (
//           <p className="text-center text-gray-600 text-xl py-8 flex items-center justify-center">
//             <FaSearch className="mr-3 text-gray-500" />
//             No menu items found for this restaurant.
//           </p>
//         )}

//         <ul className="space-y-6">
//           {menuItems.map((item) => (
//             <li
//               key={item.itemID}
//               className="group bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-md flex flex-col md:flex-row justify-between items-center transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-[1.01]"
//             >
//               <div className="flex items-start md:items-center w-full md:w-3/4 mb-4 md:mb-0">
//                 <img
//                   src={item.imageUrl || "https://via.placeholder.com/100x100?text=Food+Item"}
//                   alt={item.name}
//                   className="w-24 h-24 object-cover rounded-lg mr-4 shadow-sm flex-shrink-0"
//                 />
//                 <div>
//                   <h4 className="text-xl font-bold text-blue-800 mb-1 group-hover:text-blue-900 transition-colors">
//                     {item.name}
//                   </h4>
//                   <p className="text-gray-600 mb-2 flex items-center">
//                     <FaInfoCircle className="text-blue-500 mr-2 flex-shrink-0" />
//                     <span className="text-sm italic">{item.description || "No description provided."}</span>
//                   </p>
//                   <p className="text-lg font-bold text-gray-800 flex items-center">
//                     <FaRupeeSign className="text-green-600 mr-1" />
//                     {item.price}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
//                 <button
//                   onClick={() => handleRemoveFromCart(item)}
//                   className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
//                   aria-label={`Remove one ${item.name} from cart`}
//                 >
//                   <FaMinus />
//                 </button>
//                 <span className="mx-2 text-xl font-semibold text-gray-800 w-8 text-center">
//                   {cart[`${item.restaurantID}-${item.itemID}`]?.count || 0}
//                 </span>
//                 <button
//                   onClick={() => handleAddToCart(item)}
//                   className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
//                   aria-label={`Add one ${item.name} to cart`}
//                 >
//                   <FaPlus />
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>

//         {/* "Go to Cart" Button - Fixed Position */}
//         {hasItemsInCart && (
//           <button
//             onClick={handleGoToCart}
//             className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out font-semibold text-lg flex items-center justify-center z-50 animate-bounce-slow"
//           >
//             <FaShoppingCart className="mr-3 text-xl" /> Go to Cart
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RestaurantMenu;






// // src/pages/customer/RestaurantMenu.jsx
// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { StoreContext } from "../../context/StoreContext";
// // import { toast } from "react-toastify"; // Removed toast import as it's no longer used for item add/remove

// import {
//   FaUtensils, // Main icon for the heading
//   FaPlus, // Add to cart icon
//   FaMinus, // Remove from cart icon
//   // FaShoppingCart, // No longer needed directly in this component
//   FaInfoCircle, // Item description icon
//   FaRupeeSign, // Price icon
//   FaExclamationTriangle, // Error icon
//   FaSearch, // No items found icon
// } from "react-icons/fa"; // Importing icons

// const RestaurantMenu = () => {
//   const { restaurantID } = useParams();
//   const [menuItems, setMenuItems] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const { cart, addToCart, removeFromCart } = useContext(StoreContext);


//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const response = await fetch("https://localhost:7274/api/MenuItem", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           const filteredItems = data.filter(
//             (item) => item.restaurantID === parseInt(restaurantID)
//           );
//           setMenuItems(filteredItems);
//         } else {
//           setError("Failed to fetch menu items.");
//           // toast.error("Failed to fetch menu items."); // Keep toast for fetch errors if desired
//         }
//       } catch (error) {
//         console.error("Error fetching menu items:", error);
//         setError("An error occurred while fetching menu items.");
//         // toast.error("An error occurred while fetching menu items."); // Keep toast for general errors if desired
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenuItems();
//   }, [restaurantID]);

//   const handleAddToCart = (item) => {
//     addToCart(item);
//     // toast.success(`${item.name} added to cart!`); // Removed toast notification
//   };

//   const handleRemoveFromCart = (item) => {
//     if (cart[`${item.restaurantID}-${item.itemID}`]?.count > 0) {
//       removeFromCart(item.restaurantID, item.itemID);
//       // toast.info(`${item.name} removed from cart.`); // Removed toast notification
//     }
//   };


//   return (
//     <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 transform transition duration-500 hover:scale-[1.01] mx-auto mt-40">
//       <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center drop-shadow-md flex items-center justify-center">
//         <FaUtensils className="mr-4" /> Restaurant Menu
//       </h2>

//       {loading && (
//         <p className="text-center text-gray-600 text-xl py-8">Loading menu items...</p>
//       )}

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center justify-center mb-6" role="alert">
//           <FaExclamationTriangle className="mr-3" />
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}

//       {!loading && !error && menuItems.length === 0 && (
//         <p className="text-center text-gray-600 text-xl py-8 flex items-center justify-center">
//           <FaSearch className="mr-3 text-gray-500" />
//           No menu items found for this restaurant.
//         </p>
//       )}

//       <ul className="space-y-6">
//         {menuItems.map((item) => (
//           <li
//             key={item.itemID}
//             className="group bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-md flex flex-col md:flex-row justify-between items-center transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-[1.01]"
//           >
//             <div className="flex items-start md:items-center w-full md:w-3/4 mb-4 md:mb-0">
//               <img
//                 src={item.imageUrl || "https://via.placeholder.com/100x100?text=Food+Item"}
//                 alt={item.name}
//                 className="w-24 h-24 object-cover rounded-lg mr-4 shadow-sm flex-shrink-0"
//               />
//               <div>
//                 <h4 className="text-xl font-bold text-blue-800 mb-1 group-hover:text-blue-900 transition-colors">
//                   {item.name}
//                 </h4>
//                 <p className="text-gray-600 mb-2 flex items-center">
//                   <FaInfoCircle className="text-blue-500 mr-2 flex-shrink-0" />
//                   <span className="text-sm italic">{item.description || "No description provided."}</span>
//                 </p>
//                 <p className="text-lg font-bold text-gray-800 flex items-center">
//                   <FaRupeeSign className="text-green-600 mr-1" />
//                   {item.price}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
//               <button
//                 onClick={() => handleRemoveFromCart(item)}
//                 className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
//                 aria-label={`Remove one ${item.name} from cart`}
//               >
//                 <FaMinus />
//               </button>
//               <span className="mx-2 text-xl font-semibold text-gray-800 w-8 text-center">
//                 {cart[`${item.restaurantID}-${item.itemID}`]?.count || 0}
//               </span>
//               <button
//                 onClick={() => handleAddToCart(item)}
//                 className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
//                 aria-label={`Add one ${item.name} to cart`}
//               >
//                 <FaPlus />
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       {/* The fixed "Go to Cart" button is now in CustSearchItemDash.jsx */}
//     </div>
//   );
// };

// export default RestaurantMenu;























// src/pages/customer/RestaurantMenu.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
// import { toast } from "react-toastify"; // Removed toast import as it's no longer used for item add/remove

import {
    FaUtensils, // Main icon for the heading
    FaPlus, // Add to cart icon
    FaMinus, // Remove from cart icon
    // FaShoppingCart, // No longer needed directly in this component
    FaInfoCircle, // Item description icon
    FaRupeeSign, // Price icon
    FaExclamationTriangle, // Error icon
    FaSearch, // No items found icon, also used for search bar
} from "react-icons/fa"; // Importing icons

const RestaurantMenu = () => {
    const { restaurantID } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // New state for search term

    const { cart, addToCart, removeFromCart } = useContext(StoreContext);


    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                // Using template literal for API URL for better readability and consistency
                const response = await fetch(`https://localhost:7274/api/MenuItem`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const filteredItems = data.filter(
                        (item) => item.restaurantID === parseInt(restaurantID)
                    );
                    setMenuItems(filteredItems);
                } else {
                    setError("Failed to fetch menu items.");
                }
            } catch (error) {
                console.error("Error fetching menu items:", error);
                setError("An error occurred while fetching menu items.");
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, [restaurantID]);

    // Filter menu items based on search term
    const filteredMenuItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddToCart = (item) => {
        addToCart(item);
    };

    const handleRemoveFromCart = (item) => {
        if (cart[`${item.restaurantID}-${item.itemID}`]?.count > 0) {
            removeFromCart(item.restaurantID, item.itemID);
        }
    };

    return (
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 transform transition duration-500 hover:scale-[1.01] mx-auto m-20">
            <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center drop-shadow-md flex items-center justify-center">
                <FaUtensils className="mr-4" /> Restaurant Menu
            </h2>

            {/* Search Input Field */}
            <div className="mb-8 flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                <FaSearch className="ml-4 mr-3 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search menu items..."
                    className="flex-grow p-3 outline-none rounded-r-lg text-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading && (
                <p className="text-center text-gray-600 text-xl py-8">Loading menu items...</p>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center justify-center mb-6" role="alert">
                    <FaExclamationTriangle className="mr-3" />
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {!loading && !error && filteredMenuItems.length === 0 && (
                <p className="text-center text-gray-600 text-xl py-8 flex items-center justify-center">
                    <FaSearch className="mr-3 text-gray-500" />
                    {searchTerm ? `No results found for "${searchTerm}".` : "No menu items found for this restaurant."}
                </p>
            )}

            <ul className="space-y-6">
                {filteredMenuItems.map((item) => ( // Use filteredMenuItems here
                    <li
                        key={item.itemID}
                        className="group bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-md flex flex-col md:flex-row justify-between items-center transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-[1.01]"
                    >
                        <div className="flex items-start md:items-center w-full md:w-3/4 mb-4 md:mb-0">
                            <img
                                src={item.imageUrl || "https://via.placeholder.com/100x100?text=Food+Item"}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded-lg mr-4 shadow-sm flex-shrink-0"
                            />
                            <div>
                                <h4 className="text-xl font-bold text-blue-800 mb-1 group-hover:text-blue-900 transition-colors">
                                    {item.name}
                                </h4>
                                <p className="text-gray-600 mb-2 flex items-center">
                                    <FaInfoCircle className="text-blue-500 mr-2 flex-shrink-0" />
                                    <span className="text-sm italic">{item.description || "No description provided."}</span>
                                </p>
                                <p className="text-lg font-bold text-gray-800 flex items-center">
                                    <FaRupeeSign className="text-green-600 mr-1" />
                                    {item.price}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
                            <button
                                onClick={() => handleRemoveFromCart(item)}
                                className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
                                aria-label={`Remove one ${item.name} from cart`}
                            >
                                <FaMinus />
                            </button>
                            <span className="mx-2 text-xl font-semibold text-gray-800 w-8 text-center">
                                {cart[`${item.restaurantID}-${item.itemID}`]?.count || 0}
                            </span>
                            <button
                                onClick={() => handleAddToCart(item)}
                                className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                                aria-label={`Add one ${item.name} to cart`}
                            >
                                <FaPlus />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantMenu;