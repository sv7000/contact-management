import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { editContact } from '../features/contact/contactsSlice';

const EditContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const contact = contacts.find(contact => contact.id === id);

  const [name, setName] = useState(contact?.name || '');
  const [email, setEmail] = useState(contact?.email || '');
  const [phone, setPhone] = useState(contact?.phone || '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!contact) {
      navigate('/');
    }
  }, [contact, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact) {
      const updatedContact = { id: contact.id, name, email, phone };
      dispatch(editContact(updatedContact));
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Edit Contact</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your phone number"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Edited Contact
        </button>
      </form>
    </div>
  );
};

export default EditContact;
