import React, { useState, useEffect, useContext } from "react";
import { StoreContext, API } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import {
  FaUserTie,
  FaEnvelope,
  FaPhoneAlt,
  FaGlobeAmericas,
  FaSpinner,
  FaExclamationTriangle,
  FaSearch,
  FaTrashAlt,
  FaCheckCircle, // Added for "Yes" button
  FaTimesCircle, // Added for "No" button
} from "react-icons/fa";
import { toast } from "react-toastify";

const AgentDash = () => {
  const { token } = useContext(StoreContext);
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  // New state to track which agent is awaiting confirmation
  const [confirmingId, setConfirmingId] = useState(null);
  // State to show loading spinner specifically on the deleting agent's button
  const [deletingAgentId, setDeletingAgentId] = useState(null);

  const fetchAgents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get("/Agent", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgents(response.data);
      setFilteredAgents(response.data);
      setLoading(false);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to fetch agent details. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAgents();
    } else {
      setLoading(false);
      setError("Authentication token not found. Please log in.");
    }
  }, [token]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === "") {
      setFilteredAgents(agents);
    } else {
      setFilteredAgents(
        agents.filter((agent) =>
          agent.email.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  const handleAgentHistoryClick = (email) => {
    navigate(`/admin-dashboard/agent-history?email=${email}`);
  };

  // --- NEW: Initiate inline confirmation ---
  const initiateDeleteConfirmation = (agentID) => {
    setConfirmingId(agentID);
  };

  // --- NEW: Cancel inline confirmation ---
  const cancelDeleteConfirmation = () => {
    setConfirmingId(null);
  };

  // --- NEW: Perform actual deletion after confirmation ---
  const performDeleteAgent = async (agentID, agentName) => {
    setConfirmingId(null); // Hide confirmation buttons
    setDeletingAgentId(agentID); // Show loading spinner on the button

    try {
      await API.delete(`/Agent/${agentID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Agent '${agentName}' deleted successfully!`);
      // Update the list by removing the deleted agent
      setAgents((prevAgents) => prevAgents.filter((agent) => agent.agentID !== agentID));
      setFilteredAgents((prevFiltered) => prevFiltered.filter((agent) => agent.agentID !== agentID));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete agent.");
    } finally {
      setDeletingAgentId(null); 
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
        <FaSpinner className="animate-spin text-teal-600 text-5xl" />
        <p className="ml-4 text-xl text-gray-700">Loading agent data...</p>
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
          onClick={fetchAgents}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-teal-100 min-h-screen font-sans">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-wide">
        <FaUserTie className="inline-block mr-3 text-teal-700" />
        Our Dedicated Agents
      </h1>

      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search agents by email..."
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

      {filteredAgents.length === 0 && searchTerm !== "" ? (
        <div className="text-center text-gray-600 text-2xl mt-20">
          No agents found matching your search.
        </div>
      ) : filteredAgents.length === 0 ? (
        <div className="text-center text-gray-600 text-2xl mt-20">
          No agent records found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden
                               border border-gray-200
                               relative group"
            >
              <div className="bg-gradient-to-r from-teal-500 to-green-600 p-4 text-white rounded-t-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <h3 className="text-xl font-bold flex items-center mb-1 relative z-10">
                  <FaUserTie className="mr-3 text-teal-200" />
                  {agent.name}
                </h3>
                <p className="text-sm opacity-90 relative z-10">
                  Agent ID: {agent.agentID}
                </p>
              </div>

              <div className="p-6 space-y-3 text-gray-700">
                <p className="flex items-center text-base">
                  <FaEnvelope className="mr-3 text-blue-400" />
                  <span className="font-medium">Email:</span> {agent.email}
                </p>
                <p className="flex items-center text-base">
                  <FaPhoneAlt className="mr-3 text-green-500" />
                  <span className="font-medium">Phone:</span>{" "}
                  {agent.agentContact}
                </p>
                <p className="flex items-center text-base">
                  <FaGlobeAmericas className="mr-3 text-purple-400" />
                  <span className="font-medium">Region:</span> {agent.region}
                </p>
              </div>

              {/* --- Card Footer with Inline Confirmation Logic --- */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 text-sm text-gray-500 flex justify-between items-center">
                {confirmingId === agent.agentID ? (
                  // Display confirmation buttons if this agent's ID matches confirmingId
                  <div className="flex items-center w-full justify-between">
                    <span className="text-red-600 font-semibold text-base mr-2">Are you sure?</span>
                    <div className="flex gap-2"> {/* Changed from 'gap-2' to 'gap-2' and removed 'mr-2' from 'No' button */}
                      <button
                        onClick={() => performDeleteAgent(agent.agentID, agent.name)}
                        className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center text-sm"
                        aria-label={`Confirm delete ${agent.name}`}
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
                    onClick={() => initiateDeleteConfirmation(agent.agentID)}
                    className={`flex items-center px-4 py-2 text-white rounded-md transition-colors duration-300 text-base
                      ${deletingAgentId === agent.agentID ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}
                    `}
                    disabled={deletingAgentId === agent.agentID}
                    aria-label={`Delete ${agent.name}`}
                  >
                    {deletingAgentId === agent.agentID ? (
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
                {/* --- End Inline Confirmation Logic --- */}

                <span
                  className="font-semibold text-orange-600 cursor-pointer hover:underline"
                  onClick={() => handleAgentHistoryClick(agent.email)}
                >
                  Order History &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentDash;