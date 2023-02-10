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