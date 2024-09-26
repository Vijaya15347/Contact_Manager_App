import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ContactServices from '../../../Services/ContactServices';
import Spinner from '../../Assets/Spinner';

const ViewContact = () => {
  let { contactId } = useParams();

  let [state, setState] = useState({
    loading: true,
    contact: {},
    errorMessage: ''
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const response = await ContactServices.getContact(contactId);
        setState((prevState) => ({
          ...prevState,
          loading: false,
          contact: response.data
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          errorMessage: 'Data not found!' // Use errorMessage properly
        }));
      }
    };

    fetchContact();
  }, [contactId]); // Ensure to use contactId as dependency

  let { loading, contact, errorMessage } = state;

  return (
    <>
      <section className='view-contact-intro'>
        <div className="container p-3">
          <div className="row">
            <div className="col">
              <p className='h3 text-warning fw-bold'>View Contact</p>
              <p className='fst-italic'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit rerum quae, perspiciatis sint assumenda alias hic, aperiam qui earum animi obcaecati soluta cupiditate dolores corrupti, molestiae quia ducimus eligendi neque!
              </p>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : errorMessage ? (
        <div className="alert alert-danger text-center">{errorMessage}</div> // Display errorMessage when it exists
      ) : (
        <React.Fragment>
          {Object.keys(contact).length > 0 && (
            <section className='view-contact-list'>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-6 my-2">
                    <img
                      src={
                        contact.photo // Check if contact has a photo
                          ? contact.photo
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqH-u8rLAV905572-eKimi7gvhTZtK26Frt2vniiNohPQ-uegfHzp8tvhKvQq-eRlaMt4&usqp=CAU'
                      }
                      alt={contact.name}
                      className='contact-img'
                    />
                  </div>
                </div>
                <div className="row justify-content-center my-2">
                  <div className="col-md-6">
                    <ul className='list-group'>
                      <li className="list-group-item">
                        Name: <span className='fw-bold'>{contact.name}</span>
                      </li>
                      <li className="list-group-item">
                        Email: <span className='fw-bold'>{contact.email}</span>
                      </li>
                      <li className="list-group-item">
                        Contact: <span className='fw-bold'>{contact.number}</span>
                      </li>
                      <li className="list-group-item">
                        Company: <span className='fw-bold'>{contact.company}</span>
                      </li>
                      <li className="list-group-item">
                        Title: <span className='fw-bold'>{contact.title}</span>
                      </li>
                      <li className="list-group-item">
                        Group: <span className='fw-bold'>{contact.group}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row d-flex justify-content-center my-2">
                  <div className="col-md-6">
                    <Link to={'/contact/list'} className='btn btn-warning'>
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </React.Fragment>
      )}
    </>
  );
};

export default ViewContact;
