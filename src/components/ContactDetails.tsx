import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ContactDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const contact = contacts.find(contact => contact.id === id);
  const navigate = useNavigate();

  if (!contact) {
    return (
      <div className="container mx-auto p-4 ">
        <h1 className="text-2xl font-bold">Contact Not Found</h1>
        <button onClick={() => navigate(-1)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Details</h1>
      <div className="border p-4 rounded">
        <h2 className="text-xl">{contact.name}</h2>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Phone:</strong> {contact.phone}</p>
        <div className="mt-4">
          <Link to={`/edit/${contact.id}`} className="bg-yellow-500 text-white px-4 py-2 rounded">
            Edit Contact
          </Link>
          <button onClick={() => navigate(-1)} className="bg-gray-500 text-white px-4 py-2 rounded ml-4">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
