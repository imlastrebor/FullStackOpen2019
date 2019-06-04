import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("lisää nimi");

  const [newNumber, setNewNumber] = useState("lisää numero");

  const addInfo = e => {
    e.preventDefault();
    const listObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };
    setPersons(persons.concat(listObject));
    setNewName("");
    setNewNumber("");
    if (persons.find(duplicate => duplicate.name === newName)) {
      alert(`${newName} on jo listalla`);
    }
  };

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };

  let uniq = Array.from(new Set(persons.map(uniqArr => uniqArr.name))).map(
    name => {
      return persons.find(uniqArr => uniqArr.name === name);
    }
  );

  const personInfo = uniq.map(person => {
    return (
      <p key={person.id}>
        {person.name} {person.number}
      </p>
    );
  });

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form>
        <h2>Lisää uusi</h2>
        <div>
          nimi: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          numero: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addInfo}>
            lisää
          </button>
        </div>
      </form>
      <h2>Numerot</h2>
      <> {personInfo} </>
    </div>
  );
};

export default App;
