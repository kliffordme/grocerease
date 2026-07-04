import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectLocation,
  selectCart,
  selectCartCount,
  removeFromCart,
  selectToast,
  hideToast,
  openLocationModal,
} from '../redux/globalSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedLocation = useSelector(selectLocation)
  const cart = useSelector(selectCart)
  const cartCount = useSelector(selectCartCount)
  const toast = useSelector(selectToast)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => dispatch(hideToast()), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast, dispatch])

  // Extract city/municipality from the full address string
  const city = selectedLocation?.split(',').slice(-2, -1)[0]?.trim()

  return (
    <header className="bg-green-700 text-white flex items-center justify-between px-4 sm:px-6 py-3 shadow-md">
      {/* Logo */}
      <button
        onClick={() => navigate('/')}
        className="text-xl font-bold tracking-tight hover:opacity-80 transition"
      >
        GrocerEase
      </button>

      <div className="flex items-center gap-2">
        {/* Location pill */}
        <button
          onClick={() => dispatch(openLocationModal())}
          className="flex items-center gap-1.5 text-sm bg-green-600 hover:bg-green-500 rounded-lg px-3 py-1.5 transition"
        >
          <img src="/pin.svg" alt="" className="w-4 h-4 shrink-0" />
          <span className="truncate max-w-[120px]">{city || 'Set location'}</span>
        </button>

        {/* Cart */}
        <div className="relative">
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative flex items-center bg-green-600 hover:bg-green-500 rounded-lg px-3 py-1.5 transition"
            aria-label="Open cart"
          >
            <img src="/basket.svg" alt="Cart" className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Cart dropdown */}
          {isCartOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
              {cart.length === 0 ? (
                <p className="p-5 text-sm text-gray-500 text-center">Your cart is empty</p>
              ) : (
                <>
                  <ul className="max-h-64 overflow-y-auto divide-y divide-gray-100">
                    {cart.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-start justify-between gap-2 px-4 py-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.name}</p>
                          <p className="text-xs text-gray-400">
                            ×{item.quantity} — ₱{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => dispatch(removeFromCart(item.name))}
                          className="text-xs text-red-500 hover:text-red-700 shrink-0 mt-0.5 transition"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 py-3 border-t border-gray-100">
                    <button
                      onClick={() => { navigate('/checkout'); setIsCartOpen(false); }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition"
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

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
    </header>
  )
}

export default Header
