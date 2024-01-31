import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/AuthSlice/AuthSlice";
import leaveReducer from "../Features/LeaveSlice/LeaveSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    leaveReducer,
  },
});
