import Markdown from "markdown-to-jsx"
import { FC, PropsWithChildren } from "react"
import { createPortal } from "react-dom"
import { componentsProps } from "../app/components/menu/menuItems/WhatsNew/whatsNewProps"
import { Footer } from "./components/footer"
import { WidthLayout } from "./components/layouts/widthLayout"
import { Navigation } from "./components/navigation"

export const PrivacyPolicy = () => {

	return createPortal(
		<div className="overflow-hidden">
			<Navigation />
			<div className="bg-spweb-darkup flex flex-col justify-center">
				<WidthLayout>
					<div className="min-h-[calc(100vh-60px)] max-w-[800px] flex flex-col justify-center items-center px-4 py-16">
						{/* <h1 className="text-sv-white text-2xl font-semibold">
							Privacy Policy
						</h1> */}
						<Markdown
							children={PrivacyPolicyText}
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
			<p className="text-sv-black dark:text-sv-white text-sm">
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

const PrivacyPolicyText = `
# Privacy Policy

## 1. Introduction

Spaceverse values the privacy of its users and is committed to protecting their personal information. This privacy policy explains how we collect, use, share, and protect your information when you use our web app. By using our web app, you consent to the terms of this privacy policy.

## 2. Information We Collect

We collect the following types of personal information from our users:

- First names
- Last names
- In the future, we may collect additional user information, such as email addresses, passwords, connected social media accounts, and private messages.

We collect this information through forms, user registration on our website, and connected social media accounts.

## 3. How We Use Your Information

We use your personal information to:

- Optimize our web app
- Create a user database
- Provide a messaging feature (in the future)

## 4. Information Sharing

We may share your personal information with third-party services such as Google (for Firebase Performance). We do not share your personal information with any other third parties.

## 5. Cookies and Tracking Technologies

We currently save configuration settings on local storage, and we may use cookies in the future when we add login and register features to our app.

## 6. Information Protection

We use Firebase Firestore to store user information, which provides secure and reliable data storage. We take reasonable measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction.

## 7. Information Retention

We retain user information for as long as the user is active on our web app. If the user is inactive for a year, their account will be deleted.

## 8. User Access, Update, and Deletion

Users can access, update, or delete their personal information by logging in and going to the account settings in the menu.

## 9. Compliance with Data Protection Laws

We comply with applicable data protection laws, including GDPR and CCPA, to ensure the protection of our users' personal information.

## 10. Changes to This Privacy Policy

We may update this privacy policy from time to time. If we make any significant changes, we will notify our users by email or by posting a notice on our web app.

If you have any questions or concerns about this privacy policy, please contact us at support@spvr.app.

`

export default PrivacyPolicy