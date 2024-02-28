import React, { useState } from "react";
import Keyboard from "../../components/Keyboard/Keyboard";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const url = "https://localhost:44365/api/Tarjetas";
  const [cardNumber, setCardNumber] = useState("");

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
      getTarjetasByNum(num);
    }
  };

  const getTarjetasByNum = async (num) => {
    try {
      const response = await axios.get(url + "/" + num);

      if (response.data.message != null) {
        const error = response.data.message;
        navigate("/errorPage", { state: { errorMessage: error } });
      }
      else{
        const pin = response.data.pin;
        navigate("/pinEntry", { state: { pin: pin } });
      }
    } catch (error) {
      console.error("Error al obtener la tarjeta:", error);
    }
  };

  return (
    <>
      <div className="py-4">
        <h1 className="text-5xl text-center mb-4">Bienvenido!</h1>
        <p className="text-2xl text-center">
          Para realizar sus operaciones ingrese los 16 digitos de su tarjeta
        </p>
      </div>
      <div className="w-full flex justify-center items-center h-screen bg-stone-200">
        <div className="relative bg-zinc-800 rounded-3xl">
          <input
            type="text"
            value={cardNumber}
            readOnly
            className="bg-transparent w-full h-12 text-center text-xl font-bold outline-none rounded-md p-2 text-white placeholder-white"
          />
          <Keyboard onKeyPress={handleKeyPress} />
        </div>
      </div>
    </>
  );
};

export default Home;
