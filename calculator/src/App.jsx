
import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('')

  const handleClick = (value) => {
    setDisplay(display + value)
  }

  const clear = () => {
    setDisplay('')
  }

  const calculate = () => {
    try {
      if (!/^[0-9+\-*/.() ]+$/.test(display)) return
      const result = Function('"use strict"; return (' + display + ')')()
      setDisplay(String(result))
    } catch {
      setDisplay('Error')
    }
  }

  const buttons = [
    'AC', 'DEL', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '00', '='
  ]

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-800 p-6 rounded-3xl w-full max-w-sm shadow-2xl">
        <h1 className="text-white text-2xl font-bold text-center mb-5">
          Calculator
        </h1>

        <div className="bg-slate-950 text-white text-right text-4xl p-5 rounded-xl mb-5 min-h-20 break-all">
          {display || '0'}
        </div>

        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === 'AC') clear()
                else if (btn === 'DEL') setDisplay(display.slice(0, -1))
                else if (btn === '=') calculate()
                else handleClick(btn === '%' ? '/100' : btn)
              }}
              className={`p-4 rounded-xl text-xl font-bold text-white hover:opacity-80 active:scale-95 transition
                ${btn === '=' ? 'bg-orange-500' :
                  ['+', '-', '*', '/', '%'].includes(btn) ? 'bg-blue-600' :
                  ['AC', 'DEL'].includes(btn) ? 'bg-red-500' :
                  'bg-slate-600'}`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
