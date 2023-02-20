export interface WidgetsState {
	widgets: Widget[];
	widgetHighestOrder: number;
}

export interface Widget {
	id: string;
	name: string;
	position: {
		x: number;
		y: number;
	}
	isMinimized: boolean;
	isActive: boolean;
	order?: number;
}