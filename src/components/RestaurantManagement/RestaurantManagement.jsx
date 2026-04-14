import React from "react";
import { Outlet } from "react-router-dom";
// import DashboardNav from "./Dashboard/DashboardNav";
// import Orders from "./Dashboard/ActiveOrders";
const RestaurantManagement = () => {
  return (
    <div>
      {/* <DashboardNav /> */}
      
      <div className="p-4">
       
        <Outlet /> {/* Render child routes here */}
      </div>
    </div>
  );
};

export default RestaurantManagement;