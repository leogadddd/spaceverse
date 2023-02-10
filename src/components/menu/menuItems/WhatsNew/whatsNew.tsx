import MenuWindow from "../../menuWindowContainer"

export const WhatsNew = () => {

	return (
		<MenuWindow title={"What's New"} minWidth={450}>
			<div className="py-4">
				<div className="flex justify-center my-1 items-center">
					<h1 className="dark:text-sv-white text-sv-black">
						This feature is not yet implemented.
					</h1>
				</div>
			</div>
		</MenuWindow>
	)
}

export default WhatsNew