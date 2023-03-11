import React, { FC } from "react";
import UniversePlayer from "./UniversePlayer";
import UniverseLoadingScreen from "./UniverseLoadingScreen";
import { UniverseComponentProps } from "./universeProps";

export const UniverseComponent: FC<UniverseComponentProps> = (props) => {

	const { universe } = props; 

	return (
		<div>
			<UniversePlayer universe={universe} />
			<UniverseLoadingScreen isByPass={universe ? true : false} />
		</div>
	)
}

export default UniverseComponent; 