import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import config from "../../config";

const Balance = () => {
    const url = config.apiUrl + '/Tarjetas/GetById/';
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
    }, [ID]);

    const formatCardNumber = (cardNumber) => {
        const numberWithoutHyphens = String(cardNumber).replace(/-/g, "");
        const formattedNumber = numberWithoutHyphens.replace(/(\d{4})(?=\d)/g, "$1-");
        return formattedNumber;
    };
    
    const handleNavigate = (url,state) => {
        navigate(url,state);
    }

    return (
        <div className="w-full bg-neutral-950">
            <Navbar sectionTitle = "Balance"/>
            <div className="w-full">
                <h3 className="text-5xl italic text-white text-center font-semibold mb-12 ">Datos de su tarjeta</h3>
            { cardData && (
                <div className="w-full flex items-center justify-center">
                <div className="w-6/12 p-8 text-white">
                    <div className="py-4 border-b border-white mb-4">
                        <h4 className="text-yellow-400 text-4xl italic text-center mb-2">Numero de Tarjeta</h4>
                        <p className="text-2xl text-center my-4">{formatCardNumber(cardData.numero)}</p>
                    </div>
                    <div className="py-4 border-b border-white mb-4">
                        <h4 className="text-yellow-400 text-4xl italic text-center mb-2">Fecha de vencimiento</h4>
                        <p className="text-2xl text-center my-4">{cardData.fechaVencimiento}</p>
                    </div>
                    <div className="py-4 border-b border-white mb-4">
                        <h4 className="text-green-400 text-4xl italic text-center mb-2">Saldo en cuenta</h4>
                        <p className="text-2xl text-center my-4">${cardData.balance}</p>
                    </div>
                    <div className="w-full flex items-center justify-center mt-20">
                    <button className="bg-gray-700 hover:bg-yellow-500 w-72 px-8 py-4 hover:bg-yellow-500 text-white font-bold rounded-3xl duration-500 transition-transform transform hover:scale-105 " 
                        onClick={() => {
                            handleNavigate('/operations',{ state: { id: ID } })
                        }}
                    >
                        
                        Atras
                    </button>

                </div>
                </div> 
                </div>
            )}
            </div>
        </div>
    );
};

export default Balance;
