import { FC } from "react"
import { IconType } from "react-icons/lib"

export interface FeaturesComponentProps {
	title: FC<TitleProps>
	description: FC<TitleProps>
	image: FC<TitleProps>
	isReverse?: boolean
	self?: React.ForwardedRef<HTMLDivElement>
	backgroundIcon?: IconType
}

export interface FeaturesProps {
	self?: React.ForwardedRef<HTMLDivElement>
}

export interface TitleProps extends FeaturesProps {}
export interface DescriptionProps extends FeaturesProps {}
export interface ImageProps extends FeaturesProps {}