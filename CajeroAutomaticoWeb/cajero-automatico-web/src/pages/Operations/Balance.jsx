import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import creditCard from '../../img/credit-card.png';

const Balance = () => {
    const url = "https://localhost:44365/api/Tarjetas/GetById/";
    const navigate = useNavigate();
    const location = useLocation();
    const ID = location.state?.id;
    const [cardData, setCardData] = useState(null); // Utilizar useState para cardData


    const getTarjetaById = async (ID) => { 
        try {
            const response = await axios.get(url + ID);
            setCardData(response.data); // Actualizar cardData con los datos obtenidos
      
        } catch (error) {
            console.error("Error al obtener la tarjeta:", error);
        }
    }

    useEffect(() => {
        getTarjetaById(ID);
    }, [ID]); // Agregar ID como dependencia para que useEffect se ejecute cuando cambie

    
    const handleNavigate = (url,state) => {
        navigate(url,state);
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-300 flex items-center justify-center">
            <div className="bg-blue-900 p-8 shadow-2xl rounded-3xl">
                <div className="w-full flex items-center justify-between">
                    <button className="bg-white text-orange-400 border-2 border-orange-400 rounded-xl px-10 py-4 " 
                        onClick={() => {
                            handleNavigate('/operations',{ state: { id: ID } })
                        }}
                    >
                        
                        Atras
                    </button>

                    <button className="bg-red-600 text-white rounded-xl px-10 py-4 " 
                        onClick={() => {
                            handleNavigate('/home')
                        }}
                    >
                        
                        Salir
                    </button>
                </div>
                <h2 className="text-5xl text-white text-center italic font-semibold mb-12"> Balance </h2>
                <p className="text-3xl text-white text-center font-semibold mb-12 ">Aqui puede ver los datos de su tarjeta</p>
            { cardData && (
                <div className="bg-white rounded-2xl p-8 text-black">
                    <div className="w-full">
                        <img src={creditCard} alt="credit-card" 
                        
                        />
                    </div>
                    <p className="text-2xl text-left my-4">Número de tarjeta: {cardData.numero}</p>
                    <p className="text-2xl text-left my-4">Fecha de vencimiento: {cardData.fechaVencimiento}</p>
                    <p className="text-2xl text-left my-4">Balance: ${cardData.balance}</p>
                </div> 
            )}
            </div>
        </div>
    );
};

export default Balance;
