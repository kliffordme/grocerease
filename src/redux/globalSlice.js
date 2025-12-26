import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedLocation: null,
  cart: [], 
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find(i => i.name === item.name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
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
  },
});

export const { setLocation, addToCart, removeFromCart, clearCart } = globalSlice.actions;

export default globalSlice.reducer;

/* ---------- 🔍 Selectors ---------- */
export const selectLocation = (state) => state.global.selectedLocation;
export const selectCart = (state) => state.global.cart;
export const selectCartCount = (state) => state.global.cart.reduce((sum, item) => sum + item.quantity, 0);
