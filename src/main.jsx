import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contact/Contact.jsx";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register/Register.jsx";
import Login from "./components/login/login.jsx";
import RestaurantManagement from "./components/RestaurantManagement/RestaurantManagement.jsx";
import Profile from "./components/RestaurantManagement/Dashboard/Profile.jsx";
import ActiveOrders from "./components/RestaurantManagement/Dashboard/ActiveOrders.jsx";
import AddMenuItem from "./components/RestaurantManagement/Dashboard/AddMenuItem.jsx";
import MenuItems from "./components/RestaurantManagement/Dashboard/MenuItems.jsx";
import ProtectedRoute from "./components/Shared/ProtectedRoute.jsx";
import OrdersHistory from "./components/RestaurantManagement/Dashboard/OrdersHistory.jsx";
import RestaurantDashboard from "./components/RestaurantManagement/Dashboard/RestaurantDashboard.jsx"; // Import RestaurantDashboard component
import { StoreContext, StoreContextProvider } from "./components/context/StoreContext.jsx"; // Import StoreContextProvider



import Admin from "./components/Admin/Admin.jsx";
import Customer_D from "./components/Admin/Dashboard/Customer_D.jsx";
import Restaurant_D from "./components/Admin/Dashboard/Restaurant_D.jsx";
import Agent_D from "./components/Admin/Dashboard/Agent_D.jsx";
import MenuItems_D from "./components/Admin/Dashboard/Menuitem_D.jsx";
import AgentHistory from "./components/Admin/Dashboard/AgentHistory.jsx"; // Import AgentHistory component
// import Agent from "./components/Agent/Agent.jsx"; // Import Agent component

import CustomerManagement from './components/Customer/CustomerManagement.jsx';
import SearchItem from './components/Customer/Dashboard/SearchItem.jsx';
import Cart from './components/Customer/Dashboard/Cart.jsx';
import MenuDisplay from './components/Customer/Dashboard/MenuDisplay.jsx';
import RestaurantMenu from './components/Customer/Dashboard/RestaurantMenu.jsx';
import OrderHistory from './components/Customer/Dashboard/OrderHistory.jsx';
import SelectLocation from './components/Customer/Dashboard/SelectLocation.jsx';
import OrderSummary from './components/Customer/Dashboard/OrderSummary.jsx';
import CustomerProfile from './components/Customer/Dashboard/CustomerProfile.jsx';
import Payment from "./components/Customer/Dashboard/Payment.jsx";

// agent
// import ProfileLayout from "./components/Agent/Dashboard/";
import OrderDetails from "./components/Agent/Dashboard/OrderDetails.jsx"; // Import OrderDetails component
// import profile from "./components/Agent/Dashboard/Profile.jsx"; // Import Profile component
// import AgentDash from "./components/Admin/Dashboard/Agent_D.jsx";
import AgentDashboard from "./components/Agent/AgentDashboard.jsx"; // Import AgentDashboard component
// import Profile from "./components/Agent/Dashboard/Profile.jsx"; // Import Profile component

import ProfileLayout from "./components/Agent/Dashboard/ProfileLayout.jsx"; // Import ProfileLayout compone



const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="About" element={<About />} />
      <Route path="contact" element={<Contact />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/restaurant-management"
        element={
          <ProtectedRoute>
            <RestaurantManagement />
          </ProtectedRoute>
        }
      >
        {/* Child routes for Restaurant Management */}
        <Route index element={<Profile />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<ActiveOrders />} />
        <Route path="order-history" element={<OrdersHistory/>}/>
        <Route path="RestaurantDashboard" element={<RestaurantDashboard/>}/>
        <Route path="add-menu-item" element={<AddMenuItem />} />
        <Route path="menu-items" element={<MenuItems />} />
      </Route>

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      >
        {/* Child routes for Admin Dashboard */}
        <Route path="c-dash" element={<Customer_D />} />
        <Route path="r-dash" element={<Restaurant_D />} />
        <Route path="a-dash" element={<Agent_D />} />
        <Route path="menu-items" element={<MenuItems_D />} />
        <Route path="agent-history" element={<AgentHistory />} />
        

      </Route>




{/* AARCHI */}
<Route
        path='/customer-management'
        element={
          <ProtectedRoute>
            <CustomerManagement />
          </ProtectedRoute>
        }
      >
        <Route path="profile" element={<CustomerProfile/>} />
        <Route path="search-results" element={<SearchItem />} />
        <Route path="menu" element={<MenuDisplay />} />
        <Route path="order-history" element={<OrderHistory/>} />
        <Route path="cart" element={<Cart/>}/>
        <Route path="restaurant-menu/:restaurantID" element={<RestaurantMenu />} />
        <Route path="select-location" element={<SelectLocation/>} />
        <Route path="order-summary" element={<OrderSummary/>} />
        <Route path="/customer-management/payment/:paymentID" element={<Payment />} />
      </Route>

{/* AARCHI */}


<Route
        path="/agent-dashboard"
        element={
          <ProtectedRoute>
            <AgentDashboard />
          </ProtectedRoute>
        }
      /> 

  <Route
        path="/agent-dashboard/profile"
        element={
          <ProtectedRoute>
            <ProfileLayout/>
          </ProtectedRoute>
        }
      />
      {/* Wrap all sibling routes in a React.Fragment */}
      <>
        <Route
          path="/agent-dashboard/orders"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
          />
          </>

        

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreContextProvider> {/* Wrap the RouterProvider with StoreContextProvider */}
      <RouterProvider router={router} />
      <ToastContainer />
    </StoreContextProvider>
  </React.StrictMode>
);














