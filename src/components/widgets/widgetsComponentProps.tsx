import { FC } from "react";

export interface WidgetsContainerProps {
	title: string;
	statusText?: string;
	minWidth?: number;
	maxWidth?: number;
	children: React.ReactNode;
	defaultPosition?: { x: number; y: number };
	settings?: React.ReactNode;
	alwaysOpen?: boolean;
}

export interface WidgetsBarProps {
	title: string;
	statusText?: string;
	isMiminized: boolean;
	hasSettings: boolean;
	setIsMinimized: () => void;
	openSettings: () => void;
}

export interface WidgetSettingsProps {
	widgetId: string;
	settings: React.ReactNode;
	isFancyMinimized: boolean;
	onAnimationUpdate?: () => void;
}

export interface WidgetSettingsButtonProps {
	openWidgetSettings: () => void;
}

export interface WidgetMinimizerProps {
	isMinimized: boolean;
	setIsMinimized: () => void;
}

export interface WidgetContentComponentProps {
	widgetId: string;
	isFancyMinimized: boolean;
	isSettingsOpen: boolean;
	isMinimized: boolean;
	children: React.ReactNode;
	settings: React.ReactNode;
	onAnimationUpdate: () => void;
	isAlwaysOpen: boolean;
}