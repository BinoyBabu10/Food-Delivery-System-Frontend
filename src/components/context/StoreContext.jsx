///////////////////////////////
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Make sure react-toastify is imported here for the toast.warn

// Create a centralized Axios instance with a base URL
export const API = axios.create({
  baseURL: "https://localhost:7274/api", // Base URL for the API
});

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user details
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Load token from localStorage
  const [customerID, setCustomerID] = useState(null); // Store customer ID (Note: Consider if 'user.customerID' is sufficient instead of a separate state)
  const [cart, setCart] = useState({}); // Store cart items (Initialized as an object for unique keys)
  const [currentRestaurant, setCurrentRestaurant] = useState(null); // Tracks the restaurant of items currently in the cart

  // Define the maximum quantity allowed for a single menu item
  const MAX_ITEM_QUANTITY = 5;

  // Add Axios interceptor to include the Authorization header in all requests
  useEffect(() => {
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      // If token is null/empty, remove the Authorization header
      delete API.defaults.headers.common["Authorization"];
    }
  }, [token]); // This effect runs whenever the token changes

  const login = async (email, password) => {
    try {
      // Fetch the token and user role from the backend
      const { data } = await API.post("/Token/login", { email, password });

      // Save token and persist it in localStorage
      setToken(data.token);
      localStorage.setItem("token", data.token);

      // Immediately set the Authorization header for subsequent calls in this session
      API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      // Fetch user details based on role directly in the login function
      let userDetails = { email, role: data.role };
      if (data.role === "restaurant") {
        const restaurantResponse = await API.get(`/Restaurant/${email}`);
        userDetails.restaurantID = restaurantResponse.data.restaurantID;
      } else if (data.role === "customer") {
        const customerResponse = await API.get(`/Customer/${email}`);
        userDetails.customerID = customerResponse.data.customerID;
      } else if (data.role === "agent") {
        const agentResponse = await API.get(`/Agent/${email}`);
        userDetails.agentID = agentResponse.data.agentID;
      }

      // Update user state and return the role
      setUser(userDetails);
      return data.role;
    } catch (error) {
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null); // Clear the token state
    localStorage.removeItem("token"); // Remove token from localStorage
    delete API.defaults.headers.common["Authorization"]; // Remove Authorization header from Axios instance
    clearCart(); // Clear cart on logout
  };
  const removeFromCart = (restaurantID, itemID) => {
    const uniqueKey = `${restaurantID}-${itemID}`;
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
  
      if (updatedCart[uniqueKey]) {
        if (updatedCart[uniqueKey].count === 1) {
          // If the count is 1, remove the item completely from the cart
          delete updatedCart[uniqueKey];
          // If cart becomes empty, reset currentRestaurant
          if (Object.keys(updatedCart).length === 0) {
            setCurrentRestaurant(null);
          }
        } else {
          // Otherwise, just decrement the count
          updatedCart[uniqueKey] = {
            ...updatedCart[uniqueKey],
            count: updatedCart[uniqueKey].count - 1,
          };
        }
      }
      return updatedCart;
    });
  };



  const addToCart = (item) => {
    if (currentRestaurant && currentRestaurant !== item.restaurantID) {
      // Show confirmation dialog if adding items from a different restaurant
      if (
        !window.confirm(
          "Adding items from a different restaurant will clear your current cart. Do you want to continue?"
        )
      ) {
        return; // Exit if the user cancels
      }
      clearCart(); // Clear the cart if the user confirms
    }
   
    setCurrentRestaurant(item.restaurantID); // Set the current restaurant
   
    const uniqueKey = `${item.restaurantID}-${item.itemID}`; // Create a unique key for the item
   
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
   
      if (updatedCart[uniqueKey]) {
        // If the item already exists in the cart, check the current count against the limit
        if (updatedCart[uniqueKey].count < MAX_ITEM_QUANTITY) {
          updatedCart[uniqueKey] = {
            ...updatedCart[uniqueKey],
            count: updatedCart[uniqueKey].count + 1, // Increment count
          };
        } else {
          // If the limit is reached, show a warning toast
          toast.warn(`Max limit to order this item is ${MAX_ITEM_QUANTITY}`);
          return prevCart; // Return the previous cart state without changes
        }
      } else {
        // If the item is not in the cart, add it with a count of 1
        updatedCart[uniqueKey] = { ...item, count: 1 };
      }
   
      return updatedCart; // Return the updated cart
    });
  };

  



  const removeAllOfItemFromCart = (restaurantID, itemID) => {
    const uniqueKey = `${restaurantID}-${itemID}`;
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[uniqueKey]) {
        // Completely remove the item from the cart object
        delete updatedCart[uniqueKey];
        // If cart becomes empty after removal, reset currentRestaurant
        if (Object.keys(updatedCart).length === 0) {
          setCurrentRestaurant(null);
        }
      }
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart({});
    setCurrentRestaurant(null); // Reset current restaurant when cart is cleared
  };

  // This useEffect handles initial token loading from localStorage
  // and setting the Authorization header on API.
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      API.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <StoreContext.Provider
      value={{
        user,
        setUser, // Added setUser to context value, might be useful for updating user info
        token,
        setToken, // Added setToken to context value, might be useful
        login,
        logout,
        addToCart,
        removeFromCart,
        removeAllOfItemFromCart,
        clearCart,
        cart,
        API,
        currentRestaurant, // Expose currentRestaurant if needed elsewhere
        setCurrentRestaurant // Expose setCurrentRestaurant if needed elsewhere
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};












/////////////////////// main ///////////////////


// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify"; // Ensure react-toastify is imported for notifications
 
// // Create a centralized Axios instance with a base URL
// export const API = axios.create({
//   baseURL: "https://localhost:7274/api", // Base URL for the API
// });
 
// export const StoreContext = createContext();
 
// export const StoreContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Store user details
//   const [token, setToken] = useState(localStorage.getItem("token") || null); // Load token from localStorage
//   const [customerID, setCustomerID] = useState(null); // Store customer ID
//   const [cart, setCart] = useState({}); // Store cart items
//   const [currentRestaurant, setCurrentRestaurant] = useState(null); // Tracks the restaurant of items currently in the cart
 
//   const MAX_ITEM_QUANTITY = 5; // Define the maximum quantity allowed for a single menu item
 
//   // Add Axios interceptor to include the Authorization header in all requests
//   useEffect(() => {
//     if (token) {
//       API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     } else {
//       delete API.defaults.headers.common["Authorization"];
//     }
//   }, [token]);
 
//   const login = async (email, password) => {
//     try {
//       const { data } = await API.post("/Token/login", { email, password });
 
//       setToken(data.token);
//       localStorage.setItem("token", data.token);
 
//       API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
 
//       let userDetails = { email, role: data.role };
//       if (data.role === "restaurant") {
//         const restaurantResponse = await API.get(`/Restaurant/${email}`);
//         userDetails.restaurantID = restaurantResponse.data.restaurantID;
//       } else if (data.role === "customer") {
//         const customerResponse = await API.get(`/Customer/${email}`);
//         userDetails.customerID = customerResponse.data.customerID;
//         setCustomerID(customerResponse.data.customerID);
//       }
 
//       setUser(userDetails);
//       return data.role;
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//       return null;
//     }
//   };
 
//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     setCustomerID(null);
//     setCart({});
//     localStorage.removeItem("token");
//     delete API.defaults.headers.common["Authorization"];
//   };
 
//   const addToCart = (item) => {
//     if (currentRestaurant && currentRestaurant !== item.restaurantID) {
//       if (
//         !window.confirm(
//           "Adding items from a different restaurant will clear your current cart. Do you want to continue?"
//         )
//       ) {
//         return;
//       }
//       clearCart();
//     }
//     setCurrentRestaurant(item.restaurantID);
 
//     const uniqueKey = `${item.restaurantID}-${item.itemID}`;
 
//     setCart((prevCart) => {
//       const updatedCart = { ...prevCart };
 
//       if (updatedCart[uniqueKey]) {
//         if (updatedCart[uniqueKey].count >= MAX_ITEM_QUANTITY) {
//           toast.warn(`You can only add up to ${MAX_ITEM_QUANTITY} of this item.`);
//           return prevCart;
//         }
//         updatedCart[uniqueKey] = {
//           ...updatedCart[uniqueKey],
//           count: updatedCart[uniqueKey].count + 1,
//         };
//       } else {
//         updatedCart[uniqueKey] = { ...item, count: 1 };
//       }
 
//       return updatedCart;
//     });
//   };
 
//   const removeFromCart = (restaurantID, itemID) => {
//     const uniqueKey = `${restaurantID}-${itemID}`;
//     setCart((prevCart) => {
//       const updatedCart = { ...prevCart };
 
//       if (updatedCart[uniqueKey]) {
//         if (updatedCart[uniqueKey].count === 1) {
//           delete updatedCart[uniqueKey];
//         } else {
//           updatedCart[uniqueKey] = {
//             ...updatedCart[uniqueKey],
//             count: updatedCart[uniqueKey].count - 1,
//           };
//         }
//       }
 
//       return updatedCart;
//     });
//   };
 
//   const clearCart = () => {
//     setCart({});
//     setCurrentRestaurant(null);
//   };
 
//   // Load token from localStorage on initial render
//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) {
//       setToken(savedToken);
//       API.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
//     }
//   }, []);
 
//   return (
//     <StoreContext.Provider
//       value={{
//         user,
//         token,
//         customerID,
//         cart,
//         login,
//         logout,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         currentRestaurant,
//       }}
//     >
//       {children}
//     </StoreContext.Provider>
//   );
// };
