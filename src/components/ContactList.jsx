/* eslint-disable react/prop-types */
import Person from "./Person";
import db from "../services/contacts";

const ContactList = ({
  persons,
  searchTerm,
  setPersons,
  setSearchTerm,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const handleSearchTermChange = ({ target }) =>
    setSearchTerm(target.value.toLowerCase());

  const userConfirmDelete = () =>
    window.confirm("Are you sure you want to delete this contact?");

  const deleteContact = async (id) => {
    try {
      if (userConfirmDelete()) {
        await db.remove(id);
        console.log("delete contact method on FE");
        // const status =

        setPersons((prevPersons) =>
          prevPersons.filter((person) => person.id !== id)
        );
        setSuccessMessage(`Contact deleted successfully`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(`Contact with id ${id} failed to delete`);
    }
  };

  const renderFilteredList = () => {
    // console.log(persons);
    return persons.reduce((list, person, i) => {
      if (person.name.toLowerCase().includes(searchTerm)) {
        list.push(
          <Person
            key={String(i).concat(person.name, String(i))}
            personData={person}
            deleteContact={() => deleteContact(person.id)}
          />
        );
      }
      return list;
    }, []);
  };
  return (
    <div>
      <h2>Contacts</h2>
      {"search: "}
      <input value={searchTerm} onChange={handleSearchTermChange} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderFilteredList()}</tbody>
      </table>
    </div>
  );
};

export default ContactList;
