import React, { useState } from "react";
import Keyboard from "../../components/Keyboard/Keyboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const url = "https://localhost:44365/api/Tarjetas/";
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
      getTarjeta(num);
    }
  };

  const getTarjeta = async (num) => {
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

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-300 flex items-center justify-center">
        <div className="bg-blue-900 p-8 shadow-2xl">
            <div className="flex items-center justify-center mb-8">
            <h3 className="text-6xl text-white font-bold">ATM</h3>
        </div>
          <div className="my-4">
          <p className="text-2xl text-center text-white italic mb-8">
            Ingrese los 16 digitos de su tarjeta para continuar
          </p>

            <input
              type="text"
              value={cardNumber}
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

export default Home;
