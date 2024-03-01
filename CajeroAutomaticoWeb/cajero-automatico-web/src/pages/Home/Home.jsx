import React, { useState } from "react";
import Keyboard from "../../components/Keyboard/Keyboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const Home = () => {
  const url = config.apiUrl + '/Tarjetas/';
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const exampleCardNumber = "XXXX - XXXX - XXXX - XXXX";

  const handleKeyPress = (digit) => {
    let approvedCard = false;
    if (digit === "delete") {
      setCardNumber("");
    } else if (cardNumber.length < 19) {
      if (digit != "accept") {
        if (cardNumber.length % 5 === 4) {
          setCardNumber(cardNumber + "-" + digit);
        } else {
          setCardNumber(cardNumber + digit);
        }
      }
    } else if (cardNumber.length == 19) {
      approvedCard = true;
    }

    if (digit == "accept" && approvedCard) {
      const num = cardNumber.replace(/-/g, "");
      validateTarjeta(num);
    }
  };

  const validateTarjeta = async (num) => {
    try {
      const response = await axios.get(url + num);
      handleNavigate(response,num);
    } catch (error) {
      console.error("Error al obtener la tarjeta:", error);
    }
  };

  const handleNavigate = (response,num) => {
    if (response.data.status.code != 0) {
        const error = response.data.status.message;
        navigate("/errorPage", { state: { errorMessage: error, previuousPage: '/Home' } });
      }
      else{
        navigate("/pinEntry", { state: { num: num } });
      }
  }

  const handleCardNumberChange = (event) => {
    const { value } = event.target;
    if (value.length <= 19) {
        setCardNumber(value);
      }
  };

  return (
    <div className="w-full h-screen bg-neutral-950">
        <div className="w-full flex items-center justify-around mb-36 border-b-2 border-yellow-400 py-4">
        <button
            disabled
        >
        </button>
        <h2 className="text-6xl text-white font-bold">ATM</h2>
        <p className="w-26 text-lg text-white font-semibold">Ingreso Tarjeta</p>
      </div>
    <div className="flex justify-around items-center w-full">
      <div className="w-2/5 p-4 mb-32">
        <p className="text-4xl text-center italic text-yellow-400 font-semibold mb-16">
          Ingrese los 16 dígitos de su tarjeta
        </p>
        <input
          type="text"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder={exampleCardNumber}
          readOnly
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

export default Home;
