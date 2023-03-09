import { useNavigate } from "react-router"
import DividerComponent from "../../../app/components/divider";
import { WidthLayout } from "../layouts/widthLayout"

export const Navigation = () => {

	return (
		<div className="bg-spweb-dark">
			<WidthLayout>
				<div className="h-20 flex justify-between items-center px-6">
					<div className="flex-1">
						<h1 className="text-sv-white font-koulen text-[1.5rem] tracking-widest">
							SPACEVERSE
						</h1>
					</div>
					<div className="flex-1">
						<ul className="flex justify-end">
							<li>
								<a
									href="/universe"
									target="_blank"
									rel="noreferrer"
									className="text-sv-black text-sm font-semibold pointer-events-auto bg-sv-accent brightness-95 hover:brightness-110 transition-all p-5 py-2 rounded-[16px]"
								>
									Open App
								</a>
							</li>
						</ul>
					</div>
				</div>
			</WidthLayout>
			<DividerComponent />
		</div>
	)
}

export default Navigation