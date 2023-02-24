export type TUniverse = {
	id: string;
	docId: string;
	title: string;
	sourceType: string;
	sourceLink: string;
	sourceUrlValue: string;
	contributer: TUniverseContributer | null;
	startTime: number;
	endTime: number;
}

export type TUniverseCategory = {
	id: number;
	docId: string | null;
	title: string | null;
	universes: number[];
}


export type TUniverseContributer = {
	id: string;
	name: string;
}


export type TWindowMenuItem = {
	name: string;
	icon: React.ReactNode;
	isOpen: boolean;
	data: any | null;
	hasNewContent: boolean;
}

export type TWindowMenuItemToggle = {
	name: string;
	isOpen: boolean;
}

export type TWindowMenuItemHasNewContent = {
	name: string;
	hasNewContent: boolean;
}