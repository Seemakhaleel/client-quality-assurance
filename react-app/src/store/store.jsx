import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authentication from "./auth";

const reducer = combineReducers({
  authentication, //we put all our reducers here
});
const store = configureStore({
  reducer,
});
export default store;
