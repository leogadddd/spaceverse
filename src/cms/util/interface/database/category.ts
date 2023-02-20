export interface Category {
	id: number
	docId: string
	title: string
	createTime?: number
	updateTime?: number
	universes: number[]
	universesLen?: number
}

export interface createCategory {
	id: number
	title: string
	createTime: number
	updateTime: number
	universes: number[]
	universesLen: number
}
