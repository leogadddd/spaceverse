import { motion, useAnimation } from "framer-motion";
import { FC, useEffect } from "react";
import { useInView } from 'react-hook-inview'
import DividerComponent from "../../../app/components/divider";
import { LandingPageImageProps } from "../langdingPage/landingPageProps";
import { FeaturesComponentProps } from "./featuresComponentProps";

export const FeaturesComponent: FC<FeaturesComponentProps> = (props) => {

	const { title: TitleComponent, description: DescriptionComponent, image: ImageComponent, isReverse, self } = props;

	return (
		<div className="corners">
			<div ref={self} className={`py-16 lg:py-40 lg:h-2/3 overflow-visible flex flex-col-reverse ${isReverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-4 lg:gap-8 px-4 lg:px-40 overflow-hidden`}>
				<div className={`flex-1 flex flex-col gap-4 items-center ${isReverse ? "lg:items-start" : "lg:items-end"}`}>
					<TitleComponent />
					<DescriptionComponent />
				</div>
				<div className="flex-1 flex flex-col items-center">
					<ImageComponent />
				</div>
			</div>
		</div>
	)
}

export const FeatureImage: FC<LandingPageImageProps> = (props) => {

	const controls = useAnimation()
	const { src, alt, className, variants, inView } = props

	const handleLoad = () => {
		controls.start('animate')
	}

	useEffect(() => {
		if (inView) {
			handleLoad()
		} else {
			controls.start('initial')
		}
	}, [inView])

	return (
		<motion.img
			variants={variants}
			initial="initial"
			animate={controls}
			src={src}
			alt={alt}
			className={`rounded-[16px] shadow-lg cursor-pointer ${className}`}
			drag
			dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
			dragSnapToOrigin={true}
			dragElastic={0.5}
		/>
	)
}