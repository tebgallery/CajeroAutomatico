import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const errorMessage = location.state?.errorMessage;

  const handleNavigateHome = () => {
    navigate('/home');
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="w-1/3 h-2/5 bg-white shadow-2xl">
        <div className="w-full h-1/3 bg-red-500 flex items-center justify-center">
          <FontAwesomeIcon
            className="w-16 h-16 text-white"
            icon={faTriangleExclamation}
          />
        </div>

        <div className="w-full h-1/3 mt-8 mb-4">
          <h3 className="text-5xl text-center mb-4">Error!</h3>
          <p className="text-2xl text-center">{errorMessage}</p>
        </div>

        <div className="w-full flex items-center justify-center">
            <button className="bg-red-400 hover:bg-red-600 px-8 py-2 rounded-2xl text-white duration-500 transition-transform transform hover:scale-105 "
                onClick={handleNavigateHome}
            >
                Volver al Home
            </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
