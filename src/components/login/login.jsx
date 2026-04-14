
// // src/components/login/login.jsx
// import React, { useContext, useState } from "react";
// import { StoreContext } from "../context/StoreContext";
// import { toast } from "react-toastify";
// import { useNavigate, Link } from "react-router-dom";
// import { FaUserCircle, FaLock, FaSignInAlt, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const { login, logout, user } = useContext(StoreContext);
//   const [data, setData] = useState({ email: "", password: "" });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const onLogin = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const role = await login(data.email, data.password);
//       if (role) {
//         toast.success(`Welcome ${data.email.split("@")[0]}!`, {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "colored",
//         });

//         switch (role) {
//           case "admin":
//             navigate("/admin-dashboard");
//             break;
//           case "restaurant":
//             navigate("/restaurant-management");
//             break;
//           case "customer":
//             navigate("/customer-management");
//             break;
//           case "agent":
//             navigate("/agent-dashboard");
//             break;
//           default:
//             toast.error("Access restricted. Invalid role.");
//         }
//       } else {
//         toast.error("Invalid email or password. Please check your credentials.", {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "colored",
//         });
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         "An unexpected error occurred during login. Please try again later.";
//       toast.error(errorMessage, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const onLogout = () => {
//     logout();
//     toast.info("You have been logged out.", {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: true,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       theme: "colored",
//     });
//     navigate("/login");
//   };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-800 via-purple-900 to-gray-900 font-sans">
//       {/* Back Button - Positioned in the overall background container */}
//       <button
//         onClick={() => navigate('/')} // Functionality remains the same
//         className="absolute top-8 left-8 text-white hover:text-purple-300 transition-colors duration-200 flex items-center text-lg z-20" // Increased size and changed color for background
//         aria-label="Go back to home"
//       >
//         <FaArrowLeft className="text-2xl" /> {/* Larger icon */}
//         <span className="ml-3 font-bold hidden sm:inline">Back to Home</span> {/* Bold text */}
//       </button>

//       {/* Login Card Container */}
//       <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 backdrop-filter backdrop-blur-sm bg-opacity-90 relative overflow-hidden z-10"> {/* z-10 to ensure it's above background elements but below the back button */}
//         {/* Decorative Circles/Blobs */}
//         <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
//         <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-300 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>

//         {user ? (
//           <div className="text-center py-6 relative z-10">
//             <FaUserCircle className="text-5xl text-purple-600 mx-auto mb-4" />
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
//             <p className="text-lg text-gray-600 mb-6">You are logged in as {user.email}</p>
//             <button
//               onClick={onLogout}
//               className="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 text-lg font-semibold shadow-md hover:shadow-lg"
//             >
//               <FaSignOutAlt className="mr-3" /> Logout
//             </button>
//           </div>
//         ) : (
//           <form onSubmit={onLogin} className="relative z-10">
//             <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
//               Sign In
//             </h2>
//             <div className="mb-5">
//               <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
//                 <FaUserCircle className="inline-block mr-2 text-indigo-500" /> Email Address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 onChange={onChangeHandler}
//                 value={data.email}
//                 type="email"
//                 placeholder="you@example.com"
//                 className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-gray-800 text-base shadow-sm"
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
//                 <FaLock className="inline-block mr-2 text-indigo-500" /> Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 onChange={onChangeHandler}
//                 value={data.password}
//                 type="password"
//                 placeholder="••••••••"
//                 className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-gray-800 text-base shadow-sm"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full flex items-center justify-center bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <FaSignInAlt className="animate-pulse mr-3" /> Logging in...
//                 </>
//               ) : (
//                 <>
//                   <FaSignInAlt className="mr-3" /> Login
//                 </>
//               )}
//             </button>
//             <p className="mt-6 text-center text-gray-700 text-sm">
//               Not registered?{" "}
//               <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-200">
//                 Create an account
//               </Link>
//             </p>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;






// src/components/login/login.jsx
import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle, FaLock, FaSignInAlt, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

// Define the custom toast component
const LoginSuccessToast = ({ userName, role }) => (
  <div>
    Welcome **{userName}**! You are logged in as **{role}**.
  </div>
);

const Login = () => {
  const { login, logout, user } = useContext(StoreContext);
  const [data, setData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const role = await login(data.email, data.password);
      if (role) {
        // --- MODIFICATION STARTS HERE ---
        toast.success(
          <LoginSuccessToast userName={data.email.split("@")[0]} role={role} />,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          }
        );
        // --- MODIFICATION ENDS HERE ---

        switch (role) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "restaurant":
            navigate("/restaurant-management");
            break;
          case "customer":
            navigate("/customer-management/profile");
            break;
          case "agent":
            navigate("/agent-dashboard/profile");
            break;
          default:
            toast.error("Access restricted. Invalid role.");
        }
      } else {
        toast.error("Invalid email or password. Please check your credentials.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred during login. Please try again later.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onLogout = () => {
    logout();
    toast.info("You have been logged out.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    navigate("/login");
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-800 via-purple-900 to-gray-900 font-sans">
      {/* Back Button - Positioned in the overall background container */}
      <button
        onClick={() => navigate('/')} // Functionality remains the same
        className="absolute top-8 left-8 text-white hover:text-purple-300 transition-colors duration-200 flex items-center text-lg z-20" // Increased size and changed color for background
        aria-label="Go back to home"
      >
        <FaArrowLeft className="text-2xl" /> {/* Larger icon */}
        <span className="ml-3 font-bold hidden sm:inline">Back to Home</span> {/* Bold text */}
      </button>

      {/* Login Card Container */}
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 backdrop-filter backdrop-blur-sm bg-opacity-90 relative overflow-hidden z-10"> {/* z-10 to ensure it's above background elements but below the back button */}
        {/* Decorative Circles/Blobs */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-300 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>

        {user ? (
          <div className="text-center py-6 relative z-10">
            <FaUserCircle className="text-5xl text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
            <p className="text-lg text-gray-600 mb-6">You are logged in as {user.email}</p>
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 text-lg font-semibold shadow-md hover:shadow-lg"
            >
              <FaSignOutAlt className="mr-3" /> Logout
            </button>
          </div>
        ) : (
          <form onSubmit={onLogin} className="relative z-10">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
              Sign In
            </h2>
            <div className="mb-5">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                <FaUserCircle className="inline-block mr-2 text-indigo-500" /> Email Address
              </label>
              <input
                id="email"
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="you@example.com"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-gray-800 text-base shadow-sm"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                <FaLock className="inline-block mr-2 text-indigo-500" /> Password
              </label>
              <input
                id="password"
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-gray-800 text-base shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaSignInAlt className="animate-pulse mr-3" /> Logging in...
                </>
              ) : (
                <>
                  <FaSignInAlt className="mr-3" /> Login
                </>
              )}
            </button>
            <p className="mt-6 text-center text-gray-700 text-sm">
              Not registered?{" "}
              <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-200">
                Create an account
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;