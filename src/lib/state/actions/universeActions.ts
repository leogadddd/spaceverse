import { UniverseActionTypes } from "../../../util/enums";
import { TUniverse } from "../../../util/types";

interface universeActionSetUniverse {
	type: UniverseActionTypes.SET_UNIVERSE;
	payload: TUniverse;
}

interface universeActionSetCategory {
	type: UniverseActionTypes.SET_CATEGORY;
	payload: TUniverse["category"];
}

interface universeActionSetVolume {
	type: UniverseActionTypes.SET_VOLUME;
	value: number;
}

interface universeActionSetBoolean {
	type: UniverseActionTypes.SET_MUTE | UniverseActionTypes.SET_LOADING | UniverseActionTypes.SET_FAVORITE;
	value: boolean;
}

export type universeAction = universeActionSetUniverse | universeActionSetCategory | universeActionSetVolume | universeActionSetBoolean;