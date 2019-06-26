import React, { useState, useEffect } from "react";
import axios from "axios";
import serverService from "./services/server";

const Button = ({ text, mission }) => {
  return (
    <>
      <button onClick={mission}> {text} </button>
    </>
  );
};

const Input = ({ field, content, handle }) => {
  return (
    <div>
      {field} <input value={content} onChange={handle} />
    </div>
  );
};

const Filter = props => {
  return (
    <>
      <form>
        <Input
          field={props.fieldFilter}
          content={props.contentFilter}
          handle={props.handleFilter}
        />
      </form>
    </>
  );
};

const PersonForm = props => {
  return (
    <>
      <form>
        <Input
          field={props.fieldName}
          content={props.contentName}
          handle={props.handleName}
        />
        <Input
          field={props.fieldNumber}
          content={props.contentNumber}
          handle={props.handleNumber}
        />
        <Button text={props.text} mission={props.mission} />
      </form>
    </>
  );
};

const PersonInfo = props => {
  if (props.filter.length > 0) {
    const result = props.uniqueNames.filter(o =>
      o.name.toLocaleLowerCase().includes(props.filter.toLocaleLowerCase())
    );
    return result.map(person => {
      return (
        <li key={person.id}>
          {person.name} {person.number}{" "}
          <Button
            text="Delete"
            mission={() => {
              if (
                window.confirm(
                  `Haluatko varmasti poistaa henkilön ${person.name} ?`
                )
              ) {
                axios.delete("http://localhost:3001/persons/" + person.id);
              }
            }}
          />
        </li>
      );
    });
  } else {
    return props.unique.map(person => {
      return (
        <li key={person.id}>
          {person.name} {person.number}{" "}
          <Button
            text="Delete"
            mission={() => {
              if (
                window.confirm(
                  `Haluatko varmasti poistaa henkilön ${person.name} ?`
                )
              ) {
                axios.delete("http://localhost:3001/persons/" + person.id);
              }
            }}
          />
          {/* <button
            onClick={() =>
              axios
                .delete("http://localhost:3001/persons/" + person.id)
                .then(console.log("Deleted: " + person.id))
                .catch(err => console.log(err))
            }
          >
            Delete
          </button> */}
        </li>
      );
    });
  }
};

const Persons = props => {
  return (
    <ul>
      <PersonInfo
        unique={props.unique}
        uniqueNames={props.uniqueNames}
        filter={props.filter}
        persons={props.persons}
      />
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filter, setFilter] = useState("");

  const [newName, setNewName] = useState("lisää nimi");

  const [newNumber, setNewNumber] = useState("lisää numero");

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
          `${newName} on jo listalla. Korvataanko vanha numero uudella?`
        )
      ) {
        axios.put(
          "http://localhost:3001/persons/" +
            persons.find(test => test.name === newName).id,
          {
            name: `${newName}`,
            number: `${newNumber}`
          }
        );
      }
    } else {
      serverService.create(listObject);
    }
  };
  //   if (persons.find(duplicate => duplicate.name === newName)) {
  //     alert(`${newName} on jo listalla. Korvataanko vanha numero uudella?`);
  //     console.log(
  //       persons.map(person => person).map(personInfo => personInfo.id)
  //     );
  //     console.log(persons.find(test => test.name === newName).id);
  //   } else {
  //     serverService.create(listObject);
  //   }
  // };

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
  // const handleRemove = id => {
  //   axios
  //     .delete("http://localhost:3001/persons", { params: { id: id } })
  //     .then(response => {
  //       console.log(response);
  //     });
  // };

  // const handleRemove = e => {
  //   e.preventDefault();
  //   axios.delete("http://localhost:3001/persons/4").then(res => {
  //     console.log(res);
  //     console.log(res.data);
  //     console.log(persons);
  //   });
  // };

  return (
    <div>
      <h2>Puhelinluettelo</h2>

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
      />
    </div>
  );
};
export default App;
