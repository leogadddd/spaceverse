import { TUniverseCategory } from "../../../../util/types";

export type UniverseVolumeButtonProps = {
	volume: number;
	isMuted: boolean;
	onToggleMute: () => void;
}

export type UniverseShareButtonProps = {
	onShare: () => void;
}

export type UniverseFavoriteButtonProps = {
	isFavorite: boolean;
	onToggleFavorite: () => void;
}

export interface UniversePickerProps {
	NextUniverse: () => void;
	PreviousUniverse: () => void;
}

export interface UniverseCategoryPickerProps {
	PickCategory: (category: number) => void;
	categories: TUniverseCategory[];
}