import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Keyboard from "../../components/Keyboard/Keyboard";
import Navbar from "../../components/Navbar/Navbar";
import config from "../../config";

const Withdrawal = () => {
  const url = config.apiUrl + '/Operaciones';
  const navigate = useNavigate();
  const location = useLocation();
  const ID = location.state?.id;
  const [amount, setAmount] = useState("");
  const [operationCode, setOperationCode] = useState(null);

  useEffect(() => {
    if (operationCode == 2) {
      const operationForm = {
        iD_Tarjeta: ID,
        fechaHora: new Date(),
        codigoOperacion: operationCode,
        cantidadRetirada: parseFloat(amount),
      };
      addOperation(operationForm);
      setOperationCode(null);
      handleNavigate("/operations/report", { state: { id: ID } });
    }
  }, [operationCode]);

  const addOperation = async (operationForm) => {
    try {
      const response = await axios.post(url, operationForm);
      handleErrorMessage(response);
    } catch (error) {
      console.error("Error al obtener la tarjeta:", error);
    }
  };

  const handleKeyPress = (digit) => {
    if (digit === "delete") {
      setAmount("");
    } else if (digit === "accept") {
      setOperationCode(2);
    } else {
      setAmount(amount + digit);
    }
  };

  const handleErrorMessage = (response) => {
    const errorCode = response.data.status.code;
    if (errorCode != 0) {
      const message = response.data.status.message;
      handleNavigate("/errorPage", {
        state: {
          errorMessage: message,
          previuousPage: "/operations/withdrawal",
          id: ID,
        },
      });
    } else {
    }
  };

  const handleNavigate = (url, state) => {
    navigate(url, state);
  };

  return (
    <div className="w-full h-screen bg-neutral-950">
      <Navbar sectionTitle = "Retiros"/>
      <div className="flex justify-around items-center w-full ">
        <div className="w-2/5 p-4 mb-32">
          <p className="text-4xl text-center italic text-yellow-400 font-semibold mb-16">
            Ingrese la cantidad que desea retirar
          </p>
          <input
            type="text"
            value={amount}
            placeholder="$"
            readOnly
            className="w-full h-16 bg-transparent border-b border-white px-4 text-center text-white text-3xl rounded-none outline-none"
          />
          /
        </div>
        <div className="w-2/5 p-4 flex items-center justify-center">
          <Keyboard onKeyPress={handleKeyPress} />
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
