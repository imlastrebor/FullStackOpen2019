import React from "react";
import Input from "./Input";
import Button from "./Button";

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

export default PersonForm;
