// import React, { useContext } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { StoreContext } from "../context/StoreContext"; // Adjust path as needed

// export default function Header() {
//   const { user, logout } = useContext(StoreContext); // Access user and logout from context
//   const navigate = useNavigate(); // Added useNavigate for logout redirect

//   const handleLogout = () => {
//     logout(); // Call logout function from context
//     // Optionally show a toast notification here
//     navigate("/login"); // Redirect to login page after logout
//   };

//   return (
//     <header className="shadow sticky z-50 top-0">
//       <nav className="bg-gray-800 text-gray-300 px-4 lg:px-6 py-2.5"> {/* Changed bg-white to bg-gray-800 and added text-gray-300 */}
//         <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
//           {/* Logo */}
//           <Link to="/" className="flex items-center">
//             <img
//               src="https://brand.foodhub.com/images/png/logo_vertical_new.png"
//               className="mr-3 h-12 filter invert brightness-0" // Added filter invert brightness-0
//               alt="FoodieFun Logo"
//             />
//           </Link>

//           {/* Right Section: Login/Logout and Username */}
//           <div className="flex items-center lg:order-2">
//             {user ? (
//               <>
//                 <span className="text-gray-300 font-medium mr-4"> {/* Changed text-gray-800 to text-gray-300 */}
//                   Welcome, {user.restaurantName || user.email?.split("@")[0] || "User"} 😊
//                 </span>
//                 <button
//                   onClick={handleLogout}
//                   className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/register"
//                   className="text-gray-300 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none" // Adjusted hover background and text color
//                 >
//                   Register
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
//                 >
//                   Login
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Navigation Links (Dynamically rendered based on role) */}
//           <div
//             className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
//             id="mobile-menu-2"
//           >
//             <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
//               {/* Admin-Specific Links */}
//               {user?.role === "admin" && (
//                 <>
//                   <li>
//                     <NavLink
//                       to="/admin-dashboard"
//                       className={({ isActive }) =>
//                         `block py-2 pr-4 pl-3 duration-200 ${
//                           isActive ? "text-orange-400" : "text-gray-300" // Adjusted active and inactive link colors
//                         } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0` // Adjusted hover background and border
//                       }
//                     >
//                       Admin Dashboard
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/admin-dashboard/c-dash"
//                       className={({ isActive }) =>
//                         `block py-2 pr-4 pl-3 duration-200 ${
//                           isActive ? "text-orange-400" : "text-gray-300"
//                         } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
//                       }
//                     >
//                       Customers
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/admin-dashboard/r-dash"
//                       className={({ isActive }) =>
//                         `block py-2 pr-4 pl-3 duration-200 ${
//                           isActive ? "text-orange-400" : "text-gray-300"
//                         } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
//                       }
//                     >
//                       Restaurants
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/admin-dashboard/a-dash"
//                       className={({ isActive }) =>
//                         `block py-2 pr-4 pl-3 duration-200 ${
//                           isActive ? "text-orange-400" : "text-gray-300"
//                         } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
//                       }
//                     >
//                       Delivery Agents
//                     </NavLink>
//                   </li>
//                 </>
//               )}

//               {/* Restaurant-Specific Links */}
//               {user?.role === "restaurant" && (
//                 <>
//                   <li>
//                     <NavLink
//                       to="/restaurant-management/profile"
//                       className={({ isActive }) =>
//                         `block py-2 pr-4 pl-3 duration-200 ${
//                           isActive ? "text-orange-400" : "text-gray-300"
//                         } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
//                       }
//                     >
//                       Restaurant Profile
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/restaurant-management/orders"
//                       className={({ isActive }) =>
//                         `block py-2 pr-4 pl-3 duration-200 ${
//                           isActive ? "text-orange-400" : "text-gray-300"
//                         } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
//                       }
//                     >
//                       Orders
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/restaurant-management/add-menu-item"
//                       className={({ isActive }) =>
//                         `block py-2 pr-4 pl-3 duration-200 ${
//                           isActive ? "text-orange-400" : "text-gray-300"
//                         } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
//                       }
//                     >
//                       Add Menu Item
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/restaurant-management/menu-items"
//                       className={({ isActive }) =>
//                         `block py-2 pr-4 pl-3 duration-200 ${
//                           isActive ? "text-orange-400" : "text-gray-300"
//                         } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
//                       }
//                     >
//                       Menu Items
//                     </NavLink>
//                   </li>
//                 </>
//               )}

//               {/* Customer-Specific Links (Moved from CustomerLayout) */}
//               {user?.role === "customer" && (
//                 <>
//                   <li>
//                     <NavLink
//                       to="/customer-management"
//                       end
//                       className={({ isActive }) =>
//                         `block py-2 pr-4 pl-3 duration-200 ${
//                           isActive ? "text-orange-400" : "text-gray-300"
//                         } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
//                       }
//                     >
//                       Home
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/customer-management/profile"
//                       className={({ isActive }) =>
//                         `block py-2 pr-4 pl-3 duration-200 ${
//                           isActive ? "text-orange-400" : "text-gray-300"
//                         } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
//                       }
//                     >
//                       Profile
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/customer-management/order-history"
//                       className={({ isActive }) =>
//                         `block py-2 pr-4 pl-3 duration-200 ${
//                           isActive ? "text-orange-400" : "text-gray-300"
//                         } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
//                       }
//                     >
//                       Order History
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/customer-management/cart"
//                       className={({ isActive }) =>
//                         `block py-2 pr-4 pl-3 duration-200 ${
//                           isActive ? "text-orange-400" : "text-gray-300"
//                         } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
//                       }
//                     >
//                       Cart
//                     </NavLink>
//                   </li>
//                 </>
//               )}

