import { createPortal } from "react-dom";
import { Footer } from "./components/footer";
import { WidthLayout } from "./components/layouts/widthLayout";
import { Navigation } from "./components/navigation";

export const Resources = () => {
	
	return createPortal(
		<div className="overflow-hidden">
			<Navigation />
			<div className="bg-spweb-darkup flex flex-col justify-center">
				<WidthLayout>
					<div className="min-h-[calc(100vh-60px)] max-w-[1000px] flex flex-col gap-12 w-full px-4 py-16">
						<div className="w-full">
							<h1 className="text-4xl font-bold text-white">Resources</h1>
						</div>
					</div>
				</WidthLayout>
			</div>
			<Footer />
		</div>
		, document.getElementById("site") as HTMLElement)
}

export default Resources;