import React, { useState, useEffect } from "react";

import { AppointmentForm } from "../../components/appointmentForm/AppointmentForm";
import { AppointmentTileList } from "../../components/tileList/AppointmentTileList";

export const AppointmentsPage = ({
  appointments,
  addAppointment,
  contacts
}) => {
  const [title, setTitle] = useState("");
  const [contact, setContact] = useState(
    contacts.length > 0 ? contacts[0].name : ""
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dbAppointments, setDbAppointments] = useState([]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   addAppointment(title, contact, date, time);
  //   setTitle("");
  //   setContact("");
  //   setDate("");
  //   setTime("");
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      contactId: contact,
      appointmentTitle: title,
      appointmentDate: date,
      appointmentTime: time
    }
    const res = await fetch("http://localhost:4001/aplanner/api/v1/appointments", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    const jsonRes = await res.json();
    console.log(jsonRes)
    // console.log('submitteddddd')
    window.location = "/appointments";
  };

  const getAppointments = async () => {
    try {
      const res = await fetch("http://localhost:4001/aplanner/api/v1/appointments");
      const jsonRes = await res.json();
      setDbAppointments(jsonRes);
      // console.log(jsonRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <>
      <section>
        <h2>Add Appointment</h2>
        <AppointmentForm
          contacts={contacts}
          title={title}
          setTitle={setTitle}
          contact={contact}
          setContact={setContact}
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          handleSubmit={handleSubmit}
        />
      </section>
      <hr />
      <section>
        <h2>Appointments</h2>
        <AppointmentTileList tiles={dbAppointments} />
      </section>
    </>
  );
};
