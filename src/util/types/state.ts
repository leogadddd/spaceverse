export type TUniverse = {
	id: string;
	docId: string;
	title: string;
	sourceType: string;
	sourceUrl: string;
	sourceUrlValue: string;
	contributer: TUniverseContributer;
}


export type TUniverseContributer = {
	id: string;
	name: string;
}