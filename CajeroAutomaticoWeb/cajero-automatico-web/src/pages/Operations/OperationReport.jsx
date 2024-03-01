import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import config from "../../config";

const OperationReport = () => {
  const url = config.apiUrl + '/Tarjetas/UltimaOperacion/';
  const location = useLocation();
  const ID = location.state?.id;
  const navigate = useNavigate();
  const [cardData, setCardData] = useState(null);

  const getTarjetaById = async (ID) => {
    try {
      const response = await axios.get(url + ID);
      setCardData(response.data);
    } catch (error) {
      console.error("Error al obtener la tarjeta:", error);
    }
  };

  useEffect(() => {
    getTarjetaById(ID);
  });

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString([], options);
  };

  const formatCardNumber = (cardNumber) => {
    const numberWithoutHyphens = String(cardNumber).replace(/-/g, "");
        const formattedNumber = numberWithoutHyphens.replace(/(\d{4})(?=\d)/g, "$1-");
        return formattedNumber;
  };

  const handleNavigate = (url, { state }) => {
    navigate(url, { state });
  };

  return (
    <div className="w-full bg-neutral-950">
      <Navbar sectionTitle = "Estado de Retiro"/>

      <div className="w-full">
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="w-full h-24 h-24 text-green-400 mb-8"
        />
        <h2 className="text-3xl italic text-white text-center font-semibold mb-12">
          Operación creada correctamente{" "}
        </h2>
        {cardData &&
          cardData.map((card) => (
            <div className="w-full flex items-center justify-center">
              <div className="w-6/12 p-8 text-white">
                <div className="py-4 border-b border-white mb-4">
                  <h4 className="text-yellow-400 text-4xl italic text-center mb-2">
                    Numero de Tarjeta
                  </h4>
                  <p className="text-2xl text-center my-4">
                    {formatCardNumber(card.numero)}
                  </p>
                </div>
                <div className="py-4 border-b border-white mb-4">
                  <h4 className="text-green-400 text-4xl italic text-center mb-2">
                    Cantidad Retirada
                  </h4>
                  <p className="text-2xl text-center my-4">
                    ${card.cantidadRetirada}
                  </p>
                </div>
                <div className="py-4 border-b border-white mb-4">
                  <h4 className="text-green-400 text-4xl italic text-center mb-2">
                    Saldo en cuenta
                  </h4>
                  <p className="text-2xl text-center my-4">${card.balance}</p>
                </div>
                <div className="py-4 border-b border-white mb-4">
                  <h4 className="text-yellow-400 text-4xl italic text-center mb-2">
                    Fecha y Hora
                  </h4>
                  <p className="text-2xl text-center my-4">
                    {formatDate(card.fechaHora)}
                  </p>
                </div>
                <div className="w-full flex items-center justify-center mt-20">
                  <button
                    className="bg-gray-700 hover:bg-yellow-500 w-72 px-8 py-4 hover:bg-yellow-500 text-white font-bold rounded-3xl duration-500 transition-transform transform hover:scale-105"
                    onClick={() =>
                      handleNavigate("/operations/withdrawal", {
                        state: { id: ID },
                      })
                    }
                  >
                    Atras
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OperationReport;
