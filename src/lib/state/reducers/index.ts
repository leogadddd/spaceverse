import { combineReducers } from "redux";
import universeReducer from "./universeReducer";
import windowMenuReducer from "./windowMenuReducer";
import settingsReducer from "./settingsReducer";
import pomodoroReducer from "./pomodoroReducer";

export const reducers = combineReducers({
	universe: universeReducer,
	windowMenu: windowMenuReducer,
	settings: settingsReducer,
	pomodoro: pomodoroReducer
});

export default reducers;