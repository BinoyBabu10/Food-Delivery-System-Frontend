




// import React, { useState } from "react";
// import { FaUserPlus, FaEnvelope, FaLock, FaUserTag, FaUserAlt, FaArrowLeft } from "react-icons/fa"; // More specific icons
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "customer", // Default role
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false); // New state for loading indicator
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     validateField(name, value); // Validate immediately on change
//   };

//   const validateField = (name, value) => {
//     let error = "";
//     if (name === "username") {
//       const usernameRegex = /^[a-zA-Z0-9_.-]+$/; // Allow alphanumeric, underscore, dot, and hyphen
//       if (!value.trim()) {
//         error = "Username is required.";
//       } else if (!usernameRegex.test(value)) {
//         error = "Username can only contain letters, numbers, underscores, dots, or hyphens.";
//       } else if (value.length < 3) {
//         error = "Username must be at least 3 characters long.";
//       }
//     } else if (name === "email") {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in)$/;
//       if (!value.trim()) {
//         error = "Email is required.";
//       } else if (!emailRegex.test(value)) {
//         error = "Please enter a valid email address ending in .com or .in (e.g., user@example.com).";;
//       }
//     } else if (name === "password") {
//       if (!value.trim()) {
//         error = "Password is required.";
//       } else if (value.length < 8) {
//         error = "Password must be at least 8 characters long.";
//       }
//     }
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Re-validate all fields on submit to catch any missed errors from onBlur
//     validateField("username", formData.username);
//     validateField("email", formData.email);
//     validateField("password", formData.password);

//     // Check if there are any errors before submitting
//     const formHasErrors = Object.values(errors).some(error => error !== "");
//     if (formHasErrors || !formData.username || !formData.email || !formData.password) {
//         toast.error("Please correct the form errors before submitting.");
//         setIsSubmitting(false);
//         return;
//     }


//     try {
//       const response = await fetch("https://localhost:7274/api/User", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         toast.success("Registration successful! Redirecting to login...");
//         // Clear form after successful registration
//         setFormData({
//           username: "",
//           email: "",
//           password: "",
//           role: "customer",
//         });
//         // Redirect after a short delay to allow toast to be seen
//         setTimeout(() => {
//           navigate("/login");
//         }, 2000); // Redirect to login page
//       } else {
//         const errorData = await response.json();
//         const errorMessage = errorData.message || "Registration failed. Please try again.";
//         toast.error(errorMessage);
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred. Please try again later.");
//     } finally {
//       setIsSubmitting(false); // End loading
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-black font-sans relative overflow-hidden p-4">
//       <button
//         onClick={() => navigate('/')}
//         className="absolute top-8 left-8 text-white hover:text-purple-300 transition-colors duration-200 flex items-center text-lg z-20"
//         aria-label="Go back to home"
//       >
//         <FaArrowLeft className="text-2xl" />
//         <span className="ml-3 font-bold hidden sm:inline">Back to Home</span>
//       </button>

//       {/* Subtle background effects */}
//       <div className="absolute top-0 left-0 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-200 backdrop-filter backdrop-blur-lg bg-opacity-90 relative z-10">
//         <div className="flex justify-center mb-8">
//           <FaUserPlus className="text-7xl text-indigo-700" />
//         </div>
//         <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Create Your Account</h2>
//         <form onSubmit={handleSubmit} autoComplete="off"> {/* Added autoComplete="off" here */}
//           {/* Username Field */}
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
//               <FaUserAlt className="inline-block mr-2 text-indigo-500" /> Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               onBlur={(e) => validateField(e.target.name, e.target.value)}
//               placeholder="Choose a unique username"
//               className={`w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-gray-800 text-base shadow-sm
//                                ${errors.username ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-400"}`}
//               required
//               autoComplete="off" // Added autoComplete="off"
//             />
//             {errors.username && (
//               <p className="text-red-600 text-sm mt-2 flex items-center">
//                 <span className="mr-1">⚠️</span> {errors.username}
//               </p>
//             )}
//           </div>

