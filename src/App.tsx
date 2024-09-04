import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import Dashboard from './components/Dashboard';
import EditContact from './components/EditContact';
import ContactDetails from './components/ContactDetails';
import Sidebar from './components/SideBar';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <div className='flex flex-grow'>
          <Sidebar />
          <div className='flex-grow p-6 overflow-auto'>
            <Routes>
              <Route path="/" element={<ContactList />} />
              <Route path="/add" element={<AddContact />} />
              <Route path="/edit/:id" element={<EditContact />} />
              <Route path="/details/:id" element={<ContactDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <div className="md:hidden mt-4 flex justify-center space-x-4">
              <NavLink
                to="/dashboard"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Dashboard
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
