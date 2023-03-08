import React from "react";
import UniversePlayer from "./UniversePlayer";
import UniverseLoadingScreen from "./UniverseLoadingScreen";

export const UniverseComponent = () => {

	return (
		<div>
			<UniversePlayer />
			<UniverseLoadingScreen />
		</div>
	)
}

export default UniverseComponent; 