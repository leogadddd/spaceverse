export interface UniverseState {
	docId: string | null;
	id: string | null;
	title: string | null;
	sourceType: string | null;
	sourceUrl: string | null;
	sourceUrlValue: string | null;
	volume: number | 0;
	contributer: string | null; // TODO: Change to User
	isLoading: boolean | null;
	isMuted: boolean | null;
	isFavorite: boolean | null;

}