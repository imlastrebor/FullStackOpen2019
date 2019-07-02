import React from "react";
import PersonInfo from "./PersonInfo";

const Persons = props => {
  return (
    <ul>
      <PersonInfo
        unique={props.unique}
        uniqueNames={props.uniqueNames}
        filter={props.filter}
        persons={props.persons}
        setErrorMessage={props.setErrorMessage}
      />
    </ul>
  );
};

export default Persons;
