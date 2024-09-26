
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Ensure the correct path to App component
import { BrowserRouter } from 'react-router-dom';
import  './index.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
//bootstrap css configuration
import '../node_modules/bootstrap/dist/css/bootstrap.css';
//bootstrap js configuration
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
// import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <App/>
  </BrowserRouter>
);
  




