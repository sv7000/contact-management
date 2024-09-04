import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

 
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Contact List';
      case '/dashboard':
        return 'Charts and Maps';
      default:
        return '';
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 text-white p-4 text-center">
    <h1 className="text-2xl font-bold">{getTitle()}</h1>
  </div>
  );
};

export default Navbar;
