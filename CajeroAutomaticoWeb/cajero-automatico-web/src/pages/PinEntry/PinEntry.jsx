import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Keyboard from "../../components/Keyboard/Keyboard";
import axios from "axios";

const PinEntry = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardNumber = location.state?.num;
  const [pinNumber, setPinNumber] = useState("");
  const [attempts, setAttempts] = useState(4);
  const [errorMessage, setErrorMessage] = useState(null);
  const url = "https://localhost:44365/api/Tarjetas/";

  const getTarjeta = async (num,pin) => {
    try {
      const response = await axios.get(url + num+"?pin="+pin);
      console.log(response.data);
      validatePin(response,pin);

    } catch (error) {
      console.error("Error al obtener la tarjeta:", error);
    }
  };
  
  const handleKeyPress = (digit) => {
    if (digit === "delete") {
      setPinNumber("");
    } else if (pinNumber.length < 4 && digit !== "accept") {
      setPinNumber(pinNumber + digit);
    }

    if (digit === "accept" && pinNumber.length === 4) {
      getTarjeta(cardNumber,pinNumber);
    }
  };



  const validatePin = (response,pin) => {

    if(response.data.status.code == 2){
      setPinNumber("");

      if(attempts > 0){
        setAttempts(attempts-1);
        setErrorMessage(`PIN incorrecto, le quedan ${attempts - 1} intentos`);

        if (attempts === 1) {
          bloquearTarjeta();
          const error = "La tarjeta se bloqueó";
          handleNavigate("/errorPage", { state: { errorMessage: error } });
        }
      }

    }
    else if(response.data.status.code == 0){
      navigate("/operations", { state: { id: response.data.id } });
    }
  };

  const handleNavigate = (url) => {
    navigate(url);
  };

  const bloquearTarjeta = async (ID) => {
    try {
      await axios.put(`https://localhost:44365/api/Tarjetas/Bloquear/${ID}`);
      console.log("Tarjeta bloqueada exitosamente");
    } catch (error) {
      console.error("Error al bloquear la tarjeta:", error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-300 flex items-center justify-center">
        <div className="bg-blue-900 p-8 shadow-2xl">
            <div className="flex items-center justify-around mb-8">
            <button
                className="bg-orange-400 px-8 py-4 hover:bg-orange-500 font-semibold"
                onClick= {() =>{handleNavigate("/home")}}
            >
                Salir
            </button>
            <h3 className="text-6xl text-white font-bold">ATM</h3>
            <p className="w-26 text-lg text-white font-semibold">Ingreso PIN</p>
          </div>
          <div className="my-4">
          <p className="text-2xl text-center text-white italic mb-8">
            Ingrese su PIN de 4 digitos para comenzar sus operaciones
          </p>

          {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
            <input
              type="text"
              value={pinNumber}
              readOnly
              className="mb-8 bg-transparent border rounded-2xl border-white w-full h-12 text-center text-xl font-bold outline-none rounded-md p-2 text-white placeholder-white"
            />
            </div>
          <div className="relative w-full flex items-center justify-center">
            <Keyboard onKeyPress={handleKeyPress} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PinEntry;
