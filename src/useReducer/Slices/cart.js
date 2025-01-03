import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const price = parseFloat(item.price) || 0;
      const quantity = item.quantity || 1; // Default to 1 if quantity is 0 or not provided
      state.items.push(item);
      state.totalPrice += price * quantity;
      if (isNaN(state.totalPrice)) state.totalPrice = 0;
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const removedItem = state.items.find((item) => item._id === id); // Match by _id
      if (removedItem) {
        const price = parseFloat(removedItem.price) || 0;
        const quantity = removedItem.quantity || 1;
        state.items = state.items.filter((item) => item._id !== id); // Remove item by _id
        state.totalPrice -= price * quantity;
        if (isNaN(state.totalPrice)) state.totalPrice = 0;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
