import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Keyboard from '../../components/Keyboard/Keyboard';

const PinEntry = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pinUsed = String(location.state?.pin);
    const [pinNumber, setPinNumber] = useState("");
    const [attempts, setAttempts] = useState(4);
    const [errorMessage, setErrorMessage] = useState(null);

  const handleKeyPress = (digit) => {
    if (digit === "delete") {
      setPinNumber("");
    } else if (pinNumber.length < 4 && digit !== "accept") {
      setPinNumber(pinNumber + digit);
    }

    if (digit === "accept" && pinNumber.length === 4) {
      validatePin(pinNumber);
    }
  };

  const validatePin = (pin) => {
    if (pinUsed !== pin) {
        setPinNumber("");
      if (attempts > 0) {
        setAttempts(attempts - 1);
        setErrorMessage(`PIN incorrecto, le quedan ${attempts - 1} intentos`);
        
        if (attempts === 1) {
          const error = "La tarjeta se bloqueó";
          navigate("/errorPage", { state: { errorMessage: error } });
        }
      }
    } else {
      // PIN correcto, redireccionar a la siguiente página
      // navigate('/nextPage');
    }
  };

    return (
        <>
      <div className="py-4">
        <p className="text-2xl text-center">
          Ingrese su PIN de 4 digitos para comenzar sus operaciones
        </p>
      </div>
      <div className="w-full flex justify-center items-center h-screen bg-stone-200">
        <div className="relative bg-zinc-800 rounded-3xl">
        {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
            )}
          <input
            type="text"
            value={pinNumber}
            readOnly
            className="bg-transparent w-full h-12 text-center text-xl font-bold outline-none rounded-md p-2 text-white placeholder-white"
          />
          <Keyboard onKeyPress={handleKeyPress} />
        </div>
      </div>
    </>
    );
};


export default PinEntry;