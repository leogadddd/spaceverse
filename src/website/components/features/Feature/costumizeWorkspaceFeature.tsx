import { motion, useAnimation } from "framer-motion"
import { FC, useEffect } from "react"
import { Image } from "../../langdingPage"
import { FeatureImage, FeaturesComponent } from "../featuresComponent"
import { DescriptionProps, FeaturesProps, ImageProps, TitleProps } from "../featuresComponentProps"
import { LandingPageImageProps } from "../../langdingPage/landingPageProps"
import { useInView } from "react-hook-inview"

export const CustomizeWorkspaceFeature: FC<FeaturesProps> = (props) => {

	const { self } = props

	return (
		<FeaturesComponent
			title={TitleComponent}
			description={DescriptionComponent}
			image={ImageComponent}
			self={self}
		/>
	)
}

export const ImageComponent: FC<TitleProps> = (props) => {

	const [ref, inView] = useInView({
		threshold: 0.5,
	})

	const duration = .5
	const offset = 150

	const leftToRightAnimation = {
		initial: {
			x: -offset, opacity: 0,
			transition: {
				duration: duration,
				ease: "easeInOut",
			}
		},
		animate: {
			x: 0, opacity: 1,
			transition: {
				duration: duration,
				ease: "easeInOut",
			}
		},
	}

	const rightToLeftAnimation = {
		initial: {
			x: +offset, opacity: 0,
			transition: {
				duration: duration,
				ease: "easeInOut",
			}
		},
		animate: {
			x: 0, opacity: 1,
			transition: {
				duration: duration,
				ease: "easeInOut",
			}
		},
	}

	return (
		<div ref={ref} className="relative flex justify-center pt-8 lg:pt-4 pb-16 max-w-[400px] min-w-[300px] h-[250px] sm:min-w-[400px] lg:min-w-[400px]">
			<FeatureImage
				variants={leftToRightAnimation}
				inView={inView}
				src="https://firebasestorage.googleapis.com/v0/b/spaceverse-re.appspot.com/o/v0%2Fwebsite%2Fmountain-7821542.webp?alt=media&token=1e2699ed-6603-4fc4-9123-50d5e07a201e"
				alt="mountain"
				className="absolute -left-2 sm:left-0 w-[286px] lg:w-[336px] xl:w-[396px]"
			/>
			<FeatureImage
				variants={rightToLeftAnimation}
				inView={inView}
				src="https://firebasestorage.googleapis.com/v0/b/spaceverse-re.appspot.com/o/v0%2Fwebsite%2FUniverseWidget.webp?alt=media&token=04f9c076-ff02-47ab-a54f-31e5783e77cb"
				alt="universe"
				className="absolute -right-3 sm:right-0 xl:-right-8 -bottom-2 lg:-bottom-6 xl:-bottom-20 w-[213px] xl:w-[243px] shadow-none"
			/>
		</div>
	)
}



export const TitleComponent: FC<DescriptionProps> = (props) => {

	const [ref, inView] = useInView({
		threshold: 1,
	})

	const duration = .5
	const delay = .1

	const variants = {
		initial: {
			opacity: 0,
			transition: {
				duration: duration,
				ease: "easeInOut",
			}
		},
		animate: {
			opacity: 1,
			transition: {
				duration: duration,
				ease: "easeInOut",
				delay: delay,
			}
		}
	}

	return (
		<motion.div
			variants={variants}
			initial="initial"
			animate={inView ? "animate" : "initial"}
			ref={ref}
		>
			<h1 className="font-bold text-4xl sm:text-5xl text-white text-center lg:text-right font-barlow-condensed tracking-wider">
				Customize Your<br />Workspace
			</h1>
		</motion.div>
	)
}

export const DescriptionComponent: FC<ImageProps> = (props) => {

	const [ref, inView] = useInView({
		threshold: 1,
	})

	const duration = .5
	const delay = .2

	const variants = {
		initial: {
			opacity: 0,
			transition: {
				duration: duration,
				ease: "easeInOut",
			}
		},
		animate: {
			opacity: 0.75,
			transition: {
				duration: duration,
				ease: "easeInOut",
				delay: delay,
			}
		}
	}

	return (
		<motion.div
			variants={variants}
			initial="initial"
			animate={inView ? "animate" : "exit"}
			ref={ref}
		>
			<p className="text-white text-center lg:text-right tracking-wider text-sm sm:text-base w-[300px] lg:w-[400px]">
				Customize your workspace with our personalized background feature. Choose from a variety of themes and backgrounds to create a personalized environment that suits your style and preferences.
			</p>
		</motion.div>

	)
}