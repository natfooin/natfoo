import React from "react";
import "./Heading.css";
const Heading = ({
  title = "",
  subTitle = "",
  titleColor = "black",
  subTitleColor = "#343434",
}) => {
  return (
    <div className="heading-container">
      <h1 className="title" style={{ color: titleColor }}>
        {title}
      </h1>
      <h2 className="sub-title" style={{ color: subTitleColor }}>
        {subTitle}
      </h2>
    </div>
  );
};

export default Heading;
