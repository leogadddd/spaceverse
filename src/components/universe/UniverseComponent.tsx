import React, { createContext } from "react";
import UniversePlayer from "./UniversePlayer";
import UniverseLoadingScreen from "./UniverseLoadingScreen";
import { createPortal } from "react-dom";

export const UniverseComponent = () => {
	// ...


	return createPortal(
		<>
			<UniverseLoadingScreen />
			<UniversePlayer />
		</>
	, document.getElementById('universe') as Element);
}

export default UniverseComponent; 