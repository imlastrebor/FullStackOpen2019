import React, { useState, useEffect } from "react";
import axios from "axios";

const Button = ({ text, mission }) => {
  return (
    <div>
      <button onClick={mission}> {text} </button>
    </div>
  );
};

const Input = ({ field, content, handle }) => {
  return (
    <div>
      {field} <input value={content} onChange={handle} />
    </div>
  );
};

// const FilteredNames = props => {
//   const result = props.nameSearch(props.uniqueNames, props.filter);
//   return <li>{result}</li>;
// };

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
      {/* <ul>
        <FilteredNames
          nameSearch={props.nameSearch}
          uniqueNames={props.uniqueNames}
          filter={props.filter}
        />
      </ul> */}
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
    // const result = props.nameSearch(props.uniqueNames, props.filter);
    const result = props.uniqueNames.filter(o =>
      o.name.toLocaleLowerCase().includes(props.filter.toLocaleLowerCase())
    );
    return result.map(person => {
      return (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      );
    });
  } else {
    return props.unique.map(person => {
      return (
        <li key={person.id}>
          {person.name} {person.number}
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
        // nameSearch={props.nameSearch}
        uniqueNames={props.uniqueNames}
        filter={props.filter}
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
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  }, []);

  const addInfo = e => {
    e.preventDefault();
    const listObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };
    setPersons(persons.concat(listObject));
    setFilter("");
    setNewName("");
    setNewNumber("");
    if (persons.find(duplicate => duplicate.name === newName)) {
      alert(`${newName} on jo listalla`);
    }
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };

  const unique = Array.from(new Set(persons.map(uniqArr => uniqArr.name))).map(
    name => {
      return persons.find(uniqArr => uniqArr.name === name);
    }
  );

  const uniqueNames = unique.map(person => {
    return person;
  });

  // const nameSearch = (arr, string) => {
  //   const search = arr.filter(o =>
  //     o.toLocaleLowerCase().includes(string.toLocaleLowerCase())
  //   );
  //   return search;
  // };
  // console.log(nameSearch(uniqueNames, filter));

  // const result = uniqueNames.filter(o =>
  //   o.name.toLocaleLowerCase().includes(newName.toLocaleLowerCase())
  // );
  // console.log(
  //   result.map(nimi => {
  //     return nimi.name;
  //   })
  // );

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
        // nameSearch={nameSearch}
        uniqueNames={uniqueNames}
        filter={filter}
      />
    </div>
  );
};
export default App;
