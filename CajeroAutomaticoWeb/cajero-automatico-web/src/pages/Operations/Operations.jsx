import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

const Operations = () => {
  const url = "https://localhost:44365/api/Operaciones";
  const navigate = useNavigate();
  const location = useLocation();
  const ID = location.state?.id;
  const [operationCode, setOperationCode] = useState(null);

  useEffect(() => {
    if (operationCode == 1) {
      const operationForm = {
        idTarjeta: ID,
        fechaHora: new Date(),
        codigoOperacion: operationCode,
      };
      addOperation(operationForm);

      navigate("/operations/balance", { state: { id: ID } });
    } else if (operationCode == 2) {
      navigate("/operations/withdrawal", { state: { id: ID } });
    }
  }, [operationCode]);

  const addOperation = async (operationForm) => {
    try {
      const response = await axios.post(url, operationForm);
      console.log("Operacion creada correctamente");
    } catch (error) {
      console.error("Error al obtener la tarjeta:", error);
    }
  };

  const navigateToHome = () => {
    navigate("/Home");
  };

  return (
    <div className="w-full h-screen bg-neutral-950">
      <Navbar sectionTitle = "Operaciones"/>
      <div className="p-8 shadow-2xl">
        <p className="text-5xl text-center text-white italic font-semibold mb-20">
          Elija su operación
        </p>
        <div className="w-full flex items-center justify-center">
          <div className="w-10/12 flex items-center justify-around">
            <button
              className="bg-gray-700 hover:bg-yellow-500 w-96 h-20 my-6 py-6 hover:bg-yellow-500 text-white text-center text-3xl rounded-3xl duration-500 transition-transform transform hover:scale-105"
              onClick={() => {
                setOperationCode(1);
              }}
            >
              Balance
            </button>
            <button
              className="bg-gray-700 hover:bg-yellow-500 w-96 h-20 my-6 py-6 hover:bg-yellow-500 text-white text-center text-3xl rounded-3xl duration-500 transition-transform transform hover:scale-105"
              onClick={() => {
                setOperationCode(2);
              }}
            >
              Retiros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operations;
