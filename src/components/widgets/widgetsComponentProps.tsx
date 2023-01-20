export interface WidgetsContainerProps {
	title: string;
	minWidth?: number;
	children: React.ReactNode;
	defaultPosition?: { x: number; y: number };
}

export interface WidgetsBarProps {
	title: string;
	isMiminized: boolean;
	setIsMinimized: () => void;
}

export interface WidgetSettingsProps {
	openWidgetSettings: () => void;
}

export interface WidgetMinimizerProps {
	isMinimized: boolean;
	setIsMinimized: () => void;
}