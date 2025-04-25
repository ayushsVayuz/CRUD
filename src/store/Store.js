import { configureStore  } from "@reduxjs/toolkit";
import userReducer from "../slice/UserSlice";

// Create and configure the Redux store
export const store = configureStore({
  reducer : {
    user: userReducer
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
})


export default store
