import React from "react";

const Button = ({ text, mission }) => {
  return (
    <>
      <button onClick={mission}> {text} </button>
    </>
  );
};

export default Button;
