import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../features/contact/contactsSlice';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

const AddContact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active'); // Default to 'active'
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; phone?: string } = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d+$/.test(phone)) newErrors.phone = 'Phone number should only contain digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newContact = { id: nanoid(), name, email, phone, status };
      dispatch(addContact(newContact));
      navigate('/');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 mt-12 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Contact</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-1 border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1 border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`mt-1 border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? 'border-red-500' : ''}`}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Status</label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="active"
                name="status"
                value="active"
                checked={status === 'active'}
                onChange={() => setStatus('active')}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="active" className="ml-2 block text-sm text-gray-700">Active</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="inactive"
                name="status"
                value="inactive"
                checked={status === 'inactive'}
                onChange={() => setStatus('inactive')}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="inactive" className="ml-2 block text-sm text-gray-700">Inactive</label>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-colors duration-300"
          >
            Save Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
