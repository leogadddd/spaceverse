import { FC, useCallback, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import DividerComponent from "../../../app/components/divider";
import { WidgetMinimizerButton } from "../../../app/components/widgets";
import useWindowSize from "../../../app/util/hooks/useWindowSize";
import { convertPercentageToPixels } from "../../../app/util/percentageDimensionConverter";
import { formatString4Class } from "../../../app/util/stringformatter";
import { DatabaseWidgetBarProps, DatabaseWidgetContainerProps } from "./databaseWidgetProps";

export const DatabaseWidgetContainer: FC<DatabaseWidgetContainerProps> = (props) => {

	const { children, title, minWidth, maxWidth, defaultPosition, dbProps } = props;

	const widgetId = formatString4Class(title) + '-dbWidget';
	const self = useRef<HTMLDivElement>(null)

	const [isMinimized, setIsMinimized] = useState(false)
	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0
	})

	const [position, setPosition] = useState({
		x: defaultPosition ? convertPercentageToPixels(defaultPosition.x, window.innerWidth - windowSize.width) : 0,
		y: defaultPosition ? convertPercentageToPixels(defaultPosition.y, window.innerHeight - windowSize.height) : 0
	})

	const [width, height] = useWindowSize()

	const updateWindow = () => {
		if (!self.current) return

		setWindowSize({
			width: self.current.getBoundingClientRect().width,
			height: self.current.getBoundingClientRect().height
		})
	}

	const updatePosition = (e: any, data: { x: number; y: number }) => {
		if (!self.current) return
		let { x, y } = data
		const {
			height,
			width,
		} = self.current.getBoundingClientRect()

		x = x + width > window.innerWidth ? window.innerWidth - width : x
		y = y + height > window.innerHeight ? window.innerHeight - height : y

		// fix for negative values
		if (width > window.innerWidth) {
			x = 0
		}

		if (height > window.innerHeight) {
			y = 0
		}

		setPosition({ x, y })
	}

	const handleDrag = useCallback((e: any, data: { x: number; y: number }) => {
		updatePosition(e, data)
	}, [])

	const handleMinimize = () => {
		setIsMinimized(!isMinimized)
	}

	useEffect(() => {
		updateWindow()
		updatePosition(null, position)
	}, [self, width, height, isMinimized, dbProps])


	return (
		<Draggable
			position={position}
			onDrag={handleDrag}
			bounds={{
				left: 0,
				top: 0,
				right: width - windowSize.width,
				bottom: height - windowSize.height
			}}
			handle='.handle-area'
		>
			<div
				key={widgetId}
				ref={self}
				className={`absolute shadow-lg bg-spcms-dark pointer-events-auto corners overflow-hidden`}
				style={{
					minWidth: minWidth,
					width: minWidth,
					maxWidth: maxWidth
				}}
			>
				<DatabaseWidgetBar title={title} isMinimized={isMinimized} setIsMinimized={handleMinimize} />
				{
					!isMinimized &&
					<>
						<DividerComponent />
						<div>

							{children}
						</div>
					</>
				}
			</div>
		</Draggable>
	)
}

export const DatabaseWidgetBar: FC<DatabaseWidgetBarProps> = (props) => {

	const { title, isMinimized, setIsMinimized } = props;

	return (
		<div className={`handle-area h-[40px] cursor-grab flex`}>
			<div className='px-3 flex flex-row items-center justify-between flex-1'>
				<div className='flex-1 flex justify-start items-center gap-2'>
					<h1 className='text-sv-white text-sm'>{title}</h1>
				</div>
				<div className='flex justify-center items-center'>
					<WidgetMinimizerButton isMinimized={isMinimized} setIsMinimized={setIsMinimized} />
				</div>
			</div>
		</div>
	)
}

export default DatabaseWidgetContainer;