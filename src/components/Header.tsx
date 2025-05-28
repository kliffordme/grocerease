import { useLocation, useNavigate } from 'react-router-dom'
import React from 'react'

type LocationState = {
  address?: string;
  geometry?: {
    lng: number;
    lat: number;
  };
};

function Header() {
  const location = useLocation()
  const navigate = useNavigate()

  const state = (location.state as LocationState) || {};
  const { address } = state;

  const city = address?.split(',').reverse()[1]

  const handleClick = () => {
    navigate('/')
  }

  return (
    <header
      className="bg-gray-800 text-white flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6"
      onClick={handleClick}
    >
      <h1 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-0">🛒 GrocerEase</h1>

      {city && (
        <div className="flex items-center max-w-xs hover:bg-sky-700 cursor-pointer rounded px-4 py-2">
          <img src="/pin.svg" alt="Pin" className="w-6 h-6 sm:w-7 sm:h-8 mr-2" />
          <span className="text-sm sm:text-base truncate">{city}</span>
        </div>
      )}
    </header>
  )
}

export default Header
