import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ContactServices from '../../../Services/ContactServices';
import Spinner from '../../Assets/Spinner';

const ContactList = () => {
  const [state, setState] = useState({
    loading: true,
    contacts: [],
    errorMessage: ''
  });

  const [query, setQuery] = useState(''); // For search input

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        let response = await ContactServices.getAllContacts();
        setState((prevState) => ({
          ...prevState,
          loading: false,
          contacts: response.data
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          errorMessage: 'Data not found!!!'
        }));
        alert('Data not found!!!');
      }
    };

    fetchData();
  }, []);

  // Handle contact deletion
  const handleDelete = async (contactId) => {
    try {
      await ContactServices.deleteContact(contactId); // Call the delete method
      setState((prevState) => ({
        ...prevState,
        contacts: prevState.contacts.filter((contact) => contact.id !== contactId)
      }));
    } catch (error) {
      alert('Failed to delete the contact');
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const { loading, contacts, errorMessage } = state;

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(query.toLowerCase()) ||
    contact.email.toLowerCase().includes(query.toLowerCase()) ||
    contact.mobile.includes(query) // Assuming mobile is a string
  );

  return (
    <>
      <section className="contact-search">
        <div className="container p-3">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3">
                  Contact Manager
                  <Link to="/contact/add" className="btn btn-primary m-3">
                    <i className="fa fa-plus-circle" /> Add
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-4">
          <div className="row justify-content-start mb-4">
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={query}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {errorMessage && (
        <div className="alert alert-danger text-center" role="alert">
          {errorMessage}
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="contact-list">
            <div className="container">
              <div className="row">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <div className="col-md-6 mb-4" key={contact.id}>
                      <div className="card d-flex justify-content-around">
                        <div className="card-body">
                          <div className="row d-flex align-items-md-center">
                            <div className="col-md-4 d-flex justify-content-sm-center">
                              <img
                                src={
                                  contact.photo ||
                                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqH-u8rLAV905572-eKimi7gvhTZtK26Frt2vniiNohPQ-uegfHzp8tvhKvQq-eRlaMt4&usqp=CAU'
                                }
                                alt={contact.name}
                                className="contact-img"
                              />
                            </div>
                            <div className="col-md-7">
                              <ul className="list-group">
                                <li className="list-group-item list-group-item-action">
                                  Name: {contact.name}
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Mobile: {contact.mobile}
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Email: {contact.email}
                                </li>
                              </ul>
                            </div>
                            <div className="col-md-1 d-flex flex-md-column align-items-center justify-content-sm-center">
                              <Link
                                to={`/contact/view/${contact.id}`}
                                className="btn btn-warning my-1"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                              <Link
                                to={`/contact/edit/${contact.id}`}
                                className="btn btn-primary my-1"
                              >
                                <i className="fa fa-pen" />
                              </Link>
                              <button
                                className="btn btn-danger my-1"
                                onClick={() => handleDelete(contact.id)}
                              >
                                <i className="fa fa-trash" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <p>No contacts found!</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </>
  );
};

export default ContactList;
