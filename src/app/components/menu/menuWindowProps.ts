export interface menuWindowContainerProps {
	children: React.ReactNode;
	title: string;
	minWidth: number;
	maxWidth?: number;
	minHeight?: number;
	maxHeight?: number;
	isDefaultOpen?: boolean;
	hasNewContent?: number;
}

export interface menuWindowBarProps {
	title: string;
	onClose: () => void;
}

export interface MenuListItemState {
	name: string,
	hasNewContent: number,
}

export interface MenuListItemLinkProps {
	href: string;
	name: string;
}