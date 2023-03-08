import DividerComponent from "../../../app/components/divider"
import { WidthLayout } from "../layouts/widthLayout"

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
									<li className="w-max text-sv-light text-xs font-light hover:underline">
										<a href="#">About</a>
									</li>
									<li className="w-max text-sv-light text-xs font-light hover:underline">
										<a href="#">Contact</a>
									</li>
									<li className="w-max text-sv-light text-xs font-light hover:underline">
										<a href="#">FAQ</a>
									</li>
									<li className="w-max text-sv-light text-xs font-light hover:underline">
										<a href="#">Blog</a>
									</li>
								</ul>
							</div>
							<div className="flex flex-col justify-start gap-3 w-full lg:px-8">
								<h1 className="text-sv-light text-sm font-semibold">
									Useful Links
								</h1>
								<ul className="flex flex-col gap-2">
									<li className="w-max text-sv-light text-xs font-light hover:underline">
										<a href="#">Request a Universe</a>
									</li>
									<li className="w-max text-sv-light text-xs font-light hover:underline">
										<a href="#">Request a feature</a>
									</li>
									<li className="w-max text-sv-light text-xs font-light hover:underline">
										<a href="#">Report a bug</a>
									</li>
									<li className="w-max text-sv-light text-xs font-light hover:underline">
										<a href="#">Privacy Policy</a>
									</li>
									<li className="w-max text-sv-light text-xs font-light hover:underline">
										<a href="#">Terms of Service</a>
									</li>
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

export default Footer