//           {/* Email Field */}
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
//               <FaEnvelope className="inline-block mr-2 text-indigo-500" /> Email Address
//             </label>
//             <input
//               id="email"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               onBlur={(e) => validateField(e.target.name, e.target.value)}
//               placeholder="your@example.com"
//               className={`w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-gray-800 text-base shadow-sm
//                                ${errors.email ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-400"}`}
//               required
//               autoComplete="off" // Or "new-email" if you want to prompt for a new email save
//             />
//             {errors.email && (
//               <p className="text-red-600 text-sm mt-2 flex items-center">
//                 <span className="mr-1">⚠️</span> {errors.email}
//               </p>
//             )}
//           </div>

//           {/* Password Field */}
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
//               <FaLock className="inline-block mr-2 text-indigo-500" /> Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               onBlur={(e) => validateField(e.target.name, e.target.value)}
//               placeholder="••••••••"
//               className={`w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-gray-800 text-base shadow-sm
//                                ${errors.password ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-400"}`}
//               required
//               autoComplete="new-password" // Added autoComplete="new-password"
//             />
//             {errors.password && (
//               <p className="text-red-600 text-sm mt-2 flex items-center">
//                 <span className="mr-1">⚠️</span> {errors.password}
//               </p>
//             )}
//           </div>

//           {/* Role Select */}
//           <div className="mb-8">
//             <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="role">
//               <FaUserTag className="inline-block mr-2 text-indigo-500" /> Register as
//             </label>
//             <div className="relative">
//               <select
//                 id="role"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="block appearance-none w-full bg-white border border-gray-300 text-gray-800 py-3 px-5 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
//                 autoComplete="off" // Added autoComplete="off"
//               >
//                 <option value="customer">Customer</option>
//                 <option value="restaurant">Restaurant</option>
//                 <option value="agent">Agent</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full flex items-center justify-center bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-lg font-bold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <>
//                 <FaUserPlus className="animate-pulse mr-3" /> Registering...
//               </>
//             ) : (
//               <>
//                 <FaUserPlus className="mr-3" /> Register Account
//               </>
//             )}
//           </button>
//         </form>
//         {/* Optional: Link to Login Page */}
//         <p className="text-center text-gray-600 text-sm mt-6">
//           Already have an account?{" "}
//           <span
//             onClick={() => navigate("/login")}
//             className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer transition-colors duration-200"
//           >
//             Login here
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }









