import React from "react";
import "./Input.css";
const Input = ({
  type = "text",
  icon = null,
  styles = null,
  placeholder = "",
  onChangeHandler,
}) => {
  return (
    <div className="input-container">
      {icon}
      <input
        type={type}
        style={styles}
        placeholder={placeholder}
        className="input-field"
        onChange={(e) => onChangeHandler(e)}
      />
    </div>
  );
};

export default Input;
