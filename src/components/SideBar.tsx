import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:flex flex-col min-h-screen bg-gray-800 text-white p-4 w-64">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `p-4 mb-4 text-lg font-semibold rounded-lg transition-colors duration-200 ${
            isActive ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
          }`
        }
      >
        Contact
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `p-4 text-lg font-semibold rounded-lg transition-colors duration-200 ${
            isActive ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
          }`
        }
      >
        Charts and Map
      </NavLink>
    </div>
  );
};

export default Sidebar;
