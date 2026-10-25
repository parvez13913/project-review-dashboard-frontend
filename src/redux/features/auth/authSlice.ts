"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: typeof window !== "undefined" ? localStorage?.getItem("token") : null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();

        document.cookie =
          "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=strict; secure";
        document.cookie =
          "tokenType=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=strict;";
        document.cookie =
          "userType=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=strict;";

        window.location.href = "/login";
      }
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;