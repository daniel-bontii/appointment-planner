import React, { useState, useEffect } from "react";

import { ContactForm } from "../../components/contactForm/ContactForm";
import { TileList } from "../../components/tileList/TileList";

export const ContactsPage = ({ contacts, addContact }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [duplicate, setDuplicate] = useState(false);
  const [dbcontacts, setDBContacts] = useState([]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!duplicate) {
  //     addContact(name, phone, email);
  //     setName("");
  //     setPhone("");
  //     setEmail("");
  //   }
  // };

  // useEffect(() => {
  //   const nameIsDuplicate = () => {
  //     const found = contacts.find((contact) => contact.name === name);
  //     if (found !== undefined) {
  //       return true;
  //     }
  //     return false;
  //   };

  //   if (nameIsDuplicate()) {
  //     setDuplicate(true);
  //   } else {
  //     setDuplicate(false);
  //   }
  // }, [name, contacts, duplicate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitteddddd')
  };

  const getContacts = async () => {
    try {
      const res = await fetch("http://localhost:4001/aplanner/api/v1/contacts");
      const jsonRes = await res.json();
      setDBContacts(jsonRes);
      // console.log(jsonRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <section>
        <h2>
          Add Contact
          {duplicate ? " - Name Already Exists" : ""}
        </h2>
        <ContactForm
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          handleSubmit={handleSubmit}
        />
      </section>
      <hr />
      <section>
        <h2>Contacts</h2>
        {/* {dbcontacts.map(contact => <h2 >{contact.contact_name}</h2>)} */}
        {/* {dbcontacts.map(contact => <h2 >{contact.contact_name}</h2>)} */}
        <TileList tiles={dbcontacts} />
      </section>
    </>
  );
};
