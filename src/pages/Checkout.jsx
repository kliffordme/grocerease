import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, removeFromCart, selectCart } from "../redux/globalSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCart);

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleBack = () => {
    navigate(-1);
  };


  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">🧾 Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center mt-8">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 mb-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-3"
              >
                <div>
                  <span className="text-gray-800 font-medium">{item.name}</span>
                  <span className="text-gray-500 ml-2 text-sm">
                    (x{item.quantity})
                  </span>
                </div>
                <button
                  onClick={() => handleRemove(item.name)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
        >
          Back
        </button>
        <button
          onClick={handleClearCart}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        >
          Clear Cart
        </button>
      </div>

      <div className="text-center mt-10">
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
          onClick={() => alert("✅ Order placed successfully!")}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
