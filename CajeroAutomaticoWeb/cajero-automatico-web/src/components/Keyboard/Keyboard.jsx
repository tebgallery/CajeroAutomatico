import React, { useState } from 'react';

const Keyboard = ({ onKeyPress }) => {

    const handleKeyPress = (digit) => {
        onKeyPress(digit);
      };
    
      return (
        <div className="grid grid-cols-3 gap-4 p-10 h-full bg-zinc-800 w-9/12">
          {[...Array(9)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleKeyPress(index + 1)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-5 px-2 "
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handleKeyPress('delete')}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-5 px-2 "
          >
            Limpiar
          </button>
          <button
            onClick={() => handleKeyPress(0)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-5 px-2 "
          >
            0
          </button>

          <button
            onClick={() => handleKeyPress('accept')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-5 px-2"
          >
            Aceptar
          </button>
          
        </div>
      );
};


export default Keyboard;