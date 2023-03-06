import { useNavigate } from "react-router";
import DividerComponent from "../../../divider";
import MenuWindow from "../../menuWindowContainer"


export const DevTools = () => {

	const navigate = useNavigate();

	const onClick = () => {
		navigate("/cms");
	}

	return (
		<MenuWindow title={"DevTools"} minWidth={450}>
			<div className="py-4">
				<div className="flex justify-center my-1 items-center">
					<DividerComponent />
					<button onClick={onClick} className="flex-1 h-[40px] px-6 flex justify-center items-center hover:dark:bg-sv-light10 hover:bg-sv-dark10 pointer-events-auto transition-colors disabled:opacity-25">
						<h1 className="dark:text-sv-white text-sv-black">
							Open CMS
						</h1>
					</button>
					<DividerComponent />
				</div>
			</div>
		</MenuWindow>
	)
}

export default DevTools