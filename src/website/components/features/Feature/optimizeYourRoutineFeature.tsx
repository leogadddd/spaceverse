import { motion, useAnimation } from "framer-motion"
import { FC, useEffect } from "react"
import { Image } from "../../langdingPage"
import { FeatureImage, FeaturesComponent } from "../featuresComponent"
import { DescriptionProps, ImageProps, TitleProps } from "../featuresComponentProps"
import { LandingPageImageProps } from "../../langdingPage/landingPageProps"
import { useInView } from "react-hook-inview"

export const OptimizeYourRoutineFeature = () => {

	return (
		<FeaturesComponent
			title={TitleComponent}
			description={DescriptionComponent}
			image={ImageComponent}
		/>
	)
}

const ImageComponent: FC<TitleProps> = (props) => {

	const [ref, inView] = useInView({
		threshold: 0.5,
	})

	const duration = .5

	const opacityAnimation = {
		initial: {
			opacity: 0,
			scale: 0.9,
			transition: {
				duration: duration,
				ease: "easeInOut",
			}
		},
		animate: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: duration,
				ease: "easeInOut",
			}
		}
	}

	return (
		<div ref={ref} className="relative flex justify-center pt-8 lg:pt-0 pb-16 max-w-[400px] min-w-[300px] sm:min-w-[400px] lg:min-w-[500px] h-[250px]">
			<FeatureImage
				variants={opacityAnimation}
				inView={inView}
				src="https://firebasestorage.googleapis.com/v0/b/spaceverse-re.appspot.com/o/v0%2Fwebsite%2FTimerWidget.webp?alt=media&token=ce0bfa55-3972-44c0-b948-36b534c25b96"
				alt="TimerWidget"
				className="absolute w-[336px] sm:w-[356px] lg:w-[396px] shadow-none"
			/>
		</div>
	)
}



const TitleComponent: FC<DescriptionProps> = (props) => {

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
				Optimize Your
				<br />Study/Work Routine
			</h1>
		</motion.div>
	)
}

const DescriptionComponent: FC<ImageProps> = (props) => {

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
			animate={inView ? "animate" : "initial"}
			ref={ref}
		>
			<p className="text-white text-center lg:text-right tracking-wider text-sm sm:text-base w-[300px] lg:w-[400px]">
			Set the length of your study or work sessions, add breaks, and customize the settings to suit your individual needs. This feature can help you optimize your routine for maximum productivity.
			</p>
		</motion.div>

	)
}