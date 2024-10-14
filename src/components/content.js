import React from 'react';
import { useState } from "react"


const ContentChild = () => {
    const [count, setCount] = useState(0)
    let x = 0
    return (
        <div className="flex items-center justify-center">
        <div className="p-6 rounded-lg shadow-lg text-center w-100 bg-purple-400 mt-20">
          <p style={{ fontFamily: 'Nico Moji' }} className="text-xl text-black mb-4">Valor: {count}</p>
          <div className="flex justify-center mt-10 space-x-4">
            <button
              onClick={() => setCount(count + 1)}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition"
            >
              Aumentar
            </button>
            <button
              onClick={() => setCount(count - 1)}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-red-600 transition"
            >
              Diminuir
            </button>
            <button
              onClick={() => setCount(count * 2)}
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-green-600 transition"
            >
              Dobrar
            </button>
            <button
              onClick={() => setCount(0)}
              className="bg-gray-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-gray-600 transition"
            >
              Resetar
            </button>
          </div>
        </div>
      </div>
    )
}

export default ContentChild



