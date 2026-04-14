import React, { useState, useEffect, useContext } from "react";
import { StoreContext, API } from "../../context/StoreContext";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSpinner,
  FaExclamationTriangle,
  FaSearch,
  FaTrashAlt,
  FaTimesCircle,
  FaCheckCircle, // Added for "Yes" button
} from "react-icons/fa";
import { toast } from "react-toastify";

const Customer = () => {
  const { token } = useContext(StoreContext);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  // New state to track which customer is awaiting confirmation
  const [confirmingId, setConfirmingId] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get("/Customer");
      setCustomers(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to fetch customer details. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCustomers();
    } else {
      setLoading(false);
      setError("Authentication token not found. Please log in.");
      
    }
  }, [token]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to initiate the inline confirmation
  const initiateDeleteConfirmation = (customerId) => {
    setConfirmingId(customerId);
  };

  // Function to cancel the inline confirmation
  const cancelDeleteConfirmation = () => {
    setConfirmingId(null);
  };

  // Function to perform the actual deletion
  const performDelete = async (customerId, customerName) => {
    setConfirmingId(null); // Hide confirmation buttons
    setDeletingId(customerId); // Show loading state on the button

    try {
      const response = await API.delete(`/Customer/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        setCustomers(customers.filter((customer) => customer.customerID !== customerId));
        toast.success(`Customer '${customerName}' deleted successfully!`);
      } else {
        const errorData = response.data || {};
        const errorMessage = errorData.message || "Failed to delete customer. Server reported an issue.";
        toast.error(errorMessage);
      }
    } catch (err) {
      const apiErrorMessage = err.response?.data?.message || "An unexpected error occurred during deletion.";
      toast.error(apiErrorMessage);
    } finally {
      setDeletingId(null); // Reset loading state
    }
  };

  // --- Conditional Rendering for Loading, Error, and No Data States ---
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <FaSpinner className="animate-spin text-blue-500 text-5xl" />
        <p className="ml-4 text-xl text-gray-700">Loading customer data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-6">
        <FaExclamationTriangle className="text-red-600 text-6xl mb-4" />
        <h2 className="text-3xl font-bold text-red-700 mb-2">Error!</h2>
        <p className="text-xl text-red-500 text-center">
          {error}
          <br />
          Please ensure the API is running and you are authenticated.
        </p>
        <button
          onClick={fetchCustomers}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen font-sans">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-wide">
        <FaUser className="inline-block mr-3 text-blue-600" />
        Our Valued Customers
      </h1>

      {/* --- Search Bar Section --- */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search customers by email..."
            className="w-full p-3 pl-10 rounded-full border-2 border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 transition-all duration-300 shadow-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              aria-label="Clear search"
            >
              <FaTimesCircle className="text-xl" />
            </button>
          )}
        </div>
      </div>
      {/* --- End Search Bar Section --- */}

      {/* Conditional rendering for search results or no records */}
      {filteredCustomers.length === 0 && customers.length > 0 ? (
        <div className="text-center text-gray-600 text-2xl mt-20">
          No customers found matching your search.
        </div>
      ) : filteredCustomers.length === 0 && customers.length === 0 ? (
        <div className="text-center text-gray-600 text-2xl mt-20">
          No customer records found.
        </div>
      ) : (
        // Grid to display customer cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.customerID}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-200 relative group"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white rounded-t-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <h3 className="text-xl font-bold flex items-center mb-1 relative z-10">
                  <FaUser className="mr-3 text-blue-200" />
                  {customer.name}
                </h3>
                <p className="text-sm opacity-90 relative z-10">Customer ID: {customer.customerID}</p>
              </div>

              {/* Card Body (Customer Details) */}
              <div className="p-6 space-y-3 text-gray-700">
                <p className="flex items-center text-base">
                  <FaEnvelope className="mr-3 text-blue-400" />
                  <span className="font-medium">Email:</span> {customer.email}
                </p>
                <p className="flex items-center text-base">
                  <FaPhone className="mr-3 text-green-500" />
                  <span className="font-medium">Phone:</span> {customer.phone}
                </p>
                <p className="flex items-center text-base">
                  <FaMapMarkerAlt className="mr-3 text-red-400" />
                  <span className="font-medium">Address:</span> {customer.address}
                </p>
              </div>

              {/* Card Footer with Delete Button / Inline Confirmation */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                {confirmingId === customer.customerID ? (
                  // Display confirmation buttons
                  <div className="flex items-center w-full justify-between">
                    <span className="text-red-600 font-semibold text-base mr-2">Are you sure?</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => performDelete(customer.customerID, customer.name)}
                        className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center text-sm"
                        aria-label={`Confirm delete ${customer.name}`}
                      >
                        <FaCheckCircle className="mr-1" /> Yes
                      </button>
                      <button
                        onClick={cancelDeleteConfirmation}
                        className="p-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors flex items-center text-sm"
                        aria-label="Cancel delete"
                      >
                        <FaTimesCircle className="mr-1" /> No
                      </button>
                    </div>
                  </div>
                ) : (
                  // Display standard delete button
                  <button
                    onClick={() => initiateDeleteConfirmation(customer.customerID)}
                    className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 flex items-center
                      ${deletingId === customer.customerID ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}
                    `}
                    disabled={deletingId === customer.customerID}
                    aria-label={`Delete ${customer.name}`}
                  >
                    {deletingId === customer.customerID ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" /> Deleting...
                      </>
                    ) : (
                      <>
                        <FaTrashAlt className="mr-2" /> Delete
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Customer;