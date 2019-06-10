import React, { useState } from "react";

const Button = ({ text, mission }) => {
  return (
    <div>
      <button onClick={mission}> {text} </button>
    </div>
  );
};

const Input = ({ content, handle }) => {
  return (
    <div>
      <input value={content} onChange={handle} />
    </div>
  );
};
const PersonForm = props => {
  return (
    <>
      <form>
        <Input content={props.contentName} handle={props.handleName} />
        <Input content={props.contentNumber} handle={props.handleNumber} />
        <Button text={props.text} mission={props.mission} />
      </form>
    </>
  );
};

const Persons = ({ personInfo }) => {
  return <ul>{personInfo}</ul>;
};

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
      <li key={person.id}>
        {person.name} {person.number}
      </li>
    );
  });

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <h2>Lisää uusi</h2>

      <PersonForm
        contentName={newName}
        handleName={handleNameChange}
        contentNumber={newNumber}
        handleNumber={handleNumberChange}
        text="lisää"
        mission={addInfo}
      />

      <h2>Numerot</h2>
      <Persons personInfo={personInfo} />
    </div>
  );
};

export default App;
