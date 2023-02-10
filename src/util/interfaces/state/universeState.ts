export interface UniverseState {
	docId: string | null;
	id: string | null;
	title: string | null;
	sourceType: string | null;
	sourceLink: string | null;
	sourceUrlValue: string | null;
	volume: number | 0;
	contributer: string | null; // TODO: Change to User
	category: UniverseCategoryState | string | null;
	isLoading: boolean | null;
	isMuted: boolean | null;
	isFavorite: boolean | null;
	startTime: number | null;
}

export interface UniverseCategoryState {
	docId: string | null;
	id: string | null;
	title: string | null;
}