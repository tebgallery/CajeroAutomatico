import React from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({sectionTitle}) => {
    const navigate = useNavigate();
    return (
        <div className="w-full flex items-center justify-around mb-36 border-b-2 border-yellow-400 py-4">
        <button
          className="hover:text-red-500 hover:bg-white px-4 py-2 bg-red-500 text-white text-xl text-center rounded-3xl duration-500 transition-transform transform hover:scale-105"
          onClick={() => {
            navigate("/home");
          }}
        >
          <FontAwesomeIcon className = "mr-2"icon={faXmark} />
          Salir
        </button>
        <h2 className="text-6xl text-white font-bold">ATM</h2>
        <p className="w-26 text-lg text-white font-semibold">{sectionTitle}</p>
      </div>
    );
};


export default Navbar;