export type UniverseType = {
	name: string;
	link: string;
	value: string;
	id: string;
}

export interface UniverseProps {
	isLoading?: boolean | null;
}

export interface UniverseComponentProps {
	universe?: UniverseType;
}

export interface UniversePlayerProps {
	universe?: UniverseType;
}

export interface UniverseLoadingProps {
	isByPass?: boolean;
}