import "./Button.css";

const Button = ({
  text = "Button",
  icon = null,
  color = "#ffffff",
  bgColor = "#d94a3a",
  borderColor = "transparent",
  minWidth = "auto",
  height = "auto",
  cn = "",
  styles = {},
  onClick = () => {},
}) => {
  return (
    <button
      className={`button-container ${cn}`}
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