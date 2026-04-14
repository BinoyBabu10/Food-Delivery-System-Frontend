
/// main code//
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa"; // Importing an icon for the heading

const MenuDisplay = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Pizza", image: "https://tse2.mm.bing.net/th/id/OIP.giyl2YTqBjzb8ckIWeEdbAHaHa?r=0&rs=1&pid=ImgDetMain" },
    { name: "Burger", image: "https://d2i4dsjnpaubom.cloudfront.net/restaurant_products/images/000/000/147/large/Bacon_Deluxe_za_web.png?1559029069" },
    { name: "Sandwich", image: "https://tse1.mm.bing.net/th/id/OIP.TKCLXxPZiIfMfDBRyEmFUAHaGe?r=0&rs=1&pid=ImgDetMain" },
    { name: "Tacos", image: "https://tse2.mm.bing.net/th/id/OIP.VCtX2AWQIFJoM5FMpMvIdwHaF_?r=0&rs=1&pid=ImgDetMain" },
    { name: "Sushi", image: "https://tse1.mm.bing.net/th/id/OIP.DqKyVWnLkRQkxiffQ300tgHaHa?r=0&rs=1&pid=ImgDetMain" },
  ];

  const handleSearchItem = (itemName) => {
    // Navigate to the SearchItem page with the selected item as the search query
    navigate("/customer-management/search-results", { state: { searchQuery: itemName } });
  };

  return (
    <div className="min-h-screen  to-indigo-100 flex items-center justify-center p-2">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8 transform transition duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center drop-shadow-md flex items-center justify-center">
          <FaUtensils className="mr-4" /> Explore Cuisines
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2 bg-blue-50 border border-blue-200"
              onClick={() => handleSearchItem(item.name)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <div className="text-center p-3 bg-blue-100 border-t border-blue-600">
                <p className="font-bold text-lg text-blue-800">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuDisplay;






