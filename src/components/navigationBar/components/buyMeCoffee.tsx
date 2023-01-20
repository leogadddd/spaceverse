export const BuyMeCoffee = () => {

	return (
		<div className="shadow-lg bg-sv-buymeacoffee pointer-events-auto h-full corners flex justify-center items-center">
			<a
				className="flex justify-center items-center px-[1.3em]"
				target={"_blank"}
				rel="noreferrer"
				href="https://www.buymeacoffee.com/spaceverse"
			>
				<img className="w-[8.5rem] h-auto" src="bmc-new-logo.png" alt="" />
				{/* <h1 className="font-poppins">Buy me coffee</h1> */}
			</a>
		</div>
	)
}

export default BuyMeCoffee