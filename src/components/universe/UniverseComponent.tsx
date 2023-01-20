import React, { createContext } from "react";
import UniversePlayer from "./UniversePlayer";
import UniverseLoadingScreen from "./UniverseLoadingScreen";
import { createPortal } from "react-dom";
import { UniverseState } from "../../util/interfaces/state/universeState";
import { useSelector } from "react-redux";

export const UniverseComponent = () => {
	
	const universeState: UniverseState = useSelector((state: any) => state.universe)


	return createPortal(
		<>
			<UniverseLoadingScreen isLoading={universeState.isLoading} />
			<UniversePlayer />
		</>
	, document.getElementById('universe') as Element)
}

export default UniverseComponent; 