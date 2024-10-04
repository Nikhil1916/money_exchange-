import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
const appStore = configureStore({
  reducer: {
    reducer: rootReducer
  },
});

export default appStore;
