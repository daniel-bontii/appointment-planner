import React, { useState } from "react";
import {Routes, Route, Navigate, NavLink } from "react-router-dom";

import { AppointmentsPage } from "./containers/appointmentsPage/AppointmentsPage";
import { ContactsPage } from "./containers/contactsPage/ContactsPage";

function App() {
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);

  const addAppointment = (title, contact, date, time) => {
    setAppointments([
      ...appointments,
      {
        title: title,
        contact: contact,
        date: date,
        time: time,
      },
    ]);
  };

  const addContact = (name, phone, email) => {
    setContacts([
      ...contacts,
      {
        name: name,
        phone: phone,
        email: email,
      },
    ]);
  };

  return (
    <>
      <nav>
        <NavLink to="/contacts" activeClassName="active">
          Contacts
        </NavLink>
        <NavLink to="/appointments" activeClassName="active">
          Appointments
        </NavLink>
      </nav>
      <main>
          <Routes>
            <Route 
              exact path="/" 
              element={<Navigate to="/contacts" />}>
            </Route>

            <Route 
              path="/contacts" 
              element={<ContactsPage contacts={contacts} addContact={addContact} />}>
            </Route>

            <Route 
              path="/appointments" 
              element={<AppointmentsPage
              appointments={appointments}
              addAppointment={addAppointment}
              contacts={contacts}
              />}>
            </Route>
          </Routes>
      </main>
    </>
  );
}

export default App;
