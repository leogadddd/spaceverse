import { FC } from "react"
import DividerComponent from "../../../app/components/divider"
import { WidthLayout } from "../layouts/widthLayout"
import { FooterLinkProps } from "./FooterProps"

export const Footer = () => {

	return (
		<div className="bg-spweb-dark">
			<DividerComponent />
			<WidthLayout>
				<div className="p-4 py-8 flex justify-center">
					<div className="flex flex-col items-center justify-center h-full lg:w-[800px]">
						<div className="flex gap-8">
							<div className="flex flex-col justify-start gap-3 w-full lg:px-8">
								<h1 className="text-sv-light text-sm font-semibold">
									Spaceverse
								</h1>
								<ul className="flex flex-col gap-2">
									<FooterLink title="About" href="#" />
									<FooterLink title="Contact" href="#" />
									<FooterLink title="FAQ" href="#" />
									<FooterLink title="Blog" href="#" />
								</ul>
							</div>
							<div className="flex flex-col justify-start gap-3 w-full lg:px-8">
								<h1 className="text-sv-light text-sm font-semibold">
									Useful Links
								</h1>
								<ul className="flex flex-col gap-2">
									<FooterLink title="Request a Universe" href="https://tally.so/r/w2XraL" />
									<FooterLink title="Request a Feature" href="https://tally.so/r/wAz820" />
									<FooterLink title="Report A Bug" href="#" />
									<FooterLink title="Privacy Policy" href="#" />
									<FooterLink title="Terms Of Service" href="#" />
								</ul>
							</div>
						</div>
						<div className="py-16 pb-0">
							<h1 className="text-sv-light text-sm font-semibold">
								Copyright © {new Date().getFullYear()} Spaceverse. All rights reserved.
							</h1>
						</div>
					</div>
				</div>
			</WidthLayout>
		</div>
	)
}

export const FooterLink: FC<FooterLinkProps> = (props) => {

	const { title, href } = props

	return (
		<li className="w-max text-sv-light text-xs font-light hover:underline">
			<a 
			href={href}
			target="_blank"
			rel="noreferrer"
			>{title}</a>
		</li>
	)
}

export default Footer