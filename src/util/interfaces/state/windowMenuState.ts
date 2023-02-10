export interface WindowMenuState {
	isOpen: boolean;
	menuItems: WindowMenuItemState[];
}

export interface WindowMenuItemState {
	name: string;
	icon: React.ReactNode;
	isOpen: boolean;
	data: any | null;
}