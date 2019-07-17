import React, { useState, useEffect } from "react";
import axios from "axios";
import serverService from "./services/server";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("lisää nimi");
  const [newNumber, setNewNumber] = useState("lisää numero");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    serverService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, [persons]);

  const addInfo = e => {
    e.preventDefault();
    const listObject = {
      name: newName,
      number: newNumber,
      id: persons.length + Math.floor(Math.random() * 100)
    };
    setPersons(persons.concat(listObject));
    setFilter("");
    setNewName("");
    setNewNumber("");
    if (persons.find(duplicate => duplicate.name === newName)) {
      if (
        window.confirm(
          `Henkilö ${newName} on jo listalla. Korvataanko vanha numero uudella?`
        )
      ) {
        axios.put(
          "/persons/" + persons.find(test => test.name === newName).id,
          {
            name: `${newName}`,
            number: `${newNumber}`
          }
        );
        console.log();

        setErrorMessage(`Henkilön ${newName} numero on päivitetty`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
      }
    } else {
      serverService.create(listObject);
      setErrorMessage(`Henkilö ${newName} lisätty listaan`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };
  const unique = Array.from(new Set(persons.map(uniqArr => uniqArr.name))).map(
    name => {
      return persons.find(uniqArr => uniqArr.name === name);
    }
  );
  const uniqueNames = unique.map(person => {
    return person;
  });

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Notification message={errorMessage} />

      <Filter
        text="hae nimellä"
        fieldFilter="haku"
        contentFilter={filter}
        handleFilter={handleFilter}
      />

      <h2>Lisää uusi</h2>

      <PersonForm
        fieldName="nimi"
        contentName={newName}
        handleName={handleNameChange}
        fieldNumber="numero"
        contentNumber={newNumber}
        handleNumber={handleNumberChange}
        text="lisää"
        mission={addInfo}
      />

      <h2>Numerot</h2>
      <Persons
        unique={unique}
        uniqueNames={uniqueNames}
        filter={filter}
        persons={persons}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
export default App;
