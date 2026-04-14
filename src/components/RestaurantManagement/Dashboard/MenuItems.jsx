
////////// test ////////////



import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaUtensils,
  FaRupeeSign,
  FaTimes,
  FaSave,
} from "react-icons/fa"; // Importing icons

const MenuItems = () => {
  const { user, token } = useContext(StoreContext); // Access user and token from context
  const [menuItems, setMenuItems] = useState([]); // State to store menu items
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors
  const [editItem, setEditItem] = useState(null); // State to manage the item being edited

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          `https://localhost:7274/api/Restaurant/${user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setMenuItems(data.menuItems); // Set menu items from response
        } else {
          throw new Error("Failed to fetch menu items");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    if (user?.email) {
      fetchMenuItems();
    }
  }, [user, token]);

  // Handle delete menu item
  const handleDelete = async (itemID) => {
    try {
      const response = await fetch(
        `https://localhost:7274/api/MenuItem/${itemID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        }
      );

      if (response.ok) {
        toast.success("Menu item deleted successfully!");
        setMenuItems((prevItems) =>
          prevItems.filter((item) => item.itemID !== itemID)
        ); // Remove the deleted item from the state
      } else {
        toast.error("Failed to delete menu item.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the menu item.");
    }
  };

  // Handle edit menu item using PATCH method
  const handleEdit = async (e) => {
    e.preventDefault();
   
    // Validate price
    if (editItem.price < 2) {
      toast.error("Price cannot be less than ₹2.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return; // Stop submission if validation fails
    }
   
    try {
      const response = await fetch(
        `https://localhost:7274/api/MenuItem/${editItem.itemID}`,
        {
          method: "PATCH", // Use PATCH method
          headers: {
            "Content-Type": "application/json-patch+json",
            Authorization: `Bearer ${token}`, // Include the token
          },
          body: JSON.stringify(editItem), // Send updated item data
        }
      );
   
      if (response.ok) {
        toast.success("Menu item updated successfully!");
        setMenuItems((prevItems) =>
          prevItems.map((item) =>
            item.itemID === editItem.itemID ? editItem : item
          )
        ); // Update the edited item in the state
        setEditItem(null); // Close the edit form
      } else {
        toast.error("Failed to update menu item.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the menu item.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center p-4">
        <p className="text-center text-gray-600 text-xl py-8">
          Loading menu items...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center p-4">
        <p className="text-center text-red-600 text-xl py-8">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 p-4">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 transform transition duration-500">
        <h2 className="text-4xl font-extrabold text-orange-800 mb-8 text-center drop-shadow-md">
          Your Menu Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <div
                key={item.itemID}
                className="bg-orange-50 rounded-lg border border-orange-200 shadow-md p-5 flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={
                    item.imageUrl ||
                    "https://cdn.britannica.com/08/177308-050-94D9D6BE/Food-Pizza-Basil-Tomato.jpg"
                  } // Use imageURL or fallback to placeholder image
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md mb-4 border border-orange-100"
                />
                <h3 className="text-xl font-bold text-black mb-2 flex items-center">
                  <FaUtensils className="text-black mr-2" />
                  {item.name}
                </h3>
                <p className="text-gray-700 text-sm mb-3 flex-grow">
                  {item.description}
                </p>
                <p className="text-green-700 font-extrabold text-lg mt-auto flex items-center">
                  <FaRupeeSign className="mr-1" />
                  {item.price}
                </p>
                <div className="mt-5 flex justify-around space-x-3">
                  <button
                    onClick={() => handleDelete(item.itemID)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-rose-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 ease-in-out font-medium flex items-center justify-center"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                  <button
                    onClick={() => setEditItem(item)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out font-medium flex items-center justify-center"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-xl py-8">
              No menu items found.
            </p>
          )}
        </div>

        {/* Edit Form Modal */}
        {editItem && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center p-4 z-50">
            <form
              onSubmit={handleEdit}
              className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100"
            >
              <h2 className="text-3xl font-bold text-orange-800 mb-6 text-center">
                Edit Menu Item
              </h2>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-lg font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={editItem.name}
                  onChange={(e) =>
                    setEditItem((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-5 py-3 border border-orange-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="block text-gray-700 text-lg font-medium mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={editItem.description}
                  onChange={(e) =>
                    setEditItem((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-5 py-3 border border-orange-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 ease-in-out resize-y"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="price"
                  className="block text-gray-700 text-lg font-medium mb-2"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  value={editItem.price}
                  onChange={(e) =>
                    setEditItem((prev) => ({
                      ...prev,
                      price: parseFloat(e.target.value),
                    }))
                  }
                  className="w-full px-5 py-3 border border-orange-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="imageUrl"
                  className="block text-gray-700 text-lg font-medium mb-2"
                >
                  Image URL
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    id="imageUrl"
                    value={editItem.imageUrl}
                    onChange={(e) =>
                      setEditItem((prev) => ({
                        ...prev,
                        imageUrl: e.target.value,
                      }))
                    }
                    className="flex-grow px-5 py-3 border border-orange-300 rounded-l-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 ease-in-out"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/search?tbm=isch&q=${editItem.name}`,
                        "_blank"
                      )
                    }
                    className="bg-blue-500 text-white py-3 px-5 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out flex items-center"
                  >
                    <FaSearch className="mr-2" /> Search
                  </button>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditItem(null)}
                  className="bg-gradient-to-r from-red-500 to-rose-600 text-white py-3 px-8 rounded-lg hover:from-red-600 hover:to-rose-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 ease-in-out font-medium text-lg flex items-center justify-center"
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-8 rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out font-medium text-lg flex items-center justify-center"
                >
                  <FaSave className="mr-2" /> Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItems;