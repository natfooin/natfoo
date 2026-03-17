import React from "react";
import "./NotFoundPage.css";
const NotFoundPage = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Looks like the page you’re looking for doesn’t exist or has been
          moved.
        </p>
        <a href="/" className="home-btn">
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
