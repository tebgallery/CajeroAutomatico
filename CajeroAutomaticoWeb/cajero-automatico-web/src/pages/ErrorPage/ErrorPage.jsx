import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ID = location.state?.id;
  const errorMessage = location.state?.errorMessage;
  const previousPage = location.state?.previuousPage;

  const handleNavigatePreviousPage = () => {
    if(previousPage === '/operations/withdrawal'){
      navigate(previousPage, { state: { id: ID } });
    }
    else{
      navigate(previousPage);
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-neutral-950 flex items-center justify-center">
      <div className="w-1/3 h-2/5">
        <div className="w-full h-1/3 flex items-center justify-center">
          <FontAwesomeIcon
            className="w-24 h-24 text-yellow-400"
            icon={faTriangleExclamation}
          />
        </div>

        <div className="w-full h-1/3 mt-8 mb-16">
          <h3 className="text-6xl text-white text-center mb-8">Error!</h3>
          <p className="text-3xl text-white text-center">{errorMessage}</p>
        </div>

        <div className="w-full flex items-center justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 px-16 py-4 rounded-2xl text-white font-bold duration-500 transition-transform transform hover:scale-105 "
                onClick={handleNavigatePreviousPage}
            >
                Atras
            </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
