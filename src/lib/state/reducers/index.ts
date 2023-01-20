import { combineReducers } from "redux";
import universeReducer from "./universeReducer";

export const reducers = combineReducers({
	universe: universeReducer,
});

export default reducers;