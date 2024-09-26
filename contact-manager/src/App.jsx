import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import { Routes,Route, Navigate } from 'react-router-dom'
import ContactList from './Components/Contact/ContactList/ContactList'
import AddContact from './Components/Contact/AddContact/AddContact'

import ViewContact from './Components/Contact/ViewContact/ViewContact'
import EditContact from './Components/Contact/EditContact/EditContact'

function App() {
  return (
    <>
<NavBar/>
<Routes>
 <Route  path='/' element={<Navigate to={'/contact/list'}/>}/>
<Route path='/contact/list' element={<ContactList/>} />
<Route path='/contact/add' element={<AddContact/>} />

<Route path='/contact/view/:contactId' element={< ViewContact/>}  />
<Route path='/contact/edit/:contactId' element={<EditContact/>} />
</Routes>
    </>
  )
}

export default App
