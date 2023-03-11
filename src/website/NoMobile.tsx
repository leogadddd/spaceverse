import { createPortal } from "react-dom"
import { Footer } from "./components/footer"
import { WidthLayout } from "./components/layouts/widthLayout"
import { Navigation } from "./components/navigation"

export const NoMobile = () => {

	return createPortal(
		<div className="overflow-hidden">
			<Navigation />
			<div className="bg-spweb-darkup flex flex-col justify-center">
				<WidthLayout>
					<div className="min-h-[calc(100vh-60px)] max-w-[1000px] flex flex-col gap-12 justify-center items-center px-4 py-16">
						<h1 className="text-8xl font-bold text-sv-white text-center">
						📵
						</h1>
						<h1 className="text-4xl font-bold text-sv-white text-center">Spaceverse is not optimized for mobile yet</h1>
						<p className="text-xl text-sv-white text-center">Please use a desktop or laptop to use Spaceverse.</p>
					</div>
				</WidthLayout>
			</div>
			<Footer />
		</div>
		, document.getElementById("site") as HTMLElement)
}

export default NoMobile