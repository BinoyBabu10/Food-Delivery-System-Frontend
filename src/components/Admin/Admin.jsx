// Admin.js
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminDashboardNav from "./Dashboard/All_Sections";

const Admin = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/admin-dashboard";

  return (
    <div>
      {isDashboard && <AdminDashboardNav />}
      <div className="p-4">
        <Outlet /> {/* Render child routes here */}
      </div>
    </div>
  );
};

export default Admin;
