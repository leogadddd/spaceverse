import { motion, useAnimation } from "framer-motion";
import { FC, useRef } from "react"
import { useNavigate } from "react-router";
import DividerComponent from "../../../app/components/divider";
import { WidthLayout } from "../layouts/widthLayout"
import { ImageProps, LandingPageProps } from "./landingPageProps"
import { MdOutlinePanoramaPhotosphere } from "react-icons/md"

export const LandingPage: FC<LandingPageProps> = (props) => {

	const { scrollIntoView } = props;

	const navigate = useNavigate();

	const handleOpenApp = () => {
		console.log('open app')
		navigate('/universe')
	}

	return (
		<div className="relative">
			<WidthLayout>
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]">
					<MdOutlinePanoramaPhotosphere size={1000} />
				</div>
				<div className="pt-16 pb-36 lg:pt-0 lg:pb-36 lg:h-[calc(100vh-5rem)] flex flex-col justify-center ">
					<div className="px-4 lg:px-16 flex flex-col lg:flex-row gap-4 sm:gap-8 items-center lg:justify-between">
						<div className="flex flex-col gap-6 flex-1">
							<h1 className="font-bold text-4xl sm:text-6xl lg:text-5xl xl:text-7xl text-white text-center lg:text-left font-barlow-condensed tracking-wider">
								Work in your <span className="text-sv-accent font-barlow-condensed">universe</span>, <br />your way
							</h1>
							<p className="text-white text-center lg:text-left tracking-wider text-sm sm:text-base xl:text-lg px-4 sm:px-36 lg:px-0 lg:w-[500px]">
								Embrace a more productive workday by creating a universe that inspires and empowers you
							</p>
							<div className="flex flex-col items-center lg:items-start gap-6 lg:justify-start py-4 sm:pt-8 lg:pt-16">
								<a
									href="/universe"
									target="_blank"
									className="text-sv-black text-lg font-semibold pointer-events-auto w-max bg-sv-accent brightness-95 hover:brightness-110 transition-all p-8 py-3 rounded-[16px]"
								>
									Open In The Browser
								</a>

								<button
									onClick={scrollIntoView}
									className="text-sv-white text-lg font-semibold pointer-events-auto ring-2 ring-sv-white w-max p-8 py-3 rounded-[16px] opacity-50 hover:opacity-100 transition-opacity"
								>
									Learn More
								</button>
							</div>
						</div>
						<LandingPageImage />
					</div>
				</div>
			</WidthLayout>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 0.75 }}
				transition={{ duration: 1 }}
			>
				<DividerComponent />
			</motion.div>
		</div>
	)
}

export const LandingPageImage = () => {

	const ref = useRef<HTMLDivElement>(null);
	const duration = .7

	const opacityAnimation = {
		initial: {
			opacity: 0,
			scale: 0.9,
			transition: {
				duration: duration,
			}
		},
		animate: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: duration,

			}
		}
	}

	const leftToRightAnimation = {
		initial: {
			x: +50, opacity: 0,
			transition: {
				duration: duration,
			}
		},
		animate: {
			x: 0, opacity: 1,
			transition: {
				duration: duration,
			}
		}
	}

	const rightToLeftAnimation = {
		initial: {
			x: -50, opacity: 0,
			transition: {
				duration: 1,
			}
		},
		animate: {
			x: 0, opacity: 1,
			transition: {
				duration: 1,
			}
		}
	}

	return (
		<div ref={ref} className="relative flex justify-center pt-8 pb-16 max-w-[400px] min-w-[300px] sm:min-w-[600px] lg:min-w-[400px] xl:min-w-[440px]">
			<Image
				variants={opacityAnimation}
				src="https://firebasestorage.googleapis.com/v0/b/spaceverse-re.appspot.com/o/v0%2Fwebsite%2Ficeland-g179c28a1d_1920.webp?alt=media&token=3a6eeeda-080b-4475-955f-1bbbec67df1e"
				className="w-[300px] sm:w-[500px]"
				alt=""
			/>
			<Image
				variants={leftToRightAnimation}
				src="https://firebasestorage.googleapis.com/v0/b/spaceverse-re.appspot.com/o/v0%2Fwebsite%2FMenuButton.webp?alt=media&token=ae5e8124-d6ee-4e5a-863c-ffab834e1789"
				className="absolute top-0 right-2 sm:right-20 lg:right-4 w-[73px] sm:w-[93px] lg:w-[83px] shadow-none"
				alt=""
			/>
			<Image
				variants={rightToLeftAnimation}
				src="https://firebasestorage.googleapis.com/v0/b/spaceverse-re.appspot.com/o/v0%2Fwebsite%2Ftoolbar.webp?alt=media&token=73df74cb-5bca-4c32-aead-9f35452ef65d"
				className="absolute top-16 sm:top-36 lg:top-24 -left-6 sm:left-8 lg:-left-4 w-[137px] sm:w-[177px] lg:w-[157px] shadow-none"
				alt=""
			/>
		</div>
	)
}

export const Image: FC<ImageProps> = (props) => {

	const controls = useAnimation()
	const { src, alt, className, variants } = props

	const handleLoad = () => {
		controls.start('animate')
	}

	return (
		<motion.img
			variants={variants}
			initial="initial"
			animate={controls}
			src={src}
			alt={alt}
			className={`rounded-[16px] shadow-lg cursor-pointer ${className}`}
			onLoad={handleLoad}
			drag
			dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
			dragSnapToOrigin={true}
		/>
	)
}

export default LandingPage