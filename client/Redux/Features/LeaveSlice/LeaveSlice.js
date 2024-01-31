import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  leaves: [],
  error: "",
};

export const fetchLeaves = createAsyncThunk("leave/fetchLeaves", () => {
  return axios({
    method: "get",
    url: "http://localhost:8000/leaves/getbyuser",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  }).then((res) => {
    return res;
  });
});

export const deleteLeaves = createAsyncThunk(
  "leave/deleteLeaves",
  ({ id, index }) => {
    return axios({
      method: "delete",
      url: `http://localhost:8000/leaves/delete/${id}`,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }).then((res) => index);
  }
);

const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {
    createLeave: (state, { payload }) => {
      state.leaves.push(payload.data);
    },
    updateLeave: (state, { payload }) => {
      console.log("🚀 ~ payload:", payload);
      state.leaves.splice(payload?.index, 1, payload?.status);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.fulfilled, (state, { payload }) => {
        state.leaves = payload.data;
      })
      .addCase(fetchLeaves.rejected, (state) => {
        state.error = "internal server error";
      })
      .addCase(deleteLeaves.fulfilled, (state, { payload }) => {
        const indexToDelete = payload;
        state.leaves = state.leaves.filter((_, i) => i !== indexToDelete);
      });
  },
});

export default leaveSlice.reducer;
export const { createLeave, updateLeave } = leaveSlice.actions;