import React, { useState } from "react";
import { FaUserPlus, FaEnvelope, FaLock, FaUserTag, FaUserAlt, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer", // Default role
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "username") {
      // Username validation:
      // - ^[a-zA-Z]: Must start with a letter (upper or lower case)
      // - [a-zA-Z0-9_.-]*$: Followed by zero or more alphanumeric, underscore, dot, or hyphen characters
      const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_.-]*$/;

      if (!value.trim()) {
        error = "Username is required.";
      } else if (!usernameRegex.test(value)) {
        error = "Username must start with a letter and can only contain letters, numbers, underscores, dots, or hyphens.";
      } else if (value.length < 3) {
        error = "Username must be at least 3 characters long.";
      }
    } else if (name === "email") {
      // Email validation:
      // - ^(?![0-9]+@): Negative lookahead to ensure the part before @ does NOT consist only of numbers.
      // - [^\s@]+: Matches one or more characters that are not whitespace or '@' (username part)
      // - @: Matches the '@' symbol exactly once
      // - [a-zA-Z0-9-]+: Matches one or more alphanumeric characters or hyphens (the domain name before the TLD)
      // - \.(com|in)$: Matches a '.' followed by either "com" or "in" at the end of the string.
      //                This ensures only one dot after the '@' and it's for the TLD.
      const emailRegex = /^(?![0-9]+@)[^\s@]+@[a-zA-Z0-9-]+\.(COM|IN|com|in)$/;


      if (!value.trim()) {
        error = "Email is required.";
      } else if (!emailRegex.test(value)) {
        error = "Please enter a valid email address ending in .com or .in. The part before '@' cannot be only numbers, and only one dot is allowed after '@' for the domain (e.g., user@example.com).";
      }
    } else if (name === "password") {
      if (!value.trim()) {
        error = "Password is required.";
      } else if (value.length < 8) {
        error = "Password must be at least 8 characters long.";
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Manually run validation for all fields to ensure errors are caught before submission
    const currentErrors = { ...errors }; // Capture current errors for submission check

    // Re-run validation logic here to ensure `currentErrors` is accurate for submission.
    // This is important because `setErrors` is async and `errors` state might not
    // be updated immediately for the current `handleSubmit` execution.
    let formIsValid = true;

    // Validate username
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_.-]*$/;
    if (!formData.username.trim()) {
        formIsValid = false;
        currentErrors.username = "Username is required.";
    } else if (!usernameRegex.test(formData.username)) {
        formIsValid = false;
        currentErrors.username = "Username must start with a letter and can only contain letters, numbers, underscores, dots, or hyphens.";
    } else if (formData.username.length < 3) {
        formIsValid = false;
        currentErrors.username = "Username must be at least 3 characters long.";
    } else {
        currentErrors.username = ""; // Clear error if valid
    }

    // Validate email
    const emailRegex = /^(?![0-9]+@)[^\s@]+@[a-zA-Z0-9-]+\.(com|in|COM|IN)$/;
    if (!formData.email.trim()) {
        formIsValid = false;
        currentErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
        formIsValid = false;
        currentErrors.email = "Please enter a valid email address ending in .com or .in. The part before '@' cannot be only numbers, and only one dot is allowed after '@' for the domain (e.g., user@example.com).";
    } else {
        currentErrors.email = ""; // Clear error if valid
    }

    // Validate password
    if (!formData.password.trim()) {
        formIsValid = false;
        currentErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
        formIsValid = false;
        currentErrors.password = "Password must be at least 8 characters long.";
    } else {
        currentErrors.password = ""; // Clear error if valid
    }

    // Update the state with these immediate errors for display if any
    setErrors(currentErrors);


    // Check if there are any errors in the `currentErrors` object
    if (!formIsValid || Object.values(currentErrors).some(error => error !== "")) {
        toast.error("Please correct the form errors before submitting.");
        setIsSubmitting(false);
        return;
    }


    try {
      const response = await fetch("https://localhost:7274/api/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Registration successful! Redirecting to login...");
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "customer",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Registration failed. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-black font-sans relative overflow-hidden p-4">
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-white hover:text-purple-300 transition-colors duration-200 flex items-center text-lg z-20"
        aria-label="Go back to home"
      >
        <FaArrowLeft className="text-2xl" />
        <span className="ml-3 font-bold hidden sm:inline">Back to Home</span>
      </button>

      {/* Subtle background effects */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-200 backdrop-filter backdrop-blur-lg bg-opacity-90 relative z-10">
        <div className="flex justify-center mb-8">
          <FaUserPlus className="text-7xl text-indigo-700" />
        </div>
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Create Your Account</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Username Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
              <FaUserAlt className="inline-block mr-2 text-indigo-500" /> Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              placeholder="Choose a unique username"
              className={`w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-gray-800 text-base shadow-sm
                                ${errors.username ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-400"}`}
              required
              autoComplete="off"
            />
            {errors.username && (
              <p className="text-red-600 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span> {errors.username}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              <FaEnvelope className="inline-block mr-2 text-indigo-500" /> Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              placeholder="your@example.com"
              className={`w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-gray-800 text-base shadow-sm
                                ${errors.email ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-400"}`}
              required
              autoComplete="off"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span> {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              <FaLock className="inline-block mr-2 text-indigo-500" /> Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              placeholder="••••••••"
              className={`w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-gray-800 text-base shadow-sm
                                ${errors.password ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-400"}`}
              required
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span> {errors.password}
              </p>
            )}
          </div>

          {/* Role Select */}
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="role">
              <FaUserTag className="inline-block mr-2 text-indigo-500" /> Register as
            </label>
            <div className="relative">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-800 py-3 px-5 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                autoComplete="off"
              >
                <option value="customer">Customer</option>
                <option value="restaurant">Restaurant</option>
                <option value="agent">Agent</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-lg font-bold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FaUserPlus className="animate-pulse mr-3" /> Registering...
              </>
            ) : (
              <>
                <FaUserPlus className="mr-3" /> Register Account
              </>
            )}
          </button>
        </form>
        {/* Optional: Link to Login Page */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer transition-colors duration-200"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}