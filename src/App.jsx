/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import db from "./services/contacts";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const initialRequest = () => {
    (async () => {
      try {
        const initialContactList = await db.getAll();
        setPersons(initialContactList);
      } catch (e) {
        alert(`something broke with initial data fetching operation`);
      }
    }).call(null);
  };

  useEffect(initialRequest, []);

  return (
    <>
      <Notification message={successMessage} />
      <Error message={errorMessage} />
      <AddContact
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        successMessage={successMessage}
        errorMessage={errorMessage}
        setPersons={setPersons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />
      <ContactList
        persons={persons}
        searchTerm={searchTerm}
        successMessage={successMessage}
        errorMessage={errorMessage}
        setPersons={setPersons}
        setSearchTerm={setSearchTerm}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
};

export default App;
