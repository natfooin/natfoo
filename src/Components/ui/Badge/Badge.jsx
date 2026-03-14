import "./Badge.css";
const Badge = ({
  icon = null,
  color = "#23805e",
  bgColor = "#ecfdf5",
  text = "Custom Badge",
  styles = null,
  click=()=>{},
}) => {
  return (
    <div
      className="badge-container"
      style={{
        color: color,
        backgroundColor: bgColor,
        border: `1px solid ${color}`,
        ...styles,
      }}
      onClick={click}
    >
      {icon}
      {text}

    </div>
  );
};

export default Badge;
