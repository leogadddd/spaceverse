import { AnimatePresence, motion } from "framer-motion"
import useWindowSize from "../../../util/hooks/useWindowSize"

export const BuyMeCoffee = () => {

	const [width] = useWindowSize()

	return (
		<AnimatePresence initial={false} mode="wait">
			{
				width > 975 &&
				<motion.div
					key="buyMeCoffee"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0}}
					transition={{ duration: 0.3 }}
					className="shadow-lg bg-sv-buymeacoffee pointer-events-auto h-full corners flex justify-center items-center"
				>
					<a
						className="flex justify-center items-center px-[1.3em]"
						target={"_blank"}
						rel="noreferrer"
						href="https://www.buymeacoffee.com/spaceverse"
					>
						<img className="w-[8.5rem] h-auto" src="bmc-new-logo-dark.png" alt="" />
						{/* <h1 className="font-poppins">Buy me coffee</h1> */}
					</a>
				</motion.div>
			}
		</AnimatePresence>
	)
}

export default BuyMeCoffee