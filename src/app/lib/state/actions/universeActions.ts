import { UniverseActionTypes } from "../../../util/enums";
import { TUniverse, TUniverseCategory } from "../../../util/types";

interface universeActionSetUniverse {
	type: UniverseActionTypes.SET_UNIVERSE;
	payload: TUniverse;
}

interface universeActionSetCategory {
	type: UniverseActionTypes.SET_CATEGORY;
	payload: TUniverseCategory;
}

interface universeActionSetVolume {
	type: UniverseActionTypes.SET_VOLUME;
	value: number;
}

interface universeActionSetBoolean {
	type: UniverseActionTypes.SET_MUTE | UniverseActionTypes.SET_LOADING | UniverseActionTypes.SET_FAVORITE;
	value: boolean;
}

interface universeActionSetCategories {
	type: UniverseActionTypes.SET_CATEGORIES;
	payload: TUniverseCategory[];
}

interface universeActionSetUniverses {
	type: UniverseActionTypes.SET_UNIVERSES;
	payload: TUniverse[];
}

interface universeActionSetPickedCategory {
	type: UniverseActionTypes.SET_PICKED_CATEGORY;
	value: number;
}

interface universeActionSetPickedUniverse {
	type: UniverseActionTypes.SET_PICKED_UNIVERSE;
	value: number;
}

interface universeActionSetManagerSettings {
	type: UniverseActionTypes.SET_AUTO_NEXT;
	value: boolean;
}


export type universeAction = universeActionSetManagerSettings | universeActionSetUniverse | universeActionSetCategory | universeActionSetVolume | universeActionSetBoolean | universeActionSetCategories | universeActionSetUniverses | universeActionSetPickedCategory | universeActionSetPickedUniverse;