import { motion, useAnimation } from "framer-motion"
import { FC, useEffect } from "react"
import { Image } from "../../langdingPage"
import { FeatureImage, FeaturesComponent } from "../featuresComponent"
import { DescriptionProps, ImageProps, TitleProps } from "../featuresComponentProps"
import { LandingPageImageProps } from "../../langdingPage/landingPageProps"
import { useInView } from "react-hook-inview"
import { CgLoadbarSound } from "react-icons/cg"

export const CustomizableWidgetsFeature = () => {

	return (
		<FeaturesComponent
			title={TitleComponent}
			description={DescriptionComponent}
			image={ImageComponent}
			backgroundIcon={CgLoadbarSound}
			isReverse
		/>
	)
}

const ImageComponent: FC<TitleProps> = (props) => {

	const [ref, inView] = useInView({
		threshold: 0.5,
	})

	const duration = .5
	const delay = .1
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
		}
	}

	const rightToLeftAnimation = {
		initial: {
			x: +offset, opacity: 0,
			transition: {
				duration: duration,
				delay: delay,
				ease: "easeInOut",
			}
		},
		animate: {
			x: 0, opacity: 1,
			transition: {
				duration: duration,
				delay: delay,
				ease: "easeInOut",
			}
		}
	}

	const leftToRightAnimation2 = {
		initial: {
			x: -offset, opacity: 0,
			transition: {
				duration: duration,
				delay: delay * 2,
				ease: "easeInOut",
			}
		},
		animate: {
			x: 0, opacity: 1,
			transition: {
				duration: duration,
				delay: delay * 2,
				ease: "easeInOut",
			}
		}
	}

	return (
		<div ref={ref} className="relative flex justify-center pt-8 lg:pt-0 pb-16 max-w-[400px] min-w-[300px] sm:min-w-[400px] h-[275px] sm:h-[350px]">
			<FeatureImage
				variants={leftToRightAnimation}
				inView={inView}
				src="https://firebasestorage.googleapis.com/v0/b/spaceverse-re.appspot.com/o/v0%2Fwebsite%2FClockWidget.webp?alt=media&token=c31c4c21-5ac4-43ce-8e02-8aa18286f4bb"
				alt="clockWidget"
				className="absolute left-3 sm:left-14 lg:left-16 w-[166px] sm:w-[186px] lg:w-[206px] shadow-none"
			/>
			<FeatureImage
				variants={rightToLeftAnimation}
				inView={inView}
				src="https://firebasestorage.googleapis.com/v0/b/spaceverse-re.appspot.com/o/v0%2Fwebsite%2FMusicWidget.webp?alt=media&token=b2fc1537-7108-41bd-b3d2-05abeb44eadf"
				alt="musicWidget"
				className="absolute right-4 sm:right-10 top-[75px] w-[159px] sm:w-[199px] lg:w-[219px] shadow-none"
			/>
			<FeatureImage
				variants={leftToRightAnimation2}
				inView={inView}
				src="https://firebasestorage.googleapis.com/v0/b/spaceverse-re.appspot.com/o/v0%2Fwebsite%2FTimerWidget.webp?alt=media&token=ce0bfa55-3972-44c0-b948-36b534c25b96"
				alt="universe"
				className="absolute left-10 bottom-4 sm:bottom-2 lg:bottom-8 w-[163px] sm:w-[193px] lg:w-[213px] shadow-none"
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
			<h1 className="font-bold text-4xl sm:text-5xl text-white text-center lg:text-left font-barlow-condensed tracking-wider">
				Customizable Widgets
				<br />To Boost Your
				<br />Productivity
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
			<p className="text-white text-center lg:text-left tracking-wider text-sm sm:text-base w-[300px] lg:w-[400px]">
			Customize your workspace with our easy-to-use widgets, including a Pomodoro timer to improve your time management skills, and a Spotify widget to keep you motivated with your favorite tunes. You can move the widgets around your screen, making them easily accessible whenever you need them.
			</p>
		</motion.div>

	)
}