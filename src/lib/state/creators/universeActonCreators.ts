import { Dispatch } from "redux";
import { UniverseActionTypes } from "../../../util/enums";
import { TUniverse, TUniverseCategory } from "../../../util/types";
import { universeAction } from "../actions";

export const setUniverse = (universe: TUniverse) => {
	return (dispatch: Dispatch<universeAction>) => {
		dispatch({
			type: UniverseActionTypes.SET_UNIVERSE,
			payload: universe,
		});
	}
}

export const setUniverseCategory = (category: TUniverseCategory) => {
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

export const setUniverseCategories = (categories: TUniverseCategory[]) => {
	return (dispatch: Dispatch<universeAction>) => {
		dispatch({
			type: UniverseActionTypes.SET_CATEGORIES,
			payload: categories,
		});
	}
}

export const setUniverseUniverses = (universes: TUniverse[]) => {
	return (dispatch: Dispatch<universeAction>) => {
		dispatch({
			type: UniverseActionTypes.SET_UNIVERSES,
			payload: universes,
		});
	}
}

export const setUniversePickedCategory = (pickedCategory: number) => {
	return (dispatch: Dispatch<universeAction>) => {
		dispatch({
			type: UniverseActionTypes.SET_PICKED_CATEGORY,
			value: pickedCategory,
		});
	}
}

export const setUniversePickedUniverse = (pickedUniverse: number) => {
	return (dispatch: Dispatch<universeAction>) => {
		dispatch({
			type: UniverseActionTypes.SET_PICKED_UNIVERSE,
			value: pickedUniverse,
		});
	}
}