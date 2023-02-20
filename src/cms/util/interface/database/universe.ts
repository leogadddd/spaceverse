export interface Universe {
	docId: string;
	id: number;
	title: string;
	category: string;
	sourceType: string;
	sourceLink: string;
	sourceUrlValue: string;
	startTime: number;
	endTime: number | null;
	createTime: number;
	updateTime: number;
	contributer: string;
}

export interface createUniverseProps {
	title: string;
	category: string;
	sourceLink: string;
	startTime: number;
	endTime: number | null;
	contributer: string;
}