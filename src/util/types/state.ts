export type TUniverse = {
	id: string;
	docId: string;
	title: string;
	sourceType: string;
	sourceLink: string;
	sourceUrlValue: string;
	contributer: TUniverseContributer | null;
	category: TUniverseCategory | null;
}

export type TUniverseCategory = {
	id: string;
	docId: string;
	title: string;
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
}

export type TWindowMenuItemToggle = {
	name: string;
	isOpen: boolean;
}