/* eslint-disable react/prop-types */

const Person = ({ personData, deleteContact }) => {
  return (
    <>
      <tr>
        <td>{personData.name}</td>
        <td>{personData.number}</td>
        <td>
          <button type="button" onClick={deleteContact}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};
export default Person;
