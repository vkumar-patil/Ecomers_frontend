import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/User";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
export default store;
