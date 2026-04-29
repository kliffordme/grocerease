import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, removeFromCart, selectCart } from "../redux/globalSlice";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Test publishable key - replace with your own from Stripe Dashboard
const stripePromise = loadStripe("pk_test_51KQ3uOFqPdthnSsxydH8PynoAaoL3iFBKBvGvu5jwTga5YjJJWFMNx0bYRXw7EO9SzXLxoTCgMybci80Px4XerJO00YzeqJQjQ"); // Replace with real test key

const CheckoutForm = ({ cartItems, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    // For demo purposes, we'll simulate a successful payment
    // In a real app, you'd send the payment method to your server
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">💳 Payment Information</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <div className="border rounded p-3 bg-white">
          <CardElement options={cardStyle} />
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm mb-4">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium"
      >
        {isProcessing ? "Processing..." : `Pay ₱${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}`}
      </button>

      <p className="text-xs text-gray-500 mt-2 text-center">
        Test card: 4242 4242 4242 4242 (any future expiry, any CVC)
      </p>
    </form>
  );
};

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCart);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleOrderSuccess = () => {
    setOrderPlaced(true);
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">🧾 Checkout</h1>

      {orderPlaced ? (
        <div className="text-center py-12">
          <div className="text-green-600 text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase. Your order will be processed soon.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600 text-center mt-8">Your cart is empty.</p>
      ) : (
        <>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li
                  key={item.name}
                  className="flex justify-between items-center py-2"
                >
                  <div>
                    <span className="text-gray-800 font-medium">{item.name}</span>
                    <span className="text-gray-500 ml-2 text-sm">
                      (x{item.quantity}) - ₱{item.price} each
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">₱{item.price * item.quantity}</span>
                    <button
                      onClick={() => handleRemove(item.name)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center pt-4 border-t mt-4">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-lg font-bold text-green-600">₱{totalPrice}</span>
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm cartItems={cartItems} onSuccess={handleOrderSuccess} />
          </Elements>

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
        </>
      )}
    </div>
  );
}
