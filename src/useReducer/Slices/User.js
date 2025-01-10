import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Stores logged-in user details
  isLoggedIn: false, // Tracks login status
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Persist in localStorage
      localStorage.setItem('isLoggedIn', true);
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    },
    initializeUser: (state) => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (storedUser && loggedIn) {
        state.user = storedUser;
        state.isLoggedIn = true;
      }
    },
  },
});

export const { login, logout, initializeUser } = userSlice.actions;
export default userSlice.reducer;
