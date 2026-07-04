import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, removeFromCart, selectCart, selectLocation, openLocationModal } from "../redux/globalSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#374151",
      "::placeholder": { color: "#9ca3af" },
    },
    invalid: { color: "#dc2626" },
  },
};

const CheckoutForm = ({ total, canPay, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);
    setError(null);
    // Demo: simulates a successful payment after 2s
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="font-semibold text-gray-800 mb-4">Payment Details</h3>

      <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
        Card number
      </label>
      <div className="border border-gray-300 rounded-lg px-3 py-3 bg-gray-50 mb-4">
        <CardElement options={cardElementOptions} />
      </div>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || isProcessing || !canPay}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition"
      >
        {isProcessing ? "Processing…" : `Pay ₱${total.toLocaleString()}`}
      </button>

      {!canPay && (
        <p className="text-center text-xs text-amber-600 mt-2">
          Set a delivery address above to place your order.
        </p>
      )}

      <p className="text-center text-xs text-gray-400 mt-3">
        Test card: <span className="font-mono">4242 4242 4242 4242</span> · any future date · any CVC
      </p>
    </form>
  );
};

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCart);
  const address = useSelector(selectLocation);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderSuccess = () => {
    dispatch(clearCart());
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
        <p className="text-gray-500 mb-8">
          Thank you for your purchase.
          {address ? ` Your order will be delivered to ${address}.` : " Your order will be processed soon."}
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <p className="text-gray-500 text-lg mb-6">Your cart is empty.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg transition"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-gray-700 transition"
        >
          ← Back
        </button>
      </div>

      <div className="space-y-6">
        {/* Order summary */}
        <div className="space-y-2">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Order Summary</h2>
            </div>
            <ul className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between px-5 py-3 gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      ₱{item.price} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-semibold text-sm">
                      ₱{(item.price * item.quantity).toLocaleString()}
                    </span>
                    <button
                      onClick={() => dispatch(removeFromCart(item.name))}
                      className="text-xs text-red-500 hover:text-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center px-5 py-4 border-t border-gray-200 bg-gray-50">
              <span className="font-bold text-gray-800">Total</span>
              <span className="font-bold text-green-600 text-lg">
                ₱{total.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={() => dispatch(clearCart())}
            className="text-xs text-red-500 hover:text-red-700 transition"
          >
            Clear cart
          </button>
        </div>

        {/* Delivery address */}
        <div className="bg-white border border-gray-200 rounded-xl px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-semibold text-gray-800 mb-1">Delivery Address</h2>
              {address ? (
                <p className="text-sm text-gray-600">{address}</p>
              ) : (
                <p className="text-sm text-amber-600">
                  No delivery address set — we need one to deliver your order.
                </p>
              )}
            </div>
            <button
              onClick={() => dispatch(openLocationModal())}
              className="shrink-0 text-sm font-medium text-green-700 hover:text-green-800 transition"
            >
              {address ? "Change" : "Set address"}
            </button>
          </div>
        </div>

        {/* Payment form */}
        <Elements stripe={stripePromise}>
          <CheckoutForm total={total} canPay={!!address} onSuccess={handleOrderSuccess} />
        </Elements>
      </div>
    </div>
  );
}
