// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom"; // Import useSearchParams for query parameters
// import { toast } from "react-toastify";

// const MenuItems_D = () => {
//   const [menuItems, setMenuItems] = useState([]); // State to store menu items
//   const [filteredMenuItems, setFilteredMenuItems] = useState([]); // State for filtered menu items
//   const [loading, setLoading] = useState(true); // State to manage loading
//   const [error, setError] = useState(null); // State to manage errors
//   const [editItem, setEditItem] = useState(null); // State to manage the item being edited
//   const [searchTerm, setSearchTerm] = useState(""); // State for search input
//   const [searchParams] = useSearchParams(); // Get query parameters

//   const email = searchParams.get("email"); // Extract email from query parameters
//   const token = localStorage.getItem("token"); // Retrieve token from localStorage

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const response = await fetch(
//           `https://localhost:7274/api/Restaurant/${email}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`, // Include the token
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           setMenuItems(data.menuItems); // Set menu items from response
//           setFilteredMenuItems(data.menuItems); // Initialize filtered menu items
//         } else {
//           throw new Error("Failed to fetch menu items");
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false); // Set loading to false
//       }
//     };

//     if (email) {
//       fetchMenuItems();
//     }
//   }, [email, token]);

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     if (term === "") {
//       setFilteredMenuItems(menuItems); // Show all items if search is empty
//     } else {
//       setFilteredMenuItems(
//         menuItems.filter((item) =>
//           item.name.toLowerCase().includes(term.toLowerCase())
//         )
//       );
//     }
//   };

//   // Handle delete menu item
//   const handleDelete = async (itemID) => {
//     try {
//       const response = await fetch(
//         `https://localhost:7274/api/MenuItem/${itemID}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token
//           },
//         }
//       );

//       if (response.ok) {
//         toast.success("Menu item deleted successfully!");
//         setMenuItems((prevItems) =>
//           prevItems.filter((item) => item.itemID !== itemID)
//         ); // Remove the deleted item from the state
//         setFilteredMenuItems((prevItems) =>
//           prevItems.filter((item) => item.itemID !== itemID)
//         ); // Update filtered items
//       } else {
//         toast.error("Failed to delete menu item.");
//       }
//     } catch (error) {
//       toast.error("An error occurred while deleting the menu item.");
//     }
//   };

//   // Handle edit menu item using PATCH method
  
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl mb-4">Menu Items</h2>

//       {/* Search Input */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search menu items..."
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredMenuItems.map((item) => (
//           <div
//             key={item.itemID}
//             className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-200"
//           >
//             <img
//               src={
//                 item.imageUrl ||
//                 "https://cdn.britannica.com/08/177308-050-94D9D6BE/Food-Pizza-Basil-Tomato.jpg"
//               } // Use imageURL or fallback to placeholder image
//               alt={item.name}
//               className="w-full h-40 object-cover rounded-md mb-4"
//             />
//             <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//             <p className="text-gray-600">{item.description}</p>
//             <p className="text-orange-700 font-bold mt-2">₹{item.price}</p>
//             <div className="mt-4 flex justify-between">
//               <button
//                 onClick={() => handleDelete(item.itemID)}
//                 className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
//               >
//                 Delete
//               </button>
              
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Edit Form */}
      
//     </div>
//   );
// };

// export default MenuItems_D;



import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams for query parameters
import { toast } from "react-toastify";
import {
  FaSearch,
  FaUtensils,
  FaRupeeSign,
  FaSpinner, // Added for loading
} from "react-icons/fa"; // Importing icons

const MenuItems_D = () => {
  const [menuItems, setMenuItems] = useState([]); // State to store menu items
  const [filteredMenuItems, setFilteredMenuItems] = useState([]); // State for filtered menu items
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [searchParams] = useSearchParams(); // Get query parameters

  const email = searchParams.get("email"); // Extract email from query parameters
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          `https://localhost:7274/api/Restaurant/${email}`,
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
          setFilteredMenuItems(data.menuItems); // Initialize filtered menu items
        } else {
          throw new Error("Failed to fetch menu items");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    if (email) {
      fetchMenuItems();
    }
  }, [email, token]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === "") {
      setFilteredMenuItems(menuItems); // Show all items if search is empty
    } else {
      setFilteredMenuItems(
        menuItems.filter((item) =>
          item.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  // Handle delete menu item (This function is kept as per your request,
  // even though it might not be directly used in a customer-facing view
  // that typically doesn't allow deletions.)
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
        setFilteredMenuItems((prevItems) =>
          prevItems.filter((item) => item.itemID !== itemID)
        ); // Update filtered items
      } else {
        toast.error("Failed to delete menu item.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the menu item.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center p-4">
        <FaSpinner className="animate-spin text-orange-500 text-6xl" />
        <p className="text-center text-gray-700 text-2xl py-8 ml-4">
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
          Our Delicious Menu
        </h2>

        {/* Search Input */}
        <div className="mb-8 relative">
          <input
            type="text"
            placeholder="Search menu items..."
            className="w-full p-4 pl-12 border border-orange-300 rounded-lg text-gray-800 bg-orange-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 ease-in-out shadow-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-600 text-xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item) => (
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
                {/* Delete button removed for customer view as per typical UI */}
                 <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleDelete(item.itemID)}
                    className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div> 
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-xl py-8">
              No menu items found for your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItems_D;