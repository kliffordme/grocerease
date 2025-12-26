import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectLocation, selectCart, selectCartCount, removeFromCart } from '../redux/globalSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedLocation = useSelector(selectLocation)
  const cart = useSelector(selectCart)
  const cartCount = useSelector(selectCartCount)
  const [isCartOpen, setIsCartOpen] = useState(false)

  console.log(cart)

  const city = selectedLocation?.split(',').reverse()[1]

  const handleClick = () => {
    navigate('/')
  }

  const handleCheckout = () => {
    navigate('/checkout')
    setIsCartOpen(false)
  }

  return (
    <header className="bg-gray-800 text-white flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 relative">
      <h1 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-0">🛒 GrocerEase</h1>

      <div className="flex items-center gap-4">
        {city && (
          <div 
            className="flex items-center hover:bg-sky-700 cursor-pointer rounded px-4 py-2"
            onClick={handleClick}
          >
            <img src="/pin.svg" alt="Pin" className="w-6 h-6 sm:w-7 sm:h-8 mr-2" />
            <span className="text-sm sm:text-base truncate">{city}</span>
          </div>
        )}

        {/* 🛍️ Cart */}
        <div className="relative">
          <button
            className="relative flex items-center hover:bg-gray-700 px-3 py-2 rounded"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <img src="/basket.svg" alt="Cart" className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-2">
                {cartCount}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {isCartOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden z-50">
              {cart.length === 0 ? (
                <div className="p-4 text-sm text-gray-500">Your cart is empty</div>
              ) : (
                <>
                  <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                    {cart.map((item) => (
                      <li key={item.id} className="p-3 flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">x{item.quantity}</p>
                        </div>
                        <button
                          className="text-red-600 text-sm"
                          onClick={() => dispatch(removeFromCart(item.name))}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="p-3 border-t border-gray-200">
                    <button
                      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
