import { FC } from "react"

export interface FeaturesComponentProps {
	title: FC<TitleProps>
	description: FC<TitleProps>
	image: FC<TitleProps>
	isReverse?: boolean
	self?: React.ForwardedRef<HTMLDivElement>
}

export interface FeaturesProps {
	self?: React.ForwardedRef<HTMLDivElement>
}

export interface TitleProps extends FeaturesProps {}
export interface DescriptionProps extends FeaturesProps {}
export interface ImageProps extends FeaturesProps {}