import { createPortal } from "react-dom"
import { Footer } from "./components/footer"
import { WidthLayout } from "./components/layouts/widthLayout"
import { Navigation } from "./components/navigation"
import { useSearchParams } from "react-router-dom"
import { ThanksPageMessage } from "./util/enum/thanksType"
import { getSpecificRoute } from "../routes"

export const ThanksPage = () => {

	const [searchParams, setSearchParams] = useSearchParams()

	const Header = () => {
		const type = searchParams.get('type') as ThanksPageMessage
		switch (type) {
			case ThanksPageMessage.RequestingAUniverse:
				return "Thank you for requesting a universe!"
			case ThanksPageMessage.RequestingAFeature:
				return "Thank you for requesting a feature!"
			case ThanksPageMessage.ReportingABug:
				return "Thank you for reporting a bug!"
			default:
				return "Thank you!"
		}
	}

	const ThanksMessage = () => {
		const type = searchParams.get('type') as ThanksPageMessage
		switch (type) {
			case ThanksPageMessage.RequestingAUniverse:
				return "We appreciate your interest in exploring the vast universe with us! Your request has been received, and our team is working diligently to provide you with the best possible experience. Keep an eye on your inbox for updates and exciting news."
			case ThanksPageMessage.RequestingAFeature:
				return "Your suggestion is invaluable to us! We are always looking for ways to improve our product, and your input helps us do just that. Rest assured that your suggestion has been received and will be taken into consideration for future updates."
			case ThanksPageMessage.ReportingABug:
				return "We're sorry that you experienced an issue, but we're grateful that you brought it to our attention. Our team is already looking into the matter and working on a solution. We appreciate your patience and understanding while we work to resolve the issue."
			default:
				return "Thank you for your submission! We appreciate your interest in our service. Your message has been received, and we will get back to you as soon as possible. In the meantime, feel free to explore our website to learn more about what we have to offer. Thank you again for your support!"
		}
	}


	return createPortal(
		<div className="overflow-hidden">
			<Navigation />
			<div className="bg-spweb-darkup flex flex-col justify-center">
				<WidthLayout>
					<div className="min-h-[calc(100vh-60px)] max-w-[1000px] flex flex-col gap-12 justify-center items-center px-4 py-16">
						<h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-sv-white text-center">
							{Header()}
						</h1>
						<p className="text-sv-white text-base text-center w-[300px] md:w-[500px] lg:w-[700px]">
							{ThanksMessage()}
						</p>
						<div className="flex flex-col items-center gap-4">
							<a href={getSpecificRoute('website')?.path} className="text-sv-black text-lg font-semibold pointer-events-auto w-max bg-sv-accent brightness-95 hover:brightness-110 transition-all p-8 py-3 rounded-[16px]">
								Go Home
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



export default ThanksPage