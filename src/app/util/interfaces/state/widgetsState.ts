import { IconType } from "react-icons/lib";

export interface WidgetsState {
	widgets: Widget[];
	widgetHighestOrder: number;
	WindowSizes: {
		width: number;
		height: number;
	}
}

export interface Widget {
	id: string;
	name: string;
	label: string;
	position: {
		x: number;
		y: number;
	}
	size: {
		width: number;
		height: number;
	}
	isMinimized: boolean;
	isActive: boolean;
	order?: number;
	icon?: IconType;
	iconSize?: number;
}

export interface WidgetContextState extends Widget {
	positionPercent: {
		x: number;
		y: number;
	}
}