import { FC } from "react";
import { IconType } from "react-icons/lib";

export interface WidgetsContainerProps {
	title: string;
	label: string;
	statusText?: string;
	minWidth?: number;
	maxWidth?: number;
	children: React.ReactNode;
	defaultPosition?: { x: number; y: number };
	defaultActive?: boolean;
	settings?: FC<WidgetSettingsTemplateProps>;
	alwaysOpen?: boolean;
	icon?: IconType;
	iconSize?: number;
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
	settings: FC<WidgetSettingsTemplateProps>;
	isFancyMinimized: boolean;
	isSettingsSaveButtonDisabled: boolean;
	onAnimationUpdate?: () => void;
	onSettingsSave: () => void;
	setSettingsSaveButtonDisabled: (disabled: boolean) => void;
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
	isSettingsSaveButtonDisabled: boolean;
	isMinimized: boolean;
	children: React.ReactNode;
	settings: FC<WidgetSettingsTemplateProps>;
	isAlwaysOpen: boolean;
	onAnimationUpdate: () => void;
	onSettingsSave: () => void;
	setSettingsSaveButtonDisabled: (disabled: boolean) => void;
}

export interface WidgetSettingsTemplateProps {
	widgetId: string;
	settingsSave: () => void;
	settingsSaveDisabled: boolean;
	setSettingsSaveDisabled: (disabled: boolean) => void;
}