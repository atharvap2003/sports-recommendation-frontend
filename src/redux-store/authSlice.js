import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  token: null,
  user_type: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      const { email, token, user_type } = action.payload;

      console.log("Payload in Reducer:", action.payload);

      state.email = email;
      state.token = token;
      state.user_type = user_type;
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
