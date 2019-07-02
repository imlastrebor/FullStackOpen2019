import React from "react";
import Input from "./Input";

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

export default Filter;
