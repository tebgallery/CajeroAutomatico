import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Keyboard from "../../components/Keyboard/Keyboard";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import config from "../../config";

const PinEntry = () => {
  const url = config.apiUrl + '/Tarjetas/';
  const navigate = useNavigate();
  const location = useLocation();
  const cardNumber = location.state?.num;
  const [pinNumber, setPinNumber] = useState("");
  const [attempts, setAttempts] = useState(4);
  const [errorMessage, setErrorMessage] = useState(null);

  const validateTarjeta = async (num, pin) => {
    try {
      const response = await axios.get(url + num + "?pin=" + pin);
      validatePin(response);
    } catch (error) {
      console.error("Error al obtener la tarjeta:", error);
    }
  };

  const updateIntentos = async (ID, attempts) => {
    try {
      const response = await axios.put(
        url + "UpdateIntentos/" + ID + "?intentos=" + attempts
      );
      handleAttempts(response);
    } catch (error) {
      console.error("Error al actualizar intentos:", error);
    }
  };
  // Agregar ID como dependencia para que useEffect se ejecute cuando cambie

  const handleKeyPress = (digit) => {
    if (digit === "delete") {
      setPinNumber("");
    } else if (pinNumber.length < 4 && digit !== "accept") {
      setPinNumber(pinNumber + digit);
    }

    if (digit === "accept" && pinNumber.length === 4) {
      validateTarjeta(cardNumber, pinNumber);
    }
  };

  const handleAttempts = (response) => {
    if (response.data.status.code === 0) {
      setErrorMessage(response.data.status.message);
      setAttempts(attempts - 1);
    }
    if (response.data.status.code === 1) {
      setErrorMessage(response.data.status.message);
      const error = response.data.status.message;
      handleNavigate("/errorPage", {
        state: { errorMessage: error, previuousPage: "/Home" },
      });
    }
  };

  const validatePin = (response) => {
    const ID = response.data.id;
    if (response.data.status.code === 2) {
      setPinNumber("");
      updateIntentos(ID, attempts - 1); // Reducir el número de intentos cuando el PIN es incorrecto
    } else if (response.data.status.code === 0) {
      updateIntentos(ID, 4); // Reiniciar el número de intentos cuando el PIN es correcto
      navigate("/operations", { state: { id: response.data.id } });
    }
  };

  const handleNavigate = (url, { state }) => {
    navigate(url, { state });
  };

  return (
    <div className="h-screen bg-neutral-950">
      <Navbar sectionTitle = "Ingreso PIN"/>
      <div className="flex justify-around items-center w-full ">
        <div className="w-2/5 p-4 mb-32">
          <p className="text-4xl text-center italic text-yellow-400 font-semibold mb-16">
            Ingrese su PIN de 4 dígitos
          </p>

          {errorMessage && (
            <p className="text-red-500 text-center text-xl font-semibold mb-8">
              {errorMessage}
            </p>
          )}
          <input
            type="text"
            value={pinNumber}
            readOnly
            placeholder="****"
            className="w-full h-16 bg-transparent border-b border-white px-4 text-center text-white text-3xl rounded-none outline-none"
          />
        </div>
        <div className="w-2/5 p-4 flex items-center justify-center">
          <Keyboard onKeyPress={handleKeyPress} />
        </div>
      </div>
    </div>
  );
};

export default PinEntry;
