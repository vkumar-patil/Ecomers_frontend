import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slices/cart";

const store = configureStore({
  reducer: {
    Cart: cartSlice,
  },
});
export default store;
