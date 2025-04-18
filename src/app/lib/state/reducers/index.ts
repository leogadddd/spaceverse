import { combineReducers } from "redux";
import universeReducer from "./universeReducer";
import windowMenuReducer from "./windowMenuReducer";
import settingsReducer from "./settingsReducer";
import pomodoroReducer from "./pomodoroReducer";
import widgetsReducer from "./widgetsReducer";
import notificationReducer from "./notificiationReducer";
import systemSettingsReducer from "./systemSettings";

export const reducers = combineReducers({
	universe: universeReducer,
	windowMenu: windowMenuReducer,
	settings: settingsReducer,
	pomodoro: pomodoroReducer,
	widgets: widgetsReducer,
	notification: notificationReducer,
	systemSettings: systemSettingsReducer,
});

export default reducers;