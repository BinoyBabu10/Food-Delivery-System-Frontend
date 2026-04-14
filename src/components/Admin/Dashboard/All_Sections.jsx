import React from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaUtensils, FaBiking, FaTachometerAlt } from 'react-icons/fa'; // Added FaTachometerAlt for the main title

const AdminDashboardNav = () => {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black font-sans">
      <h1 className="text-5xl font-extrabold text-white text-center mb-12 drop-shadow-2xl flex items-center justify-center tracking-wide">
        <FaTachometerAlt className="text-indigo-400 mr-5 text-6xl" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-300">
          Admin Control Hub
        </span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl w-full px-4"> {/* Increased gap and max-width */}

        {/* Manage Customers Card */}
        <NavLink
          to="c-dash"
          className="group block rounded-2xl shadow-xl p-8 transition-all duration-300 ease-in-out transform hover:-translate-y-3 hover:shadow-2xl
                     bg-gradient-to-br from-blue-700 to-indigo-800 border-2 border-blue-500 border-opacity-70 backdrop-blur-sm
                     relative overflow-hidden
                     hover:from-blue-600 hover:to-indigo-700"
        >
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

          <div className="flex flex-col items-center text-white relative z-10"> {/* z-10 to keep content above overlay */}
            <FaUsers className="text-6xl mb-5 text-blue-300 group-hover:text-amber-100 transition-colors duration-300 transform group-hover:scale-110" />
            <h2 className="text-3xl font-bold mb-3 group-hover:text-amber-100 transition-colors duration-300">
              Manage Customers
            </h2>
            <p className="text-center text-lg text-blue-100 group-hover:text-white transition-colors duration-300 px-2">
              View, edit, and interact with customer profiles.
            </p>
          </div>
        </NavLink>

        {/* Manage Restaurants Card */}
        <NavLink
          to="r-dash"
          className="group block rounded-2xl shadow-xl p-8 transition-all duration-300 ease-in-out transform hover:-translate-y-3 hover:shadow-2xl
                     bg-gradient-to-br from-green-700 to-emerald-800 border-2 border-green-500 border-opacity-70 backdrop-blur-sm
                     relative overflow-hidden
                     hover:from-green-600 hover:to-emerald-700"
        >
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

          <div className="flex flex-col items-center text-white relative z-10">
            <FaUtensils className="text-6xl mb-5 text-green-300 group-hover:text-amber-100 transition-colors duration-300 transform group-hover:scale-110" />
            <h2 className="text-3xl font-bold mb-3 group-hover:text-amber-100 transition-colors duration-300">
              Manage Restaurants
            </h2>
            <p className="text-center text-lg text-green-100 group-hover:text-white transition-colors duration-300 px-2">
              Oversee restaurant profiles, menus, and order flows.
            </p>
          </div>
        </NavLink>

        {/* Manage Agents Card */}
        <NavLink
          to="a-dash"
          className="group block rounded-2xl shadow-xl p-8 transition-all duration-300 ease-in-out transform hover:-translate-y-3 hover:shadow-2xl
                     bg-gradient-to-br from-purple-700 to-pink-800 border-2 border-purple-500 border-opacity-70 backdrop-blur-sm
                     relative overflow-hidden
                     hover:from-purple-600 hover:to-pink-700"
        >
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

          <div className="flex flex-col items-center text-white relative z-10">
            <FaBiking className="text-6xl mb-5 text-purple-300 group-hover:text-amber-100 transition-colors duration-300 transform group-hover:scale-110" />
            <h2 className="text-3xl font-bold mb-3 group-hover:text-amber-100 transition-colors duration-300">
              Manage Agents
            </h2>
            <p className="text-center text-lg text-purple-100 group-hover:text-white transition-colors duration-300 px-2">
              Add, update, and monitor delivery agent details.
            </p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminDashboardNav;






