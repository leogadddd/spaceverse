import { motion } from "framer-motion";
import { FC } from "react";
import { ImSpinner3 } from "react-icons/im";

export const Spinner:FC<{theme?: number}> = (props) => {

	const { theme = 0 } = props;

	return (
		<div>
			<motion.div
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity }}
				className="flex justify-center items-center"
			>
				<ImSpinner3 className={`${theme <= 0 ? "text-sv-white" : "text-sv-black"}`} />
			</motion.div>
		</div>
	)
}

export default Spinner;