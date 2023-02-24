import { IconType } from "react-icons";
import { Widget } from "../../util/interfaces/state/widgetsState";

export interface ToolBarButtonProps extends Widget {
}

export type ToolBarContextType = {
	setName: (name: string) => void;
}