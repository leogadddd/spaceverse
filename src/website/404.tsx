import { createPortal } from "react-dom"
import { Footer } from "./components/footer"
import { WidthLayout } from "./components/layouts/widthLayout"
import { Navigation } from "./components/navigation"

export const PageNotFound = () => {

	return createPortal(
		<div className="overflow-hidden">
			<Navigation />
			<div className="bg-spweb-darkup">
				<WidthLayout>
					<div className="h-[calc(100vh-60px)] flex flex-col justify-center items-center">
						<div className="flex flex-col items-center gap-16">
							<div className="flex flex-col items-center gap-6">
								<h1 className="text-sv-white text-xl font-semibold text-center">
									Looks like you're lost in space.
								</h1>
								<h1 className="text-sv-white text-8xl font-semibold text-center">
									404
								</h1>
							</div>
							<p className="text-sv-white text-lg text-center w-[300px]">
								We couldn't find the page you were looking for.
							</p>
							<div className="flex flex-col items-center gap-4">
								<a href="/" className="text-sv-black text-lg font-semibold pointer-events-auto w-max bg-sv-accent brightness-95 hover:brightness-110 transition-all p-8 py-3 rounded-[16px]">
									Go Home
								</a>
								{/* <a href="/contact" className="text-sv-black text-lg font-semibold pointer-events-auto w-max bg-sv-accent brightness-95 hover:brightness-110 transition-all p-8 py-3 rounded-[16px]">
									Contact Us
								</a> */}
							</div>
						</div>
					</div>
				</WidthLayout>
			</div>
			<Footer />
		</div>
		, document.getElementById("site") as HTMLElement)
}

export default PageNotFound