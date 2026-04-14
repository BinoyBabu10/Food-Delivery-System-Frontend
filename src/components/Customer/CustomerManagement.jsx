


import React, { useContext } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import RestaurantCards from "./Dashboard/RestaurantCards"; // Assuming path is correct
import MenuDisplay from "./Dashboard/MenuDisplay"; // Assuming path is correct
// RestaurantMenu is already imported within RestaurantCards, so it's not needed here
import { StoreContext } from "../context/StoreContext"; // Adjust path if necessary
import { FaShoppingCart } from "react-icons/fa"; // Import cart icon

const CustomerManagement = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const { cart } = useContext(StoreContext); // Access cart from context
  const hasItemsInCart = Object.keys(cart).length > 0; // Check if there are items in the cart

  const isCartPage = location.pathname === "/customer-management/cart";


  const handleGoToCart = () => {
    navigate("/customer-management/cart"); // Navigate to the cart page
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center">
      {/* Conditionally Render Dashboard Elements */}
      {location.pathname === "/customer-management" && (
        <>
          {/* Menu Display (e.g., categories, search bar) */}
          <MenuDisplay />
          {/* Restaurant Cards */}
          <RestaurantCards />
        </>
      )}

      {/* Render child routes */}
      {/* The Outlet will render components like RestaurantMenu, OrderSummary, Payment, etc. */}
      <div className="w-full"> {/* Ensure Outlet content also fits the overall page layout */}
        <Outlet />
      </div>

      {/* "Go to Cart" Button - Fixed Position, always visible if items in cart */}
      {!isCartPage && hasItemsInCart && (
        <button
          onClick={handleGoToCart}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out font-semibold text-lg flex items-center justify-center z-50 animate-bounce-slow"
        >
          <FaShoppingCart className="mr-3 text-xl" /> Go to Cart
        </button>
      )}
    </div>
  );
};

export default CustomerManagement;






// import React, { useContext, useEffect, useState } from "react";
// import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
// import RestaurantCards from "./Dashboard/RestaurantCards";
// import MenuDisplay from "./Dashboard/MenuDisplay";
// import { StoreContext } from "../context/StoreContext";
// import { FaShoppingCart } from "react-icons/fa";
 
// const bannerImages = [
//   "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Delicious array of dishes
//   "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Delicious pasta
//   "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Burger and fries
//   "https://images.pexels.com/photos/1482803/pexels-photo-1482803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Pizza slices
// ];
 
// const CustomerManagement = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { cart } = useContext(StoreContext);
//   const hasItemsInCart = Object.keys(cart).length > 0;
 
//   const [currentSlide, setCurrentSlide] = useState(0);
 
//   // Check if the current path is exactly '/customer-management' (the home page)
//   const isHomePage = location.pathname === "/customer-management";
//   const isCartPage = location.pathname === "/customer-management/cart";
 
//   useEffect(() => {
//     // Only run the slider effect if we are on the home page
//     if (isHomePage) {
//       const interval = setInterval(() => {
//         setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerImages.length);
//       }, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [isHomePage]); // Re-run effect if isHomePage changes
 
//   const handleGoToCart = () => {
//     navigate("/customer-management/cart");
//   };
 
//   return (
//     <div className="  bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center">
     
//       {/* Conditionally Render Dashboard Elements ONLY on the home page */}
//       {isHomePage && (
//         <>
//           {/* --- Large Sliding Banner Section --- */}
//           <div className="mx-auto  max-w-7xl mt-24  relative w-full h-[500px] overflow-hidden rounded-lg shadow-xl mb-12">
//             {bannerImages.map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`Banner ${index + 1}`}
//                 className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
//                   index === currentSlide ? "opacity-100" : "opacity-0"
//                 }`}
//               />
//             ))}
//             <div className=" relative w-full h-[500px] overflow-hidden rounded-lg shadow-xl mb-12">
//               <div className="text-center text-white mt-48">
//                 <h1 className="text-6xl font-extrabold mb-4 animate-fade-in-up">
//                   Craving Something Delicious?
//                 </h1>
//                 <p className="text-xl mb-8 animate-fade-in-up delay-200">
//                   Order from your favorite restaurants, delivered fast!
//                 </p>
//                 <Link
//                   className="inline-flex text-white items-center px-8 py-4 text-xl font-bold bg-orange-600 rounded-full shadow-lg hover:bg-orange-700 transition duration-300 transform hover:scale-105 animate-fade-in-up delay-400"
//                   to="/customer-management/select-location"
//                 >
//                   Start Your Order
               
//                 </Link>
//               </div>
//             </div>
//           </div>
//           {/* Menu Display (e.g., categories, search bar) */}
//           <MenuDisplay />
//           {/* Restaurant Cards */}
//           <RestaurantCards />
//         </>
//       )}
 
//       {/* Render child routes regardless of being on homepage */}
//       <div className="w-full">
//         <Outlet />
//       </div>
 
//       {/* "Go to Cart" Button - Fixed Position, always visible if items in cart */}
//       {!isCartPage && hasItemsInCart && (
//         <button
//           onClick={handleGoToCart}
//           className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out font-semibold text-lg flex items-center justify-center z-50 animate-bounce-slow"
//         >
//           <FaShoppingCart className="mr-3 text-xl" /> Go to Cart
//         </button>
//       )}
//     </div>
//   );
// };
 
// export default CustomerManagement;
 