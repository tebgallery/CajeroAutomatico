import React, { useState } from 'react';

const Keyboard = ({ onKeyPress }) => {

    const handleKeyPress = (digit) => {
        onKeyPress(digit);
      };
    
      return (
        <div className="grid grid-cols-3 gap-4 p-10 rounded-3xl h-full">
          {[...Array(9)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleKeyPress(index + 1)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-5 px-2 rounded-3xl"
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handleKeyPress('delete')}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-5 px-2 rounded-3xl"
          >
            Limpiar
          </button>
          <button
            onClick={() => handleKeyPress(0)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-5 px-2 rounded-3xl"
          >
            0
          </button>

          <button
            onClick={() => handleKeyPress('accept')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-5 px-2 rounded-3xl"
          >
            Aceptar
          </button>
          
        </div>
      );
};


export default Keyboard;