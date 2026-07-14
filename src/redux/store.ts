import { configureStore } from "@reduxjs/toolkit";
import pollReducer from "./pollSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    poll: pollReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch =
  typeof store.dispatch;