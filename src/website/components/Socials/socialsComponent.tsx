import { motion } from "framer-motion"
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5"
import DividerComponent from "../../../app/components/divider"

export const SocialsComponent = () => {

	return (
		<div>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 0.75 }}
				transition={{ duration: 1 }}
			>
				<DividerComponent />
			</motion.div>
			<div className="h-[300px] flex flex-col justify-center">
				<div className="flex flex-col items-center pb-4">
					<h1 className="text-2xl font-bold text-sv-white">
						Follow me on
					</h1>
				</div>
				<div>
					<div className="flex flex-row justify-center gap-4">
						<motion.a
							whileHover={{ scale: 1.1 }}
							href="https://www.facebook.com/spaceverseApp"
							target="_blank"
							rel="noreferrer"
						>
							<IoLogoFacebook className="text-sv-white text-4xl m-2" />
						</motion.a>
						<motion.a
							whileHover={{ scale: 1.1 }}
							href="https://www.instagram.com/spaceverseApp/"
							target="_blank"
							rel="noreferrer"
						>
							<IoLogoInstagram className="text-sv-white text-4xl m-2" />
						</motion.a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SocialsComponent