import React from "react";
import axios from "axios";
import Button from "./Button";

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
                axios.delete("/persons/" + person.id);
                props.setOkMessage(
                  `Henkilö ${person.name} on poistettu listalta`
                );
                setTimeout(() => {
                  props.setOkMessage(null);
                }, 4000);
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
                axios.delete("/persons/" + person.id);
                props.setOkMessage(
                  `Henkilö ${person.name} on poistettu listalta`
                );
                setTimeout(() => {
                  props.setOkMessage(null);
                }, 4000);
              }
            }}
          />
        </li>
      );
    });
  }
};

export default PersonInfo;
