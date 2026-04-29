import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedLocation: null,
  selectedCoordinates: null,
  cart: [], 
  toast: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.selectedLocation = action.payload.address;
      state.selectedCoordinates = action.payload.coordinates;
      localStorage.setItem('grocerease_location', JSON.stringify(action.payload));
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find(i => i.name === item.name);

      if (existingItem) {
        existingItem.quantity += 1;
        state.toast = `${item.name} quantity updated in cart`;
      } else {
        state.cart.push({ ...item, quantity: 1 });
        state.toast = `${item.name} added to cart`;
      }
    },
    removeFromCart: (state, action) => {
      const name = action.payload;
      const existingItem = state.cart.find(i => i.name === name);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cart = state.cart.filter(i => i.name !== name);
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    showToast: (state, action) => {
      state.toast = action.payload;
    },
    hideToast: (state) => {
      state.toast = null;
    },
    loadLocation: (state) => {
      const saved = localStorage.getItem('grocerease_location');
      if (saved) {
        const data = JSON.parse(saved);
        state.selectedLocation = data.address;
        state.selectedCoordinates = data.coordinates;
      }
    },
  },
});

export const { setLocation, addToCart, removeFromCart, clearCart, showToast, hideToast, loadLocation } = globalSlice.actions;

export default globalSlice.reducer;

/* ---------- 🔍 Selectors ---------- */
export const selectLocation = (state) => state.global.selectedLocation;
export const selectCoordinates = (state) => state.global.selectedCoordinates;
export const selectCart = (state) => state.global.cart;
export const selectCartCount = (state) => state.global.cart.reduce((sum, item) => sum + item.quantity, 0);
export const selectToast = (state) => state.global.toast;
