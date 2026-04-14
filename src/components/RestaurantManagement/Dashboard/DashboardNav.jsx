import React from "react";
import { NavLink } from "react-router-dom";

const DashboardNav = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive ? "underline text-orange-500" : "hover:underline"
            }
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="orders"
            className={({ isActive }) =>
              isActive ? "underline text-orange-500" : "hover:underline"
            }
          >
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="add-menu-item"
            className={({ isActive }) =>
              isActive ? "underline text-orange-500" : "hover:underline"
            }
          >
            Add Menu Item
          </NavLink>
        </li>
       
        <li>
          <NavLink
            to="menu-items"
            className={({ isActive }) =>
              isActive ? "underline text-orange-500" : "hover:underline"
            }
          >
            Menu Items
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardNav;