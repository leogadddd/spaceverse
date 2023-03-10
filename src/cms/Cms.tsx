import { UniverseComponent } from "../app/components/universe";
import { CmsBackground, DatabaseWidgetComponent } from "./components";

const Cms = () => {
	return (
		<>
			<UniverseComponent />
			<CmsBackground />
			<DatabaseWidgetComponent />
		</>
	);
}

export default Cms;
