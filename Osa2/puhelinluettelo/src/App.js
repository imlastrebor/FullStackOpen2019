import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("lisää nimi");

  const addName = e => {
    e.preventDefault();
    const listObject = {
      name: newName,
      id: persons.length + 1
    };
    setPersons(persons.concat(listObject));
    setNewName("");
    if (persons.find(duplicate => duplicate.name === newName)) {
      alert(`${newName} on jo listalla`);
    }
  };

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  let uniq = Array.from(new Set(persons.map(uniqArr => uniqArr.name))).map(
    name => {
      return persons.find(uniqArr => uniqArr.name === name);
    }
  );

  const personName = uniq.map(person => {
    return <p key={person.id}>{person.name}</p>;
  });

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form>
        <div>
          nimi: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" onClick={addName}>
            lisää
          </button>
        </div>
      </form>
      <h2>Numerot</h2>
      <> {personName} </>
    </div>
  );
};

export default App;
