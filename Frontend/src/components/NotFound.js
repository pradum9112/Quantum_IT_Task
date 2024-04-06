import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("user");

  const handleBack = () => {
    navigate(isLoggedIn ? "/" : "/login");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ minHeight: "100vh" }}
    >
      <h2>404 Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <button onClick={handleBack} className="btn btn-dark">
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
