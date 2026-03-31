import React from "react";
import "./Heading.css";
const Heading = ({
  title = "",
  subTitle = "",
  titleColor = "black",
  subTitleColor = "#343434",
  styles = null
}) => {
  return (
    <div className="heading-container" style={styles}>
      <h1 className="title" style={{ color: titleColor }}>
        {title}
      </h1>
      <h2 className="sub-title" style={{ color: subTitleColor, fontWeight:"600", fontSize:"2.6rem" }}>
        {subTitle}
      </h2>
    </div>
  );
};

export default Heading;
