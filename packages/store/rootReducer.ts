import { combineReducers } from '@reduxjs/toolkit';
import balanceReducer from "./balanceSlice";
import configReducer, { resetState } from "./configSlice";
const appReducer = combineReducers({
    balance: balanceReducer,
    config: configReducer
});
const rootReducer = (state:any, action:any) => {
  if (action.type === resetState.type) {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;