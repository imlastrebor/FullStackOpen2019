import React from "react";

const Input = ({ field, content, handle }) => {
  return (
    <div>
      {field} <input value={content} onChange={handle} />
    </div>
  );
};

export default Input;
