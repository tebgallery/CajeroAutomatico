import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Balance = () => {
    const url = "https://localhost:44365/api/Tarjetas/GetById/";
    const location = useLocation();
    const ID = location.state?.id;
    const [cardData, setCardData] = useState(null); // Utilizar useState para cardData

    console.log(ID);

    const getTarjetaById = async (ID) => { 
        try {
            const response = await axios.get(url + ID);
            console.log(response.data);
            setCardData(response.data); // Actualizar cardData con los datos obtenidos
      
        } catch (error) {
            console.error("Error al obtener la tarjeta:", error);
        }
    }

    useEffect(() => {
        getTarjetaById(ID);
    }, [ID]); // Agregar ID como dependencia para que useEffect se ejecute cuando cambie

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-300 flex items-center justify-center">
            <div className="bg-blue-900 p-8 shadow-2xl">
                <h2 className="text-5xl text-white text-center italic font-semibold mb-12"> Balance </h2>
            { cardData && (
                <div className="bg-white rounded-2xl p-8 text-black">
                    <p>Número de tarjeta: {cardData.numero}</p>
                    <p>Fecha de vencimiento: {cardData.fechaVencimiento}</p>
                    <p>Balance: ${cardData.balance}</p>
                </div> 
            )}
            </div>
        </div>
    );
};

export default Balance;
