import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
 
import {
  FaSearch,
  FaPlus,
  FaMinus,
  FaInfoCircle,
  FaRupeeSign,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";
 
const SearchItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useContext(StoreContext);
 
  const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || "");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setError("Search query cannot be empty.");
      setSearchResults([]);
      return;
    }
 
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://localhost:7274/api/MenuItem/search?name=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
 
      if (response.ok) {
        const data = await response.json();
 
        // Filter out items from restaurants that are closed
        const filteredResults = data.filter(
          (item) => item.restaurant?.availability === true
        );
 
        setSearchResults(filteredResults);
      } else if (response.status === 400) {
        setError("Menu item name cannot be empty.");
      } else if (response.status === 404) {
        setSearchResults([]);
        setError("No menu items found with the specified name.");
      } else {
        setError("Failed to fetch search results.");
      }
    } catch (err) {
      console.error("Error during search:", err);
      setError("An error occurred while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    if (location.state?.searchQuery) {
      handleSearch(location.state.searchQuery);
    } else {
      setSearchResults([]);
      setLoading(false);
    }
  }, [location.state?.searchQuery]);
 
  const handleAddToCart = (item) => {
    addToCart(item);
  };
 
  const handleRemoveFromCart = (item) => {
    if (cart[`${item.restaurantID}-${item.itemID}`]?.count > 0) {
      removeFromCart(item.restaurantID, item.itemID);
    }
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 mt-8 mb-8 transform transition duration-500 hover:scale-[1.01]">
       
 
        {loading && (
          <p className="text-center text-gray-600 text-xl py-8">Searching for menu items...</p>
        )}
 
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center justify-center mb-6" role="alert">
            <FaExclamationTriangle className="mr-3" />
            <span className="block sm:inline">{error}</span>
          </div>
        )}
 
        {!loading && !error && searchResults.length === 0 && (
          <p className="text-center text-gray-600 text-xl py-8 flex items-center justify-center">
            <FaTimesCircle className="mr-3 text-gray-500" />
            {searchQuery ? `No results found for "${searchQuery}".` : "Enter a dish name to search."}
          </p>
        )}
 
        {searchResults.length > 0 && (
          <ul className="space-y-6">
            {searchResults.map((item) => (
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
                    <h4 className="text-xl font-bold text-blue-800 mb-1 group-hover:text-blue-900 transition-colors">
                      Restaurant: {item.restaurant?.restaurantName || "Unknown"}
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
        )}
      </div>
    </div>
  );
};
 
export default SearchItem;