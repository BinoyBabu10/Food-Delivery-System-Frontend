import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { FaUserCircle, FaEnvelope, FaPhoneAlt, FaEdit, FaSave, FaTimesCircle } from "react-icons/fa"; // Added icons

const Profile = () => {
  const { user, token } = useContext(StoreContext);
  const [agentDetails, setAgentDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ phone: "" }); // Will store ONLY the 10 digits
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchAgentDetails = async () => {
    setLoading(true);
    if (!user?.email || user.role !== "agent") {
      toast.error("Unauthorized access. Only agents can view their profile.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://localhost:7274/api/Agent/${user.email}`,
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
        setAgentDetails(data);
        // Extract only 10 digits from agentContact if it exists and starts with '+91'
        if (data.agentContact && data.agentContact.startsWith('+91')) {
          setFormData({ phone: data.agentContact.substring(3) }); // Store only 'XXXXXXXXXX'
        } else {
          setFormData({ phone: data.agentContact || "" }); // Store as is or empty string
        }
      } else {
        const errorText = await response.text();
        console.error("Error fetching agent details:", errorText);
        toast.error("Failed to fetch agent details.");
      }
    } catch (error) {
      console.error("Error fetching agent details:", error);
      toast.error("An error occurred while fetching agent details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentDetails();
  }, [user, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Allow only digits for phone input
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, ''); // Remove non-digits
      setFormData((prevData) => ({ ...prevData, [name]: numericValue }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    // Validate for exactly 10 digits
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      // Construct the full phone number with +91 for sending to backend
      const fullPhoneNumber = "+91" + formData.phone;

      // *** CRITICAL CHANGE HERE ***
      // The error clearly states "The Phone field is required."
      // So, the key in the JSON object must be 'Phone' (capital 'P').
      const updatePayload = {
        Phone: fullPhoneNumber // Changed from 'agentContact' to 'Phone'
      };

      const response = await fetch(
        `https://localhost:7274/api/Agent/${user.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatePayload),
        }
      );

      if (response.ok) {
        toast.success("Details updated successfully!");
        setEditMode(false);
        // Update local state with the newly saved full phone number
        setAgentDetails((prevDetails) => ({
          ...prevDetails,
          agentContact: fullPhoneNumber, // Assuming 'agentContact' is still the property used for display
        }));
      } else {
        const errorText = await response.text();
        console.error("Error updating details:", errorText);
        try {
            const errorJson = JSON.parse(errorText);
            if (errorJson.errors) {
                // Display specific backend validation errors
                let errorMessage = "Validation Error: ";
                for (const key in errorJson.errors) {
                    if (errorJson.errors.hasOwnProperty(key)) {
                        errorMessage += `${key}: ${errorJson.errors[key].join(", ")} | `;
                    }
                }
                toast.error(errorMessage.slice(0, -3)); // Remove trailing " | "
            } else {
                toast.error(`Failed to update details: ${errorText || response.statusText}`);
            }
        } catch (parseError) {
            toast.error(`Failed to update details: ${errorText || response.statusText}`);
        }
      }
    } catch (error) {
      console.error("Error updating details:", error);
      toast.error("An error occurred while updating details.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-gray-100">
        <p className="text-xl">Loading profile details...</p>
      </div>
    );
  }

  if (!agentDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-gray-100">
        <p className="text-xl text-red-400">Profile data could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 text-gray-100 p-8 font-sans flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 w-full max-w-2xl transform transition-transform duration-300 hover:scale-[1.005]">
        <h2 className="text-4xl font-bold mb-8 text-center text-indigo-400 border-b pb-4 border-gray-700">
          <FaUserCircle className="inline-block mr-4 text-5xl" />
          Agent Profile
        </h2>

        <div className="space-y-6">
          <div className="flex items-center text-lg">
            <FaUserCircle className="text-gray-400 mr-4 text-2xl" />
            <span className="font-semibold text-gray-300 w-32">Name:</span>
            <span className="text-white flex-1">{agentDetails.name}</span>
          </div>

          <div className="flex items-center text-lg">
            <FaEnvelope className="text-gray-400 mr-4 text-2xl" />
            <span className="font-semibold text-gray-300 w-32">Email:</span>
            <span className="text-white flex-1">{agentDetails.email}</span>
          </div>

          {!editMode ? (
            <div className="flex items-center text-lg">
              <FaPhoneAlt className="text-gray-400 mr-4 text-2xl" />
              <span className="font-semibold text-gray-300 w-32">Phone:</span>
              <span className="text-white flex-1">{agentDetails.agentContact || "N/A"}</span>
              <button
                onClick={() => setEditMode(true)}
                className="bg-indigo-600 text-white py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center gap-2 ml-4"
              >
                <FaEdit /> Edit
              </button>
            </div>
          ) : (
            <div className="flex items-start text-lg flex-wrap">
              <FaPhoneAlt className="text-gray-400 mr-4 text-2xl mt-1" />
              <label className="font-semibold text-gray-300 w-32 pt-1">Phone:</label>
              <div className="flex-1 flex items-center bg-gray-700 rounded-lg border border-gray-600 focus-within:ring-2 focus-within:ring-orange-500 overflow-hidden">
                <span className="bg-gray-600 text-gray-300 py-2 px-3 border-r border-gray-500">+91</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength={10}
                  placeholder="Enter 10-digit number"
                  className={`flex-1 px-3 py-2 bg-transparent text-white focus:outline-none ${
                    errors.phone
                      ? "border-red-500 ring-red-500"
                      : ""
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-2 w-full pl-44">{errors.phone}</p>
              )}
              <div className="mt-6 w-full flex justify-end space-x-4">
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white py-2.5 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center gap-2"
                >
                  <FaSave /> Save
                </button>
                <button
                  onClick={() => {
                    setEditMode(false);
                    fetchAgentDetails(); // Revert changes by re-fetching
                  }}
                  className="bg-red-500 text-white py-2.5 px-6 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center gap-2"
                >
                  <FaTimesCircle /> Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;