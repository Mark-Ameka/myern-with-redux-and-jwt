import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import bookSlice from "./slices/bookSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    book: bookSlice,
  },
});
