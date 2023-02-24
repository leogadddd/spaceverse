export interface menuWindowContainerProps {
	children: React.ReactNode;
	title: string;
	minWidth: number;
	maxWidth?: number;
	minHeight?: number;
	maxHeight?: number;
	isDefaultOpen?: boolean;
	hasNewContent?: boolean;
}

export interface menuWindowBarProps {
	title: string;
	onClose: () => void;
}

export interface MenuListItemState {
	name: string,
	hasNewContent: boolean,
}