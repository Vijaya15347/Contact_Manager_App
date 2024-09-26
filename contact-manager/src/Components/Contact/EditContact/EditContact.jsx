import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ContactServices from '../../../Services/ContactServices';

const EditContact = () => {
  let navigate = useNavigate();
  let { contactId } = useParams();
  let [state, setState] = useState({
    loading: true,
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

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setState({ ...state, loading: true });
        const response = await ContactServices.getContact(contactId);
        setState({ ...state, loading: false, contact: response.data });
      } catch (error) {
        setState({ ...state, loading: false, errorMessage: "Data not found!" });
      }
    };
    fetchContact();
  }, [contactId]);

  let updateHandle = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      }
    });
  };

  let submitHandle = async (event) => {
    event.preventDefault();
    try {
      setState({ ...state, loading: true });
      await ContactServices.updateContact(state.contact, contactId);
      setState({ ...state, loading: false });
      navigate("/contact/list", { replace: true });
    } catch (error) {
      setState({ ...state, loading: false, errorMessage: "Update failed!" });
    }
  };

  let { contact, loading, errorMessage } = state;

  return (
    <>
      <section className='Edit-contact'>
        <div className="col-md-6">
          <div className="container p-3">
            <div className="col">
              <p className='h3 text-success fw-bold'>Edit Contact</p>
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
                    value={contact.title}
                    onChange={updateHandle}
                    placeholder='Title'
                    className='form-control'
                  />
                </div>
                <div className="mb-2">
                  <select
                    name="groupId"
                    value={contact.groupId}
                    onChange={updateHandle}
                    className='form-control'
                  >
                    <option value="">Select Group</option>
                    <option value="Company-Group-A">Company-Group-A</option>
                    <option value="Company-Group-B">Company-Group-B</option>
                  </select>
                </div>
                <div className="mb-2">
                  <input type="submit" value="Update" className='btn btn-success m-2' />
                  <Link to={'/contact/list'} className='btn btn-dark ms-2'>Cancel</Link>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <img
                src={contact.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqH-u8rLAV905572-eKimi7gvhTZtK26Frt2vniiNohPQ-uegfHzp8tvhKvQq-eRlaMt4&usqp=CAU"}
                className='contact-img'
                alt={contact.name || "Contact"}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditContact;
