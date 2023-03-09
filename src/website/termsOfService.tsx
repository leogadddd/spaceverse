import Markdown from "markdown-to-jsx"
import { FC } from "react"
import { createPortal } from "react-dom"
import { componentsProps } from "../app/components/menu/menuItems/WhatsNew/whatsNewProps"
import { Footer } from "./components/footer"
import { WidthLayout } from "./components/layouts/widthLayout"
import { Navigation } from "./components/navigation"

export const TermsOfService = () => {

	return createPortal(
		<div className="overflow-hidden">
			<Navigation />
			<div className="bg-spweb-darkup flex flex-col justify-center">
				<WidthLayout>
					<div className="min-h-[calc(100vh-60px)] max-w-[800px] flex flex-col justify-center items-center px-4 py-16">
						{/* <h1 className="text-sv-white text-2xl font-semibold">
							Terms Of Service
						</h1> */}
						<Markdown
							children={TermsOfServiceText}
							options={{ overrides: overrides }}
						/>
					</div>
				</WidthLayout>
			</div>
			<Footer />
		</div>
		, document.getElementById("site") as HTMLElement)
}




const H1Component: FC<componentsProps> = ({ children, ...props }) => {
	return (
		<div className="flex justify-center items-center pb-12">
			<h1 className="text-sv-black dark:text-sv-white text-4xl font-semibold">
				{children}
			</h1>
		</div>
	)
}

const H2Component: FC<componentsProps> = ({ children, ...props }) => {
	return (
		<div className="flex justify-start items-start py-2 pb-1">
			<h2 className="text-sv-black dark:text-sv-white text-lg font-semibold tracking-wider">
				{children}
			</h2>
		</div>
	)
}

const H3Component: FC<componentsProps> = ({ children, ...props }) => {
	return (
		<div className="flex justify-start gap-3 items-start py-2 pb-0">
			<div className="bg-sv-black dark:bg-sv-white flex-1 h-[2px] corners opacity-50" />
			<h3 className="text-sv-white  text-base font-semibold uppercase">
				{children}
			</h3>
			<div className="text-sv-white  flex-1 h-[2px] corners opacity-50" />
		</div>
	)
}

const PComponent: FC<componentsProps> = ({ children, ...props }) => {
	return (
		<div className="flex justify-start items-start py-2 pt-0 pl-4">
			<p className="text-sv-black dark:text-sv-white text-sm text-justify">
				{children}
			</p>
		</div>
	)
}

const ListItemComponent: FC<componentsProps> = ({ children, ...props }) => {
	return (
		<li className="inline-block py-1 pb-2 text-sv-white text-sm text-justify">
			→ {children}
		</li>
	)
}

const UnorderedListComponent: FC<componentsProps> = ({ children, ...props }) => {
	return (
		<ul className="flex flex-col justify-start items-start gap-1 pl-12 pb-6 list-disc">
			{children}
		</ul>
	)
}

const overrides = {
	h1: {
		component: H1Component,
	},
	h2: {
		component: H2Component,
	},
	h3: {
		component: H3Component,
	},
	p: {
		component: PComponent,
	},
	li: {
		component: ListItemComponent,
	},
	ul: {
		component: UnorderedListComponent,
	},
}

const TermsOfServiceText = `
# Terms of Service

Welcome to Spaceverse! These terms of service ("Agreement") govern your use of our web application ("Spaceverse" or "App"). By using Spaceverse, you agree to be bound by this Agreement. If you do not agree to these terms and conditions, you should not use Spaceverse.

## 1. Purpose

Spaceverse is a productivity web app designed to help students and workers of all ages increase their productivity by providing them with a visually stimulating and immersive background or view. With Spaceverse, users can customize their experience by choosing from various backgrounds, widgets, and features such as the Pomodoro timer and music widgets, among others.

The aim of Spaceverse is to provide a fun and engaging way to stay focused on tasks and achieve more in less time. By using Spaceverse, users can take advantage of the latest technologies and best practices in productivity to enhance their learning and work experiences.

Spaceverse also allows users to request new universes and features through forms, which will be reviewed by the app owner to ensure that they meet the required standards before being added to the app.

Please note that Spaceverse is not intended to replace professional advice or medical treatment. Users should seek professional advice as necessary before using Spaceverse or making any changes to their study or work habits.

## 2. Age Restrictions

Spaceverse is intended for use by students ranging from elementary to workers in the ages of 27.

## 3. User-Generated Content

Spaceverse allows users to generate and submit content, including but not limited to universe ideas and feature requests. By submitting content to Spaceverse, you grant Spaceverse a non-exclusive, worldwide, royalty-free, and transferable license to use, copy, modify, distribute, display, and publish such content.

Spaceverse reserves the right to review, edit, or remove any user-generated content that violates this Agreement, applicable laws, or regulations.

## 4. User Data Handling

Protectively, user data is only passed between Firebase using the Firebase SDK to the app, which is a ReactJS app.

## 5. Dispute Resolution

In the event of any dispute, claim, or controversy arising out of or relating to your use of Spaceverse, the parties involved shall first attempt to resolve the dispute through informal negotiations. If the parties are unable to reach a resolution through informal negotiations, any such dispute, claim, or controversy shall be resolved by final and binding arbitration in accordance with the rules of the Philippine Dispute Resolution Center, Inc. (PDRCI).

The arbitration shall be conducted in English and held in the city or municipality in which you reside, or in another mutually agreed location. The arbitration shall be conducted by a single arbitrator, appointed in accordance with the rules of the PDRCI. The arbitrator shall have the authority to grant any relief that would be available in a court of law.

Notwithstanding the above, you may bring any claim or dispute you may have against Spaceverse in your local small claims court, if the claim or dispute meets the court's jurisdictional requirements.

This Agreement shall be governed by and construed in accordance with the laws of the Philippines, without giving effect to any principles of conflicts of law.

## 6. Contact

If you have any questions or concerns about this Agreement or Spaceverse, please contact us at support@spvr.app.

## 7. Changes to this Agreement

Spaceverse reserves the right to modify or update this Agreement at any time, without notice to you. Your continued use of Spaceverse after such modifications or updates constitutes your acceptance of the modified or updated Agreement.


`

export default TermsOfService