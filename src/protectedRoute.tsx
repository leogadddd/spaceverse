import { FC, ReactElement } from "react";
import Unauthorized from "./unauthorized";
import Spinner from "./website/spinner";
import useAuthCheck from "./website/util/hooks/useAuthCheck";

export const ProtectedRoute: FC<{component: any}> = (props) => {

	const { component: Component } = props;

	const { checkingStatus, isLogged } = useAuthCheck()

	return (
		<>
			{
				checkingStatus ? <Spinner /> : isLogged ? <Component /> : <Unauthorized />
			}
		</>
	)
}