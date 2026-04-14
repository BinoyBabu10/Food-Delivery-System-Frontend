import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import {
  FaUser, // Icon for customer name
  FaEnvelope, // Icon for email
  FaPhone, // Icon for phone
  FaMapMarkerAlt, // Icon for address
  FaEdit, // Icon for edit button
  FaSave, // Icon for save button
  FaTimes, // Icon for cancel button
} from "react-icons/fa"; // Importing icons

const CustomerProfile = () => {
  const { user, token } = useContext(StoreContext); // Access user and token from context
  const [customerDetails, setCustomerDetails] = useState(null); // Store customer details
  const [editMode, setEditMode] = useState(false); // Toggle edit mode
  // Initialize formData.phone to store only the 10 digits
  const [formData, setFormData] = useState({ phone: "", address: "" }); // Form data for updates
  const [errors, setErrors] = useState({}); // Store validation errors

  // Function to extract just the 10 digits from a phone number string
  const extractTenDigits = (phoneNumberString) => {
    if (!phoneNumberString) return " ";
    // Remove all non-digit characters and take the last 10 digits
    const digitsOnly = phoneNumberString.replace(/\D/g, '');
    return digitsOnly.slice(-10);
  };

  // Fetch customer details on component mount
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (user?.email && user.role === "customer") {
        try {
          const response = await fetch(
            `https://localhost:7274/api/Customer/${user.email}`,
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
            console.log("Fetched Customer Details:", data); // Debugging
            setCustomerDetails(data);
            // Set formData.phone with only the 10 digits
            setFormData({
              phone: extractTenDigits(data.phone),
              address: data.address || "",
            }); // Pre-fill form data
          } else {
            toast.error("Failed to fetch customer details.");
          }
        } catch (error) {
          console.error("Error fetching customer details:", error);
          toast.error("An error occurred while fetching customer details.");
        }
      }
    };

    fetchCustomerDetails();
  }, [user, token]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Allow only digits and limit to 10 characters for the phone input
      const digitsOnly = value.replace(/\D/g, '').substring(0, 10);
      setFormData((prevData) => ({ ...prevData, [name]: digitsOnly }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    // Clear errors when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    // Validate phone number: ensure it's exactly 10 digits
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits and consist only of numbers.";
    } else if (/(\d)\1{5}/.test(formData.phone)) {
      newErrors.phone = "Phone number cannot have a digit repeated more than 5 times consecutively.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle update submission
  const handleUpdate = async () => {
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    // When sending to API, combine '+91' with the 10 digits from formData
    const fullPhoneNumber = `+91${formData.phone}`;

    try {
      const response = await fetch(
        `https://localhost:7274/api/Customer/${user.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json-patch+json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            phone: fullPhoneNumber, // Send the full phone number
            address: formData.address,
          }),
        }
      );

      if (response.ok) {
        toast.success("Details updated successfully!");
        setEditMode(false); // Exit edit mode
        setCustomerDetails((prevDetails) => ({
          ...prevDetails,
          phone: fullPhoneNumber, // Update with the full number for display
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 transform transition duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center drop-shadow-md">
          Your Profile
        </h2>

        {customerDetails ? (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-sm">
              <p className="text-lg mb-3 flex items-center">
                <FaUser className="text-blue-600 mr-3" />
                <strong className="font-semibold text-blue-700">Name:</strong>{" "}
                <span className="text-gray-900 ml-2">
                  {customerDetails.name || "Not provided"}
                </span>
              </p>
              <p className="text-lg mb-3 flex items-center">
                <FaEnvelope className="text-blue-600 mr-3" />
                <strong className="font-semibold text-blue-700">Email:</strong>{" "}
                <span className="text-gray-900 ml-2">
                  {customerDetails.email}
                </span>
              </p>
            </div>

            {!editMode ? (
              <>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-sm">
                  <p className="text-lg mb-3 flex items-center">
                    <FaPhone className="text-blue-600 mr-3" />
                    <strong className="font-semibold text-blue-700">Phone:</strong>{" "}
                    <span className="text-gray-900 ml-2">
                      {/* Ensure it's always displayed with +91 */}
                      {customerDetails.phone || "Not provided"}
                    </span>
                  </p>
                  <p className="text-lg flex items-center">
                    <FaMapMarkerAlt className="text-blue-600 mr-3" />
                    <strong className="font-semibold text-blue-700">Address:</strong>{" "}
                    <span className="text-gray-900 ml-2">
                      {customerDetails.address || "Not provided"}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => setEditMode(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out font-medium text-lg flex items-center justify-center"
                >
                  <FaEdit className="mr-2" /> Edit Details
                </button>
              </>
            ) : (
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-blue-700 text-lg font-medium mb-2"
                  >
                    Phone
                  </label>
                  <div className="flex items-center">
                    {/* Fixed +91 prefix */}
                    <span className="px-4 py-3 bg-blue-200 border border-blue-300 rounded-l-lg text-blue-800 font-medium">
                      +91
                    </span>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      maxLength="10" // Limit input to 10 digits
                      className={`flex-grow px-5 py-3 border border-l-0 rounded-r-lg text-gray-800 placeholder-blue-400 focus:outline-none focus:ring-2 transition duration-200 ease-in-out ${
                        errors.phone
                          ? "border-red-500 focus:ring-red-500"
                          : "border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                      placeholder="e.g., 9876543210 (10 digits)"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-blue-700 text-lg font-medium mb-2"
                  >
                      Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-3 border rounded-lg text-gray-800 placeholder-blue-400 focus:outline-none focus:ring-2 transition duration-200 ease-in-out ${
                      errors.address
                        ? "border-red-500 focus:ring-red-500"
                        : "border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                    placeholder="Enter your address"
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
                      setErrors({}); // Clear errors when canceling
                      // Reset form data to current customer details (extracting just 10 digits)
                      setFormData({
                        phone: extractTenDigits(customerDetails.phone),
                        address: customerDetails.address || "",
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

export default CustomerProfile;



