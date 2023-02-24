import { TUniverse, TUniverseCategory } from "../../types";

export interface UniverseState {
	docId: string | null;
	id: string | null;
	title: string | null;
	sourceType: string | null;
	sourceLink: string | null;
	sourceUrlValue: string | null;
	volume: number | 0;
	contributer: string | null; // TODO: Change to User
	isLoading: boolean | null;
	isMuted: boolean | null;
	isFavorite: boolean | null;
	startTime: number | null;
	endTime: number | null;
	manager: {
		categories: TUniverseCategory[];
		universes: TUniverse[];
		pickedCategory: TUniverseCategory | null;
		pickedUniverse: TUniverse | null;
		categoryIndex: number;
		universeIndex: number;
		settings: {
			autoNext: boolean;
		}
	}
}

export interface UniverseCategoryState {
	docId: string | null;
	id: string | null;
	title: string | null;
}