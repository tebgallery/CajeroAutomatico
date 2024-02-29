import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Keyboard from "../../components/Keyboard/Keyboard";

const Withdrawal = () => {
  const url = "https://localhost:44365/api/";
  const navigate = useNavigate();
  const location = useLocation();
  const ID = location.state?.id;
  const [amount, setAmount] = useState("");
  const [operationCode,setOperationCode] = useState(null);


  useEffect(() => {
    if (operationCode == 2) {
        const operationForm = {
            idTarjeta: ID,
            fechaHora: new Date(),
            codigoOperacion: operationCode,
            cantidadRetirada: parseFloat(amount)
        };
        updateBalance(ID,parseFloat(amount));
        addOperation(operationForm);
        setOperationCode(null);
    }
}, [operationCode]);


  const addOperation = async (operationForm) => { 
    try {
        const response = await axios.post(url + 'Operaciones' , operationForm);
  
    } catch (error) {
        console.error("Error al obtener la tarjeta:", error);

    }
}

const updateBalance = async (id,amount) =>{
    try {
    const response = await axios.put(url + 'Tarjetas/UpdateBalance/'+ id + '?amount=' + amount );
    handleErrorMessage(response);
    }catch (error) {
        console.error("Error al actualizar el saldo de la tarjeta:", error);

    }
}

  const handleKeyPress = (digit) => {
    if (digit === "delete") {
        setAmount("");
      } else if (digit === "accept") {
        setOperationCode(2);
      } else {
        setAmount(amount + digit);
      }
  };

  const handleErrorMessage = (response) =>{
    const errorCode = response.data.status.code;
    if(errorCode != 0){
        const message = response.data.status.message;
        handleNavigate("/errorPage", {
            state: { errorMessage: message, previuousPage: '/operations/withdrawal', id: ID },
          });
    }
    else{

    }
  }


  const handleNavigate = (url,state) => {
    navigate(url,state);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-300 flex items-center justify-center">
      <div className="bg-blue-900 p-8 shadow-2xl rounded-3xl">
        <div className="flex items-center justify-around mb-8">
          <button
            className="bg-red-500 text-white italic rounded-xl px-10 py-4 hover:bg-red-600"
            onClick={() => {
              handleNavigate("/home");
            }}
          >
            Salir
          </button>
          <h2 className="text-6xl text-white font-bold">ATM</h2>
          <p className="w-26 text-lg text-white font-semibold">Retiros</p>
        </div>
        <h3 className="text-5xl text-white text-center italic font-semibold mb-12">
          Retiro de dinero
        </h3>
        <p className="text-3xl text-white text-center font-semibold mb-12 ">
          Ingrese la cantidad que desea retirar
        </p>
            <input
              type="text"
              value={amount}
              readOnly
              className="mb-8 bg-transparent border rounded-2xl border-white w-full h-12 text-center text-xl font-bold outline-none rounded-md p-2 text-white placeholder-white"
            />
            <div className="relative w-full flex items-center justify-center">
            <Keyboard onKeyPress={handleKeyPress} />
          </div>
        </div>
      </div>
  );
};

export default Withdrawal;
