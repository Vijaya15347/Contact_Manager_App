import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ContactServices from '../../../Services/ContactServices';

const AddContact = () => {
  let navigate = useNavigate();
  
  let [state, setState] = useState({
    loading: false, // Start with loading as false
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      title: "",
      company: "",
      groupId: ""
    },
    errorMessage: ""
  });

  const updateHandle = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value
      }
    });
  };

  let { loading, contact, errorMessage } = state;

  const submitHandle = async (event) => {
    event.preventDefault();
    
    try {
        setState({ ...state, loading: true });
        let response = await ContactServices.createContact(contact); // Use the correct method name
        if (response) {
            navigate("/contact/list", { replace: true });
        } else {
            navigate("/contact/add", { replace: false });
        }
    } catch (error) {
        setState({
            ...state,
            loading: false,
            errorMessage: "Data could not be posted. Please try again."
        });
        alert("Data is not posted!!!");
    }
    setState({ ...state, loading: false });
};

  return (
    <>
        <pre>{JSON.stringify(contact)}</pre>

      <section className='add-contact'>
        <div className="container p-3">
          <div className="col">
            <p className='h3 text-success fw-bold'>Create Contact</p>
            <p className='fst-italic'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet consequuntur dolorem temporibus similique quaerat eos error minima, vitae ipsam expedita voluptates aliquid? Accusantium veniam doloremque animi tenetur, et accusamus ipsam.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 ms-4">
            <form onSubmit={submitHandle}>
              <div className="mb-2">
                <input
                  type="text"
                  name='name'
                  required={true}
                  value={contact.name}
                  onChange={updateHandle}
                  placeholder='Name'
                  className='form-control'
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name='photo'
                  required={true}
                  value={contact.photo}
                  onChange={updateHandle}
                  placeholder='Photo URL'
                  className='form-control'
                />
              </div>
              <div className="mb-2">
                <input
                  type="number"
                  name='mobile'
                  required={true}
                  value={contact.mobile}
                  onChange={updateHandle}
                  placeholder='Mobile'
                  className='form-control'
                />
              </div>
              <div className="mb-2">
                <input
                  type="email"
                  name='email'
                  required={true}
                  value={contact.email}
                  onChange={updateHandle}
                  placeholder='Email'
                  className='form-control'
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name='company'
                  required={true}
                  value={contact.company}
                  onChange={updateHandle}
                  placeholder='Company Name'
                  className='form-control'
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name='title'
                  required={true}
                  value={contact.title}
                  onChange={updateHandle}
                  placeholder='Title'
                  className='form-control'
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name='groupId'
                  required={true}
                  value={contact.groupId}
                  onChange={updateHandle}
                  placeholder='Group ID'
                  className='form-control'
                />
              </div>
              <div className="mb-2">
                <input
                  type="submit"
                  value="Create"
                  className='btn btn-success m-2'
                  disabled={loading} // Disable button when loading
                />
                <Link to={'/contact/list'} className='btn btn-dark ms-2'>
                  Cancel
                </Link>
              </div>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddContact;
