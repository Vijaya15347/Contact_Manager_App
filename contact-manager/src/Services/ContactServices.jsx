import axios from "axios";

export default class ContactServices {
  static serverURL = `http://localhost:3000`;
  
  static getAllContacts() {
    let dataURL = `${this.serverURL}/contacts`; 
    return axios.get(dataURL);
  }

  // Get a single contact by ID
  static getContact(contactId) {
    let dataURL= `${this.serverURL}/contacts/${contactId}`;
    return axios.get(dataURL);
  }

  // Create a new contact
  static createContact(contact) {
    let dataURL = `${this.serverURL}/contacts`;
    return axios.post(dataURL, contact);
  }

  // Update a contact
  static updateContact(contact, contactId) {
    let dataURL = `${this.serverURL}/contacts/${contactId}`;
    return axios.put(dataURL, contact);
  }

  // Delete a contact
  static deleteContact(contactId) {
    let dataURL = `${this.serverURL}/contacts/${contactId}`;
    return axios.delete(dataURL);
  }
}
