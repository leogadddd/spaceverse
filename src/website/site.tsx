import { createPortal } from "react-dom"
import { Footer } from "./components/footer"
import { LandingPage } from "./components/langdingPage"
import { WidthLayout } from "./components/layouts/widthLayout"
import { Navigation } from "./components/navigation"
import { CustomizableWidgetsFeature, CustomizeWorkspaceFeature, OptimizeYourRoutineFeature } from "./components/features"
import { useEffect, useRef } from "react"
import { SocialsComponent } from "./components/Socials"

export const Site = () => {

	const ref = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	const handleScrollIntoView = () => {
		ref.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",

		});
	}

	useEffect(() => {
		localStorage.setItem("isFirstVisit", "true");
	}, [])

	return createPortal(
		<div className="overflow-hidden">
			<Navigation />
			<div className="bg-spweb-darkup" ref={scrollRef}>
				<WidthLayout>
					<LandingPage scrollIntoView={handleScrollIntoView} />
					<CustomizeWorkspaceFeature self={ref} />
					<CustomizableWidgetsFeature />
					<OptimizeYourRoutineFeature />
					<SocialsComponent />
				</WidthLayout>
			</div>
			<Footer />
		</div>
		, document.getElementById("site") as HTMLElement)
}

export default Site