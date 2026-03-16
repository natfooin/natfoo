import React from "react";
import "./DetailCard.css";
const DetailCard = ({ header = "Header", content = [] }) => {
  console.log("Content : " + JSON.stringify(content));
  return (
    <div className="detail-card-container">
      <div className="detail-card-header">
        <h1>{header}</h1>
      </div>
      <div className="detail-card-content">
        <ul>
          <ul>
            {content?.length ? (
              content.map((point, index) => <li key={index}>{point}</li>)
            ) : (
              <p>No details available</p>
            )}
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default DetailCard;
