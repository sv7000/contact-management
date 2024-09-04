import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { deleteContact } from "../features/contact/contactsSlice";
import { Link } from "react-router-dom";

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="container mx-auto p-6">
      {contacts.length === 0 ? (
        <div className="text-center">
          <Link
            to="/add"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-400 transition-colors"
          >
            Create Contact
          </Link>
          <div className="bg-slate-200 h-40 w-full max-w-md mx-auto flex justify-center items-center mt-12 shadow-lg rounded-lg">
            <p className="text-center text-red-600 font-semibold">
              No contacts found. Please add a contact using the create contact button above.
            </p>
          </div>
        </div>
      ) : (
        <>
          <Link
            to="/add"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md mb-6 block mx-auto max-w-40 hover:bg-blue-400 transition-colors"
          >
            Create Contact
          </Link>
          <ul className="space-y-4">
            {contacts.map((contact) => {
              const status = contact.status || 'inactive'; 

              return (
                <li
                  key={contact.id}
                  className="flex items-center p-4 bg-white rounded-lg shadow-md border border-gray-200 relative"
                >
                  <span
                    className={`absolute top-2 left-2 h-4 w-4 rounded-full border-2 border-black ${
                      status === 'active' ? 'bg-green-500' : 'bg-red-500'
                    } shadow-md backdrop-blur-sm`}
                    title={status.charAt(0).toUpperCase() + status.slice(1)}
                  />
                  <div className="ml-12 flex-1">
                    <h2 className="text-xl font-semibold">{contact.name}</h2>
                    <p className="text-gray-600">{contact.email}</p>
                    <p className="text-gray-600">{contact.phone}</p>
                  </div>
                  <div className="flex-shrink-0 space-x-4">
                    <Link
                      to={`/details/${contact.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Details
                    </Link>
                    <Link
                      to={`/edit/${contact.id}`}
                      className="text-yellow-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default ContactList;
