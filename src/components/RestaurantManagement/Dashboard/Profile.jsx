




// /////test///////////



// import React, { useContext, useEffect, useState } from "react";
// import { StoreContext } from "../../context/StoreContext";
// import { toast } from "react-toastify";
// import {
//   FaUtensils,
//   FaEnvelope,
//   FaClock,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaEdit,
//   FaSave,
//   FaTimes,
// } from "react-icons/fa"; // Importing icons

// const Profile = () => {
//   const { user, token } = useContext(StoreContext); // Access user and token from context
//   const [restaurantDetails, setRestaurantDetails] = useState(null); // Store restaurant details
//   const [editMode, setEditMode] = useState(false); // Toggle edit mode
//   // Initialize formData.phone with only the 10 digits, as +91 will be handled separately in the UI
//   const [formData, setFormData] = useState({ phone: "", address: "" }); // Form data for updates
//   const [errors, setErrors] = useState({}); // Store validation errors

//   // Fetch restaurant details on component mount
//   useEffect(() => {
//     const fetchRestaurantDetails = async () => {
//       if (user?.email && user.role === "restaurant") {
//         try {
//           const response = await fetch(
//             `https://localhost:7274/api/Restaurant/${user.email}`,
//             {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );

//           if (response.ok) {
//             const data = await response.json();
//             setRestaurantDetails(data);
//             // Extract only the 10 digits for the form data
//             const extractedPhone = data.restaurantContact.startsWith('+91')
//               ? data.restaurantContact.substring(3) // Remove '+91'
//               : data.restaurantContact; // Assume it's already just the 10 digits if no +91
//             setFormData({ phone: extractedPhone, address: data.address }); // Pre-fill form data
//           } else {
//             toast.error("Failed to fetch restaurant details.");
//           }
//         } catch (error) {
//           console.error("Error fetching restaurant details:", error);
//           toast.error("An error occurred while fetching restaurant details.");
//         }
//       }
//     };

//     fetchRestaurantDetails();
//   }, [user, token]);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "phone") {
//       // Allow only digits and limit to 10 characters for the phone input
//       const digitsOnly = value.replace(/\D/g, '').substring(0, 10);
//       setFormData((prevData) => ({ ...prevData, [name]: digitsOnly }));
//     } else {
//       setFormData((prevData) => ({ ...prevData, [name]: value }));
//     }

//     // Clear errors when the user starts typing
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//   };

//   // Validate form data
//   const validateForm = () => {
//     const newErrors = {};

//     // Validate phone number: ensure it's exactly 10 digits
//     if (!/^\d{10}$/.test(formData.phone)) {
//       newErrors.phone = "Phone number must be exactly 10 digits.";
//     }

//     // Validate address
//     if (!formData.address.trim()) {
//       newErrors.address = "Address cannot be empty.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // Return true if no errors
//   };

//   // Handle update submission
//   const handleUpdate = async () => {
//     if (!validateForm()) {
//       return; // Stop submission if validation fails
//     }

//     // When sending to API, combine '+91' with the 10 digits from formData
//     const fullPhoneNumber = `+91${formData.phone}`;

//     try {
//       const response = await fetch(
//         `https://localhost:7274/api/Restaurant/${user.email}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json-patch+json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             phone: fullPhoneNumber, // Send the full phone number
//             address: formData.address,
//           }),
//         }
//       );

//       if (response.ok) {
//         toast.success("Details updated successfully!");
//         setEditMode(false); // Exit edit mode
//         setRestaurantDetails((prevDetails) => ({
//           ...prevDetails,
//           restaurantContact: fullPhoneNumber, // Update with the full number
//           address: formData.address,
//         }));
//       } else {
//         toast.error("Failed to update details.");
//       }
//     } catch (error) {
//       console.error("Error updating details:", error);
//       toast.error("An error occurred while updating details.");
//     }
//   };










//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 transform transition duration-500 hover:scale-105">
//         <h2 className="text-4xl font-extrabold text-orange-800 mb-8 text-center drop-shadow-md">
//           Your Profile
//         </h2>

