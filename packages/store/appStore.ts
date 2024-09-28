import { configureStore } from "@reduxjs/toolkit";
import balanceSlice from "./balanceSlice";
const appStore = configureStore({
  reducer: {
    balance: balanceSlice,
  },
});

export default appStore;
