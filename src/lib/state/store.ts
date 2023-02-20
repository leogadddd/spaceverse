import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { settingsMiddleware, widgetsMiddleware } from "./middlewares";

export const store = configureStore({
	reducer: reducers,
	middleware: [thunk, widgetsMiddleware, settingsMiddleware],
	devTools: process.env.NODE_ENV !== "production",
})

export default store;