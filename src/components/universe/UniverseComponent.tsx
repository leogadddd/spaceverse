import React, { createContext } from "react";
import UniversePlayer from "./UniversePlayer";
import UniverseLoadingScreen from "./UniverseLoadingScreen";
import { createPortal } from "react-dom";

export const UniverseComponent = () => {

	return (
		<div className="overflow-hidden">
			<UniversePlayer />
			<UniverseLoadingScreen />
		</div>
	)
}

export default UniverseComponent; 