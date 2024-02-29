import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const Operations = () => {
    const url = "https://localhost:44365/api/Operaciones";
    const navigate = useNavigate();
    const location = useLocation();
    const ID = location.state?.id;
    const [operationCode,setOperationCode] = useState(null);


    useEffect(() => {
        if (operationCode == 1) {
            const operationForm = {
                idTarjeta: ID,
                fechaHora: new Date(),
                codigoOperacion: operationCode
            };
            addOperation(operationForm);

            navigate('/operations/balance', { state: { id: ID } });
        }
        else if(operationCode == 2){
            navigate('/operations/withdrawal', { state: { id: ID } });
        }
    }, [operationCode]);

    const addOperation = async (operationForm) => { 
        try {
            const response = await axios.post(url, operationForm);
            console.log("Operacion creada correctamente");
      
        } catch (error) {
            console.error("Error al obtener la tarjeta:", error);
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-300 flex items-center justify-center">
            <div className="bg-blue-900 p-8 shadow-2xl">
                <p className='text-2xl text-center text-white italic font-semibold mb-8'>Elija su operacion</p>
                <button className='w-full bg-emerald-500 hover:bg-emerald-600 px-12 py-2 text-white font-bold my-4 duration-500 transition-transform transform hover:scale-105'
                    onClick={() => { setOperationCode(1) }} 
                >Balance</button>
                <button className='w-full bg-emerald-500 hover:bg-emerald-600 px-12 py-2 text-white font-bold my-4 duration-500 transition-transform transform hover:scale-105'
                    onClick={() => { setOperationCode(2) }} 
                >Retiro</button>
                <button className='w-full bg-red-500  hover:bg-red-600 px-12 py-2 text-white font-bold my-4 duration-500 transition-transform transform hover:scale-105'>Salir</button>
            </div>
        </div>
    );
};

export default Operations;
