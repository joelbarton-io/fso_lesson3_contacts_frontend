/* eslint-disable react/prop-types */
import db from "../services/contacts";
export default function AddContact({
  newName,
  newNumber,
  persons,
  setPersons,
  setNewName,
  setNewNumber,
  setSuccessMessage,
  setErrorMessage,
}) {
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleNameChange = (e) => setNewName(e.target.value);
  const createNewContact = async () => {
    try {
      const contact = await db.create({
        name: newName,
        number: newNumber,
      });
      setPersons(persons.concat(contact));
      setNewName("");
      setNewNumber("");
      setSuccessMessage(`new contact: '${newName}' successfully created`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (e) {
      setErrorMessage(e.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const updateExistingContact = async (id) => {
    try {
      const updatedContact = await db.update(id, {
        name: newName,
        number: newNumber,
        id,
      });

      setPersons((prevPersons) =>
        prevPersons.map((person) => {
          return person.id === id ? updatedContact : person;
        })
      );
      setNewName("");
      setNewNumber("");
      setSuccessMessage(`Updated Contact!`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      setNewName("");
      setNewNumber("");
      setErrorMessage(error.response.data.error);
      setPersons((prevPersons) =>
        prevPersons.filter((person) => person.id !== id)
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleAddPerson = (e) => {
    e.preventDefault();
    const emptyInputFields = !newName.trim().length || !newNumber.trim().length;
    const detectDuplicate = () => persons.find(({ name }) => name === newName);
    const handleExistingContact = (dup) => {
      const userConfirmed = window.confirm(
        `${newName} is already in the phonebook, update their phone number?`
      );
      if (userConfirmed) updateExistingContact(dup.id);
    };

    if (emptyInputFields) {
      alert("no empty inputs allowed");
      return;
    }

    const existingContact = detectDuplicate();

    if (existingContact) {
      console.log("existing contact detected");
      handleExistingContact(existingContact);
      console.log("existing contact updated");
    } else {
      createNewContact();
    }
  };

  return (
    <div>
      <h2>Add Contact</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          {"name: "}
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          {"number: "}
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}
