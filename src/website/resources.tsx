import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { IconType } from "react-icons";
import { MdOutlineAddToQueue } from "react-icons/md";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { Footer } from "./components/footer";
import { WidthLayout } from "./components/layouts/widthLayout";
import { Navigation } from "./components/navigation";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FC, useState } from "react";
import DividerComponent from "../app/components/divider";
import { outsideLinks } from "../outsideLinks";

export const Resources = () => {

	const dropdowns = [
		{
			title: "How to request a universe?",
			content: HowToRequestAUniverse
		},
		{
			title: "How to request a feature?",
			content: HowToRequestAFeature
		}
	]

	return createPortal(
		<div className="">
			<Navigation />
			<div className="bg-spweb-darkup flex flex-col justify-center">
				<WidthLayout>
					<div className="min-h-[calc(100vh-60px)] max-w-[1000px] flex flex-col gap-12 w-full py-16 px-4">
						<div>
							<div className="mb-8 flex flex-col gap-2">
								<h1 className="text-4xl font-bold text-white">Resources</h1>
								<p className="text-sv-white opacity-90">
									Here are some resources that you can use to help you using Spaceverse
								</p>
							</div>
							<div>
								<div className="corners overflow-hidden">
									{
										dropdowns.map((dropdown, index) => {
											return (
												<>
													<DropDownPanel key={index} title={dropdown.title} content={dropdown.content} />
													{index !== dropdowns.length - 1 && <DividerComponent />}
												</>
											)
										})
									}
								</div>
							</div>
							<div className="mt-8 flex flex-col gap-2">
								<p className="text-sv-white opacity-90">
									<div className="inline-flex gap-1">
										<span>
											Still need help? contact us at
										</span>
										<a
											target={"_blank"}
											rel="noreferrer"
											href="mailto:support@spvr.app"
											className="text-sv-accent hover:underline">
											support@spvr.app
										</a>
									</div>
									.
								</p>
							</div>
						</div>
					</div>
				</WidthLayout>
			</div>
			<Footer />
		</div>
		, document.getElementById("site") as HTMLElement)
}

export const HowToRequestAFeature = () => {
	return (
		<div>
			<div className="pb-4">
				<p className="font-semibold text-sv-white opacity-90">
					Requesting a feature is easy but it takes a while. Just follow these steps:
				</p>
			</div>
			<ul className="list-decimal list-inside text-sv-white opacity-90 pl-6 flex flex-col gap-3">
				<li className="flex gap-2">
					<div>
						<span className="text-sv-white opacity-90 inline-flex gap-1">
							1.
						</span>
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-sv-white opacity-90 inline-flex gap-1">
							Click the button below to request a feature
						</span>
						<div className="px-4">
							<button className="bg-sv-accent corners px-3 py-2 flex items-center gap-2 hover:brightness-110 transition-all">
								<AiOutlineAppstoreAdd className="text-sv-black" />
								<a 
								href={outsideLinks.requestFeature}
								className="text-sv-black font-semibold"
								>
									Request a Feature
								</a>
							</button>
						</div>
					</div>
				</li>
				<li className="flex gap-2">
					<div>
						<span className="text-sv-white opacity-90 inline-flex gap-1">
							2.
						</span>
					</div>
					<div>
						<span className="text-sv-white opacity-90 inline-flex gap-1">
							Fill out the form with the details of your feature request. make sure to be as detailed as possible
						</span>
					</div>
				</li>
				<li className="flex gap-2">
					<div>
						<span className="text-sv-white opacity-90 inline-flex gap-1">
							3.
						</span>
					</div>
					<div>
						<span className="text-sv-white opacity-90 inline-flex gap-1">
							Submit the form
						</span>
					</div>
				</li>
				<li className="flex gap-2">
					<div>
						<span className="text-sv-white opacity-90 inline-flex gap-1">
							4.
						</span>
					</div>
					<div>
						<span className="text-sv-white opacity-90 inline-flex gap-1">
							Wait for the feature to be added to Spaceverse. This can take a while so be patient
						</span>
					</div>
				</li>
			</ul>
		</div>
	)
}


export const HowToRequestAUniverse = () => {
	return (
		<div>
			<div className="pb-4">
				<p className="font-semibold text-sv-white opacity-90">
					Requesting a universe is easy. Just follow these steps:
				</p>
			</div>
			<ul className="list-decimal list-inside text-sv-white opacity-90 pl-6 flex flex-col gap-3">
				<li className="flex gap-2">
					<div>
						<span className="text-sv-white opacity-90 inline-flex gap-1">
							1.
						</span>
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-sv-white opacity-90 inline-flex gap-1">
							Click the button below to request a universe
						</span>
						<div className="px-4">
							<button className="bg-sv-accent corners px-3 py-2 flex items-center gap-2 hover:brightness-110 transition-all">
								<MdOutlineAddToQueue className="text-sv-black" />
								<a 
								href={outsideLinks.requestUniverse}
								className="text-sv-black font-semibold"
								>
									Request a Universe
								</a>
							</button>
						</div>
					</div>
				</li>
				<li className="flex gap-2">
					<div>
						<span className="text-sv-white opacity-90 inline-flex gap-1">
							2.
						</span>
					</div>
					<div>
						<span className="text-sv-white opacity-90 inline-flex gap-1">
							Fill out the form
						</span>
					</div>
				</li>
				<li className="flex gap-2">
					<div>
						<span className="text-sv-white opacity-90 inline-flex gap-1">
							3.
						</span>
					</div>
					<div>
						<span className="text-sv-white opacity-90 inline-flex gap-1">
							Click the button to submit the form
						</span>
					</div>
				</li>
				<li className="flex gap-2">
					<div>
						<span className="text-sv-white opacity-90 inline-flex gap-1">
							3.
						</span>
					</div>
					<div>
						<span className="text-sv-white opacity-90 inline-flex gap-1">
							4. if all goes well, your universe is now requested and will be reviewed by our team
						</span>
					</div>
				</li>
			</ul>
		</div>
	)
}

interface DropDownPanelProps {
	title: string;
	content: FC;
}

export const DropDownPanel: FC<DropDownPanelProps> = (props) => {

	const { title, content: ContentComponent } = props;

	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="bg-sv-input-dark overflow-hidden">
			<div className={`flex bg-sv-input-dark justify-between px-4 p-3 shadow-lg cursor-pointer hover:brightness-125 transition-all`} onClick={() => setIsOpen(!isOpen)}>
				<div className="flex items-center gap-2">
					<h1 className="text-1xl font-semibold text-white">
						{title}
					</h1>
				</div>
				<div className="flex items-center gap-2">
					<button>
						{isOpen ?
							<IoMdArrowDropup size={25} className="text-white" /> :
							<IoMdArrowDropdown size={25} className="text-white" />
						}
					</button>
				</div>
			</div>
			{/* THE DROPDOWN VALUE */}
			<AnimatePresence mode="wait">
				{
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
						exit={{ height: 0, opacity: 0 }}
					>
						<div className="flex flex-col gap-4 px-4 py-3">
							<ContentComponent />
						</div>
					</motion.div>
				}
			</AnimatePresence>
		</div>
	)
}

export default Resources;