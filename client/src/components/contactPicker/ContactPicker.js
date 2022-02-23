import React, {useEffect, useState} from "react";


export const ContactPicker = ({ name, onChange, contacts }) => {
  const [dbcontacts, setDBContacts] = useState([]);

  const getContacts = async () => {
    try {
      const res = await fetch("http://localhost:4001/aplanner/api/v1/contacts");
      const jsonRes = await res.json();
      setDBContacts(jsonRes);
      console.log(dbcontacts);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);
  
  return (
    <select name={name} onChange={onChange}>
      <option value={""} key={-1} selected="selected">
        No Contact Selected
      </option>
      {dbcontacts.map((contact) => {
        return (
          <option value={contact.id} key={contact.id}>
            {contact.contact_name}
          </option>
        );
      })}
    </select>
  );
};
