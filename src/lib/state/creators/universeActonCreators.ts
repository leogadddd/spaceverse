import { Dispatch } from "redux";
import { UniverseActionTypes } from "../../../util/enums";
import { TUniverse } from "../../../util/types";
import { universeAction } from "../actions";

export const setUniverse = (universe: TUniverse) => {
	return (dispatch: Dispatch<universeAction>) => {
		dispatch({
			type: UniverseActionTypes.SET_UNIVERSE,
			payload: universe,
		});
	}
}

export const setUniverseCategory = (category: TUniverse["category"]) => {
	return (dispatch: Dispatch<universeAction>) => {
		dispatch({
			type: UniverseActionTypes.SET_CATEGORY,
			payload: category,
		});
	}
}

export const setUniverseVolume = (volume: number) => {
	return (dispatch: Dispatch<universeAction>) => {
		dispatch({
			type: UniverseActionTypes.SET_VOLUME,
			value: volume,
		});
	}
}

export const setUniverseLoading = (loading: boolean) => {
	return (dispatch: Dispatch<universeAction>) => {
		dispatch({
			type: UniverseActionTypes.SET_LOADING,
			value: loading,
		});
	}
}

export const setUniverseMute = (mute: boolean) => {
	return (dispatch: Dispatch<universeAction>) => {
		dispatch({
			type: UniverseActionTypes.SET_MUTE,
			value: mute,
		});
	}
}

export const setUniverseFavorite = (favorite: boolean) => {
	return (dispatch: Dispatch<universeAction>) => {
		dispatch({
			type: UniverseActionTypes.SET_FAVORITE,
			value: favorite,
		});
	}
}