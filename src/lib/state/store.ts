import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { middlewares } from "./middlewares";

export const store = configureStore({
	reducer: reducers,
	middleware: [thunk, ...middlewares],
	devTools: process.env.NODE_ENV !== "production",
})

export default store;