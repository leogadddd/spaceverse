export enum NavigationLocation {
	Default,
	Top,
	Bottom
}

export interface NavigationBarLayoutProps {
	location: NavigationLocation;
	children: React.ReactNode;
}

export interface MenuListProps {
	onUnfocus: () => void;
}