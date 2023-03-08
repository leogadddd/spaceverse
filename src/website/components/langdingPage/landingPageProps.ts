import { Variants } from "framer-motion";

export interface LandingPageProps {
	scrollIntoView: () => void;
}

export interface ImageProps {
	src: string;
	alt: string;
	className?: string;
	variants?: Variants;
	style?: React.CSSProperties;
	isDraggable?: boolean;
	dragConstraints?: React.RefObject<HTMLElement>;
	dragElastic?: number;
	dragTransition?: {
		velocity: number;
	};
}

export interface LandingPageImageProps extends ImageProps {
	inView: boolean;
}