import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";


const Operations = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const ID = location.state?.id;
    console.log(location);

    const handleNavigate = (url) => {
        navigate(url,{ state: { id: ID } });
    }


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-300 flex items-center justify-center">
            <div className="bg-blue-900 p-8 shadow-2xl">
                <p className='text-2xl text-center text-white italic font-semibold mb-8'>Elija su operacion</p>
                <button className='w-full bg-emerald-500 hover:bg-emerald-600 px-12 py-2 text-white font-bold my-4 duration-500 transition-transform transform hover:scale-105'
                    onClick={() => {handleNavigate('/operations/balance')}} 
                >Balance</button>
                <button className='w-full bg-emerald-500 hover:bg-emerald-600 px-12 py-2 text-white font-bold my-4 duration-500 transition-transform transform hover:scale-105'>Retiro</button>
                <button className='w-full bg-red-500  hover:bg-red-600 px-12 py-2 text-white font-bold my-4 duration-500 transition-transform transform hover:scale-105'>Salir</button>
            </div>
        </div>
    );
};


export default Operations;