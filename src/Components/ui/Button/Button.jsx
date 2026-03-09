import React from "react";
import './Button.css'
const Button = ({ buttonName,cn }) => {
  return (
    <>
      <button className={cn}>{buttonName}</button>
    </>
  );
};

export default Button;
