import { createPortal } from "react-dom"
import { getSpecificRoute } from "./routes"
import { Footer } from "./website/components/footer"
import { WidthLayout } from "./website/components/layouts/widthLayout"
import { Navigation } from "./website/components/navigation"

export const Unauthorized = () => {

	return createPortal(
		<div className="overflow-hidden">
			<Navigation />
			<div className="bg-spweb-darkup flex flex-col justify-center">
				<WidthLayout>
					<div className="min-h-[calc(100vh-60px)] max-w-[1000px] flex flex-col gap-12 justify-center items-center px-4 py-16">
						<h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-sv-white text-center">
							Unauthorized
						</h1>
						<p className="text-sv-white text-base text-center w-[300px] md:w-[500px] lg:w-[700px]">
							You are not authorized to view this page.
						</p>
						<div className="flex flex-col items-center gap-4">
							<a href={getSpecificRoute('login')?.path} className="text-sv-black text-lg font-semibold pointer-events-auto w-max bg-sv-accent brightness-95 hover:brightness-110 transition-all p-8 py-3 rounded-[16px]">
								Login
							</a>
							{/* <a href="/contact" className="text-sv-black text-lg font-semibold pointer-events-auto w-max bg-sv-accent brightness-95 hover:brightness-110 transition-all p-8 py-3 rounded-[16px]">
									Contact Us
								</a> */}
						</div>
					</div>
				</WidthLayout>
			</div>
			<Footer />
		</div>
	, document.getElementById("site") as HTMLElement)
}

export default Unauthorized