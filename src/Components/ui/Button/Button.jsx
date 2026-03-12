import "./Button.css";

const Button = ({
  text = "Button",
  icon = null,
  color = "#ffffff",
  bgColor = "#d94a3a",
  borderColor = "#d94a3a",
  minWidth = "auto",
  height = "auto",
  className = "",
  styles = {},
  onClick = () => {},
}) => {
  return (
    <button
      className={`button-container ${className}`}
      onClick={onClick}
      style={{
        color: color,
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`, 
        minWidth: minWidth,
        height: height,
        ...styles,
      }}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;