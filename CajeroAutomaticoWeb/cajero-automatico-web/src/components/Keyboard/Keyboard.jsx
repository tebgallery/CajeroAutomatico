import React, { useState } from 'react';

const Keyboard = ({ onKeyPress }) => {

    const handleKeyPress = (digit) => {
        onKeyPress(digit);
      };
    
      return (
        <div className="grid grid-cols-3 gap-x-8 gap-y-4 p-6 h-full w-7/12">
          {[...Array(9)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleKeyPress(index + 1)}
              className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-8 px-2 rounded-full"
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handleKeyPress('delete')}
            className="bg-yellow-600 hover:bg-yellow-400 text-white font-bold py-8 px-2 rounded-full"
          >
            Limpiar
          </button>
          <button
            onClick={() => handleKeyPress(0)}
            className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-8 px-2 rounded-full"
          >
            0
          </button>

          <button
            onClick={() => handleKeyPress('accept')}
            className="bg-yellow-600 hover:bg-yellow-400 text-white font-bold py-8 px-2 rounded-full"
          >
            Aceptar
          </button>
          
        </div>
      );
};


export default Keyboard;