import { Category } from "../../../../util";

export interface createCategoryProps {
	title: string
}

export interface CategoryListProps {
	data: Category[] | null
}

export interface CategoryListItemProps {
	item: Category
	key: string
}

export interface CategoryListPanelProps {
	categories: Category[] | null
	onCategoryFormOpen: () => void
}

export interface CategoryListControlsProps {
	onCategoryFormOpen: () => void
}

export interface CategoryFormAddProps {
	onCategoryFormClose: () => void
	onCategoryFormSubmit: (title: string) => void
}

export interface CategoryFormAddControlsProps {
	onCategoryFormClose: () => void
	onCategoryFormSubmit: () => void
}

export interface CategoryFormAddInputsProps {
	onCategoryFormTitleChange: (title: string) => void
	title: string
}