//         {restaurantDetails ? (
//           <div className="space-y-6">
//             <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 shadow-sm">
//               <p className="text-lg mb-3 flex items-center">
//                 <FaUtensils className="text-orange-600 mr-3" />
//                 <strong className="font-semibold text-orange-700">
//                   Restaurant Name:
//                 </strong>{" "}
//                 <span className="text-gray-900 ml-2">
//                   {restaurantDetails.restaurantName}
//                 </span>
//               </p>
//               <p className="text-lg mb-3 flex items-center">
//                 <FaEnvelope className="text-orange-600 mr-3" />
//                 <strong className="font-semibold text-orange-700">
//                   Email:
//                 </strong>{" "}
//                 <span className="text-gray-900 ml-2">
//                   {restaurantDetails.email}
//                 </span>
//               </p>
//               <p className="text-lg flex items-center">
//                 <FaClock className="text-orange-600 mr-3" />
//                 <strong className="font-semibold text-orange-700">
//                   Availability:
//                 </strong>{" "}
//                 <span
//                   className={`font-medium ml-2 ${
//                     restaurantDetails.availability
//                       ? "text-green-600"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {restaurantDetails.availability ? "Open" : "Closed"}
//                 </span>
//               </p>
//             </div>

//             {!editMode ? (
//               <>
//                 <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 shadow-sm">
//                   <p className="text-lg mb-3 flex items-center">
//                     <FaPhone className="text-orange-600 mr-3" />
//                     <strong className="font-semibold text-orange-700">
//                       Phone:
//                     </strong>{" "}
//                     {/* Always display with +91 prefix for consistency */}
//                     <span className="text-gray-900 ml-2">
//                       {restaurantDetails.restaurantContact.startsWith("+91")
//                         ? restaurantDetails.restaurantContact
//                         : `+91${restaurantDetails.restaurantContact}`}
//                     </span>
//                   </p>
//                   <p className="text-lg flex items-center">
//                     <FaMapMarkerAlt className="text-orange-600 mr-3" />
//                     <strong className="font-semibold text-orange-700">
//                       Address:
//                     </strong>{" "}
//                     <span className="text-gray-900 ml-2">
//                       {restaurantDetails.address}
//                     </span>
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setEditMode(true)}
//                   className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition duration-300 ease-in-out font-medium text-lg flex items-center justify-center"
//                 >
//                   <FaEdit className="mr-2" /> Edit Details
//                 </button>
//               </>
//             ) : (
//               <div className="space-y-5">
//                 <div>
//                   <label
//                     htmlFor="phone"
//                     className="block text-orange-700 text-lg font-medium mb-2"
//                   >
//                     Phone
//                   </label>
//                   <div className="flex items-center">
//                     <span className="px-4 py-3 bg-orange-200 border border-orange-300 rounded-l-lg text-orange-800 font-medium">
//                       +91
//                     </span>
//                     <input
//                       type="text"
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       maxLength="10" // Limit input to 10 digits
//                       className={`flex-grow px-5 py-3 border border-l-0 rounded-r-lg text-gray-800 placeholder-orange-400 focus:outline-none focus:ring-2 transition duration-200 ease-in-out ${
//                         errors.phone
//                           ? "border-red-500 focus:ring-red-500"
//                           : "border-orange-300 focus:border-orange-500 focus:ring-orange-500"
//                       }`}
//                       placeholder="XXXXXXXXXX (10 digits)"
//                     />
//                   </div>
//                   {errors.phone && (
//                     <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="address"
//                     className="block text-orange-700 text-lg font-medium mb-2"
//                   >
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     id="address"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     className={`w-full px-5 py-3 border rounded-lg text-gray-800 placeholder-orange-400 focus:outline-none focus:ring-2 transition duration-200 ease-in-out ${
//                       errors.address
//                         ? "border-red-500 focus:ring-red-500"
//                         : "border-orange-300 focus:border-orange-500 focus:ring-orange-500"
//                     }`}
//                     placeholder="Enter address"
//                   />
//                   {errors.address && (
//                     <p className="text-red-500 text-sm mt-2">
//                       {errors.address}
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex justify-end space-x-4 mt-6">
//                   <button
//                     onClick={handleUpdate}
//                     className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-8 rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out font-medium text-lg flex items-center"
//                   >
//                     <FaSave className="mr-2" /> Save
//                   </button>
//                   <button
//                     onClick={() => {
//                       setEditMode(false);
//                       setErrors({}); // Clear errors when canceling
//                       // Reset form data to current restaurant details (extracting just 10 digits)
//                       const extractedPhone =
//                         restaurantDetails.restaurantContact.startsWith("+91")
//                           ? restaurantDetails.restaurantContact.substring(3)
//                           : restaurantDetails.restaurantContact;
//                       setFormData({
//                         phone: extractedPhone,
//                         address: restaurantDetails.address,
//                       });
//                     }}
//                     className="bg-gradient-to-r from-red-500 to-rose-600 text-white py-3 px-8 rounded-lg hover:from-red-600 hover:to-rose-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 ease-in-out font-medium text-lg flex items-center"
//                   >
//                     <FaTimes className="mr-2" /> Cancel
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <p className="text-center text-gray-600 text-xl py-8">
//             Loading profile details...
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import {
  FaUtensils,
  FaEnvelope,
  FaClock,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
 
const Profile = () => {
  const { user, token } = useContext(StoreContext); // Access user and token from context
  const [restaurantDetails, setRestaurantDetails] = useState(null); // Store restaurant details
  const [editMode, setEditMode] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({ phone: "", address: "" }); // Form data for updates
  const [errors, setErrors] = useState({}); // Store validation errors
 
  // Fetch restaurant details on component mount
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      if (user?.email && user.role === "restaurant") {
        try {
          const response = await fetch(
            `https://localhost:7274/api/Restaurant/${user.email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
 
          if (response.ok) {
            const data = await response.json();
            setRestaurantDetails(data);
            const extractedPhone = data.restaurantContact.startsWith("+91")
              ? data.restaurantContact.substring(3)
              : data.restaurantContact;
            setFormData({ phone: extractedPhone, address: data.address });
          } else {
            toast.error("Failed to fetch restaurant details.");
          }
        } catch (error) {
          console.error("Error fetching restaurant details:", error);
          toast.error("An error occurred while fetching restaurant details.");
        }
      }
    };
 
    fetchRestaurantDetails();
  }, [user, token]);
 
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "").substring(0, 10);
      setFormData((prevData) => ({ ...prevData, [name]: digitsOnly }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
 
  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address cannot be empty.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  // Handle update submission
  const handleUpdate = async () => {
    if (!validateForm()) {
      return;
    }
    const fullPhoneNumber = `+91${formData.phone}`;
    try {
      const response = await fetch(
        `https://localhost:7274/api/Restaurant/${user.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json-patch+json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            phone: fullPhoneNumber,
            address: formData.address,
          }),
        }
      );
 
      if (response.ok) {
        toast.success("Details updated successfully!");
        setEditMode(false);
        setRestaurantDetails((prevDetails) => ({
          ...prevDetails,
          restaurantContact: fullPhoneNumber,
          address: formData.address,
        }));
      } else {
        toast.error("Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating details:", error);
      toast.error("An error occurred while updating details.");
    }
  };
 
  // Handle availability update
  const handleAvailabilityUpdate = async () => {
    try {
      const response = await fetch(
        `https://localhost:7274/api/Restaurant/${user.email}/availability`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json-patch+json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(!restaurantDetails.availability), // Toggle availability
        }
      );
 
      if (response.ok) {
        toast.success(
          `Availability updated to ${
            !restaurantDetails.availability ? "Open" : "Closed"
          }!`
        );
        setRestaurantDetails((prevDetails) => ({
          ...prevDetails,
          availability: !prevDetails.availability,
        }));
      } else {
        toast.error("Failed to update availability.");
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      toast.error("An error occurred while updating availability.");
    }
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 transform transition duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-orange-800 mb-8 text-center drop-shadow-md">
          Your Profile
        </h2>
 
        {restaurantDetails ? (
          <div className="space-y-6">
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 shadow-sm">
              <p className="text-lg mb-3 flex items-center">
                <FaUtensils className="text-orange-600 mr-3" />
                <strong className="font-semibold text-orange-700">
                  Restaurant Name:
                </strong>{" "}
                <span className="text-gray-900 ml-2">
                  {restaurantDetails.restaurantName}
                </span>
              </p>
              <p className="text-lg mb-3 flex items-center">
                <FaEnvelope className="text-orange-600 mr-3" />
                <strong className="font-semibold text-orange-700">
                  Email:
                </strong>{" "}
                <span className="text-gray-900 ml-2">
                  {restaurantDetails.email}
                </span>
              </p>
              <div className="flex items-center justify-between">
                <p className="text-lg flex items-center">
                  <FaClock className="text-orange-600 mr-3" />
                  <strong className="font-semibold text-orange-700">
                    Availability:
                  </strong>{" "}
                  <span
                    className={`font-medium ml-2 ${
                      restaurantDetails.availability
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {restaurantDetails.availability ? "Open" : "Closed"}
                  </span>
                </p>
                <button
                  onClick={handleAvailabilityUpdate}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition duration-300 ease-in-out font-medium text-sm flex items-center"
                >
                  Update Availability
                </button>
              </div>
            </div>
 
            {!editMode ? (
              <>
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 shadow-sm">
                  <p className="text-lg mb-3 flex items-center">
                    <FaPhone className="text-orange-600 mr-3" />
                    <strong className="font-semibold text-orange-700">
                      Phone:
                    </strong>{" "}
                    <span className="text-gray-900 ml-2">
                      {restaurantDetails.restaurantContact.startsWith("+91")
                        ? restaurantDetails.restaurantContact
                        : `+91${restaurantDetails.restaurantContact}`}
                    </span>
                  </p>
                  <p className="text-lg flex items-center">
                    <FaMapMarkerAlt className="text-orange-600 mr-3" />
                    <strong className="font-semibold text-orange-700">
                      Address:
                    </strong>{" "}
                    <span className="text-gray-900 ml-2">
                      {restaurantDetails.address}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => setEditMode(true)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition duration-300 ease-in-out font-medium text-lg flex items-center justify-center"
                >
                  <FaEdit className="mr-2" /> Edit Details
                </button>
              </>
            ) : (
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-orange-700 text-lg font-medium mb-2"
                  >
                    Phone
                  </label>
                  <div className="flex items-center">
                    <span className="px-4 py-3 bg-orange-200 border border-orange-300 rounded-l-lg text-orange-800 font-medium">
                      +91
                    </span>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      maxLength="10"
                      className={`flex-grow px-5 py-3 border border-l-0 rounded-r-lg text-gray-800 placeholder-orange-400 focus:outline-none focus:ring-2 transition duration-200 ease-in-out ${
                        errors.phone
                          ? "border-red-500 focus:ring-red-500"
                          : "border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                      }`}
                      placeholder="XXXXXXXXXX (10 digits)"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-orange-700 text-lg font-medium mb-2"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-3 border rounded-lg text-gray-800 placeholder-orange-400 focus:outline-none focus:ring-2 transition duration-200 ease-in-out ${
                      errors.address
                        ? "border-red-500 focus:ring-red-500"
                        : "border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                    }`}
                    placeholder="Enter address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={handleUpdate}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-8 rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out font-medium text-lg flex items-center"
                  >
                    <FaSave className="mr-2" /> Save
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setErrors({});
                      const extractedPhone =
                        restaurantDetails.restaurantContact.startsWith("+91")
                          ? restaurantDetails.restaurantContact.substring(3)
                          : restaurantDetails.restaurantContact;
                      setFormData({
                        phone: extractedPhone,
                        address: restaurantDetails.address,
                      });
                    }}
                    className="bg-gradient-to-r from-red-500 to-rose-600 text-white py-3 px-8 rounded-lg hover:from-red-600 hover:to-rose-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 ease-in-out font-medium text-lg flex items-center"
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl py-8">
            Loading profile details...
          </p>
        )}
      </div>
    </div>
  );
};
 
export default Profile;
 