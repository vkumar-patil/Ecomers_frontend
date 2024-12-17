import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    Items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.Items.push(action.payload);
    },
    removefromcart: (state, action) => {
      state.Items = state.Items.find((item) => item.id !== action.payload);
    },
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
