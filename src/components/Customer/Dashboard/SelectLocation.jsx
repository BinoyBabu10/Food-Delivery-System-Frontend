// import React from "react";
// import { useNavigate } from "react-router-dom";

// const SelectLocation = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Select Location</h2>
//       <div className="flex flex-col gap-4">
//         <button
//           onClick={() => navigate("/customer-management/profile1")}
//           className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//         >
//           Edit Location
//         </button>
//         <button
//           onClick={() => navigate("/customer-management/profile1")}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           Add Location
//         </button>
//         <button
//           onClick={() => navigate("/customer-management/order-summary")}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Go with Same Location
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SelectLocation;





import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkedAlt, // Main icon for the heading
  FaEdit, // Edit Location icon
  FaPlusCircle, // Add Location icon
  FaCheckCircle, // Go with Same Location icon
} from "react-icons/fa"; // Importing icons

const SelectLocation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 transform transition duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center drop-shadow-md flex items-center justify-center">
          <FaMapMarkedAlt className="mr-4" /> Select Location
        </h2>

        <div className="flex flex-col gap-5">
          <button
            onClick={() => navigate("/customer-management/profile")}
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white py-3 px-6 rounded-lg shadow-md hover:from-yellow-600 hover:to-amber-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition duration-300 ease-in-out font-semibold text-lg flex items-center justify-center"
          >
            <FaEdit className="mr-3" /> Edit Location
          </button>
          {/* <button
            onClick={() => navigate("/customer-management/profile")}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out font-semibold text-lg flex items-center justify-center"
          >
            <FaPlusCircle className="mr-3" /> Add Location
          </button> */}
          <button
            onClick={() => navigate("/customer-management/order-summary")}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out font-semibold text-lg flex items-center justify-center"
          >
            <FaCheckCircle className="mr-3" /> Go with Same Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectLocation;