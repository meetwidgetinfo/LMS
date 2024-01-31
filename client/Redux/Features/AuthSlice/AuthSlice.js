import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  token: JSON.parse(localStorage.getItem("token")) || "",
};

export const fetchUserData = createAsyncThunk("auth/fetchUserData", () => {
  return axios({
    method: "get",
    url: "http://localhost:8000/user/",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  }).then((res) => res?.data);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      // state.user = payload?.user;
      state.token = payload?.token;
      localStorage.setItem("token", JSON.stringify(payload?.token));
      // localStorage.setItem("user", JSON.stringify(payload?.user));
    },
    logout: (state) => {
      state.token = "";
      localStorage.clear();
    },
    userUpdate: (state, { payload }) => {
      console.log("payload:", payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export default authSlice.reducer;
export const { login, logout, userUpdate } = authSlice.actions;