//               {/* Common Links (for logged out users or general app pages) */}
//               {!user && (
//                 <>
//                   <li>
//                     <NavLink
//                       to="/"
//                       className={({ isActive }) =>
//                         `block py-2 pr-4 pl-3 duration-200 ${
//                           isActive ? "text-orange-400" : "text-gray-300"
//                         } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
//                       }
//                     >
//                       Home
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/about"
//                       className={({ isActive }) =>
//                         `block py-2 pr-4 pl-3 duration-200 ${
//                           isActive ? "text-orange-400" : "text-gray-300"
//                         } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
//                       }
//                     >
//                       About
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/contact"
//                       className={({ isActive }) =>
//                         `block py-2 pr-4 pl-3 duration-200 ${
//                           isActive ? "text-orange-400" : "text-gray-300"
//                         } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
//                       }
//                     >
//                       Contact
//                     </NavLink>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }





import React, { useContext, useState } from "react"; // Import useState
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa'; // Import icons for hamburger/close and cart

export default function Header() {
  const { user, logout, cart } = useContext(StoreContext); // Access user, logout, and cart
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu toggle
const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

const handleSearch = () => {
  if (searchQuery.trim() === "") {
    alert("Please enter a search query.");
    return;
  }
  // Navigate to the search results page and pass the search query as state
  navigate("/customer-management/search-results", { state: { searchQuery } });
  setSearchQuery(""); // Clear the search query after navigating
};

  // Calculate total items in cart to show badge
  const totalCartItems = Object.values(cart).reduce((sum, item) => sum + item.count, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-gray-800 text-gray-300 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://brand.foodhub.com/images/png/logo_vertical_new.png"
              className="mr-3 h-12 filter invert brightness-0"
              alt="FoodieFun Logo"
            />
          </Link>

          {/* Right Section: Login/Logout, Username, and Mobile Menu Button */}
          <div className="flex items-center lg:order-2">
            {user ? (
              <>
                <span className="hidden md:inline-block text-gray-300 font-medium mr-4"> {/* Hide on small screens, show on medium+ */}
                  Welcome, {user.restaurantName || user.email?.split("@")[0] || "User"} 😊
                </span>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Logout
                </button>
 
                
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-gray-300 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Login
                </Link>
              </>
            )}
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-400 rounded-lg lg:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

          {/* Navigation Links (Dynamically rendered based on role) */}
          <div
            className={`${isMobileMenuOpen ? 'block' : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {/* Admin-Specific Links */}
              {user?.role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/admin-dashboard"
                      end 
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-400" : "text-gray-300"
                        } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
                      }
                      onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                    >
                      Admin Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin-dashboard/c-dash"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-400" : "text-gray-300"
                        } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Customers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin-dashboard/r-dash"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-400" : "text-gray-300"
                        } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Restaurants
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin-dashboard/a-dash"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-400" : "text-gray-300"
                        } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Delivery Agents
                    </NavLink>
                  </li>
                </>
              )}

              {/* Restaurant-Specific Links */}
               {user?.role === "restaurant" && (
                <>
                  <li>
                    <NavLink
                      to="/restaurant-management/profile"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-700" : "text-white"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      Restaurant Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/restaurant-management/orders"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-700" : "text-white"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      // CORRECTED LINE: Changed 'OrderHistory' to 'order-history' to match the route definition
                      to="/restaurant-management/order-history"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-700" : "text-white"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      Order History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      // CORRECTED LINE: Changed 'OrderHistory' to 'order-history' to match the route definition
                      to="/restaurant-management/RestaurantDashboard"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-700" : "text-white"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      RestaurantDash
                    </NavLink>
                  </li>


                  <li>
                    <NavLink
                      to="/restaurant-management/add-menu-item"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-700" : "text-white"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      Add Menu Item
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/restaurant-management/menu-items"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-700" : "text-white"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      Menu Items
                    </NavLink>
                  </li>
                </>
              )}

              {/* Customer-Specific Links (Moved from CustomerLayout) */} 
               {user?.role === "agent" && (
                <>
                  <li>
                    <NavLink
                      to="/agent-dashboard" // Absolute path to Customer Home
                      end // 'end' prop ensures it's active only when the path matches exactly
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-700" : "text-white"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      AgentDashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/agent-dashboard/profile" // Corrected to match route in index.jsx
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-700" : "text-white"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/agent-dashboard/orders"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-700" : "text-white"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      OrderDetails
                    </NavLink>
                  </li>
                </>
              )}

              {/* Customer-Specific Links */}
              {user?.role === "customer" && (
                <>
                  <li>
                    <NavLink
                      to="/customer-management"
                      end
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-400" : "text-gray-300"
                        } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/customer-management/profile"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-400" : "text-gray-300"
                        } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/customer-management/order-history"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-400" : "text-gray-300"
                        } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Order History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/customer-management/cart"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-400" : "text-gray-300"
                        } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Cart
                    </NavLink>
                  </li>
<li>
                    <div className="flex items-center text-black">
                      <input
                        type="text"
                        placeholder="Search for menu items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border rounded px-4 py-1 w-full"
                      />
                      <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white px-4 py-1 rounded ml-2"
                      >
                        Search
                      </button>
                    </div>
                  </li>
                </>
              )}

              {/* Common Links (for logged out users or general app pages) */}
              {!user && (
                <>
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-400" : "text-gray-300"
                        } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-400" : "text-gray-300"
                        } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-400" : "text-gray-300"
                        } border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}








