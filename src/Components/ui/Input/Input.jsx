import React from "react";
import "./Input.css";

const Input = ({
  type = "text",
  icon = null,
  styles = {},
  placeholder = "",
  value = "",
  onChangeHandler = () => {},
}) => {
  return (
    <div
      className="input-container"
      style={{
        display: "flex",
        alignItems: "center",
        height: "48px",
        border: "2px solid #e2e8f0",
        borderRight: "none",
        borderRadius: "10px 0 0 10px",
        background: "#fff",
      }}
    >
      {icon && <span style={{ marginLeft: "10px" }}>{icon}</span>}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className="input-field"
        onChange={(e) => onChangeHandler(e)}
        style={{
          flex: 1,
          height: "100%",
          border: "none",
          outline: "none",
          padding: "0 12px",
          fontSize: "1rem",
          background: "transparent",
          ...styles,
        }}
      />
    </div>
  );
};

export default Input;