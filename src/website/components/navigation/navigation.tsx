import { FC } from "react";
import { useNavigate } from "react-router"
import DividerComponent from "../../../app/components/divider";
import { getSpecificRoute } from "../../../routes";
import { WidthLayout } from "../layouts/widthLayout";

export interface NavigationProps {
	showOpenAppButton?: boolean
}

export const Navigation: FC<NavigationProps> = (props) => {

	const { showOpenAppButton = true } = props

	return (
		<div className="bg-spweb-dark">
			<WidthLayout>
				<div className="h-20 flex justify-between items-center px-6">
					<div className="flex-1">
						<a href={getSpecificRoute('website')?.path} className="text-sv-white font-koulen text-[1.5rem] tracking-widest">
							SPACEVERSE
						</a>
					</div>
					<div className="flex-1">
						<ul className="flex justify-end">
							{
								showOpenAppButton ? (
									<li>
										<a
											href={getSpecificRoute('home')?.path}
											target="_blank"
											rel="noreferrer"
											className="text-sv-black text-sm font-semibold pointer-events-auto bg-sv-accent brightness-95 hover:brightness-110 transition-all p-5 py-2 rounded-[16px]"
										>
											Open App
										</a>
									</li>
								) : null
							}
						</ul>
					</div>
				</div>
			</WidthLayout>
			<DividerComponent />
		</div>
	)
}

export default Navigation