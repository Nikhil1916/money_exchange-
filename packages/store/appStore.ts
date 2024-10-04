import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import configSlice from "./configSlice";
const appStore = configureStore({
  reducer: {
    config: configSlice
  },
});

export default appStore;
