


import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUtensils, FaRupeeSign, FaImage, FaPlusCircle, FaSearch } from "react-icons/fa"; // Importing icons

const AddMenuItem = () => {
  const { user, token } = useContext(StoreContext); // Access user and token from context
  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    price: "",
    imageURL: "", // Added imageURL field
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
   
    // Validate price
    if (menuItem.price < 2) {
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
      const response = await fetch("https://localhost:7274/api/MenuItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token
        },
        body: JSON.stringify({ ...menuItem, restaurantID: user.restaurantID }), // Include restaurantID
      });
   
      if (response.ok) {
        toast.success("Menu item added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setMenuItem({ name: "", description: "", price: "", imageURL: "" }); // Reset form
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to add menu item.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("An error occurred.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <form
        onSubmit={onSubmitHandler}
        className="p-8 bg-white rounded-xl shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105"
      >
        <h2 className="text-4xl font-extrabold text-orange-800 mb-8 text-center drop-shadow-md">
          Add New Menu Item
        </h2>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-orange-700 text-lg font-medium mb-2"
            >
              <FaUtensils className="inline-block mr-2 text-orange-600" />
              Item Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={onChangeHandler}
              value={menuItem.name}
              className="w-full px-5 py-3 border border-orange-300 rounded-lg text-gray-800 bg-orange-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 ease-in-out"
              placeholder="E.g., Margherita Pizza"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-orange-700 text-lg font-medium mb-2"
            >
              <FaUtensils className="inline-block mr-2 text-orange-600" />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={onChangeHandler}
              value={menuItem.description}
              className="w-full px-5 py-3 border border-orange-300 rounded-lg text-gray-800 bg-orange-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 ease-in-out resize-y"
              rows="3"
              placeholder="A delicious pizza with fresh basil and mozzarella..."
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-orange-700 text-lg font-medium mb-2"
            >
              <FaRupeeSign className="inline-block mr-2 text-orange-600" />
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={onChangeHandler}
              value={menuItem.price}
              className="w-full px-5 py-3 border border-orange-300 rounded-lg text-gray-800 bg-orange-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 ease-in-out"
              placeholder="E.g., 250"
              required
            />
          </div>
          <div>
            <label
              htmlFor="imageURL"
              className="block text-orange-700 text-lg font-medium mb-2"
            >
              <FaImage className="inline-block mr-2 text-orange-600" />
              Image URL
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="imageURL"
                name="imageURL"
                onChange={onChangeHandler}
                value={menuItem.imageURL}
                className="flex-grow px-5 py-3 border border-orange-300 rounded-l-lg text-gray-800 bg-orange-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 ease-in-out"
                placeholder="https://example.com/item.jpg"
                required
              />
              <button
                type="button"
                onClick={() =>
                  window.open(
                    `https://www.google.com/search?tbm=isch&q=${menuItem.name}`,
                    "_blank"
                  )
                }
                className="bg-blue-500 text-white py-3 px-5 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out flex items-center justify-center"
              >
                <FaSearch className="mr-2" /> Search
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out font-medium text-lg flex items-center justify-center"
          >
            <FaPlusCircle className="mr-2" /> Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMenuItem;