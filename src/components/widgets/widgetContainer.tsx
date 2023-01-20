import React, { useState, useEffect, useRef, FC, useCallback } from 'react';
import Draggable from 'react-draggable';
import useWindowSize from '../../util/hooks/useWindowSize';
import { generateId } from '../../util/idGenerators';
import { formatString4Class } from '../../util/stringformatter';
import { WidgetMinimizerProps, WidgetsBarProps, WidgetsContainerProps, WidgetSettingsProps } from './widgetsComponentProps';
import { TbMinimize } from 'react-icons/tb';
import { TbMaximize } from 'react-icons/tb';
import { GoGear } from 'react-icons/go';
import { convertPercentageToPixels } from '../../util/percentageDimensionConverter';

export const Widget: FC<WidgetsContainerProps> = (props) => {

	const { title, minWidth, defaultPosition } = props
	const widgetId = generateId(formatString4Class(title) + '-widget')
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

	const handleStop = useCallback((e: any, data: { x: number; y: number }) => {

	}, [])

	const handleMinimize = () => {
		setIsMinimized(!isMinimized)
	}

	useEffect(() => {
		updateWindow()
		updatePosition(null, position)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [self, isMinimized, width, height, props])

	return (
		<Draggable
			position={position}
			onDrag={handleDrag}
			onStop={handleStop}
			bounds={{
				left: 0,
				top: 0,
				right: width - windowSize.width,
				bottom: height - windowSize.height,
			}}
			handle='.handle-area'
		>
			<div
				key={widgetId}
				ref={self}
				className={`absolute shadow-lg bg-sv-white dark:bg-sv-black pointer-events-auto corners`}
				style={{
					minWidth: minWidth,
				}}
			>
				<WidgetBar title={title} isMiminized={isMinimized} setIsMinimized={handleMinimize} />
				{!isMinimized &&
					<>
						<div className='dark:bg-sv-white bg-sv-black h-[1px] opacity-30'></div>
						<div>
							{props.children}
						</div>
					</>
				}
			</div>
		</Draggable>
	)
}

export const WidgetBar: FC<WidgetsBarProps> = (props) => {

	const { title, isMiminized, setIsMinimized } = props

	return (
		<div className={`handle-area h-[40px]`}>
			<div className='px-3 py-2 flex flex-row items-center justify-between'>
				<div>
					<h1 className='text-sv-black dark:text-sv-white'>{title}</h1>
				</div>
				<div className='flex justify-center items-center'>
					<WidgetSettings openWidgetSettings={() => { }} />
					<WidgetMinimizer isMinimized={isMiminized} setIsMinimized={setIsMinimized} />
				</div>
			</div>
		</div>
	)
}

export const WidgetSettings: FC<WidgetSettingsProps> = (props) => {

	const { openWidgetSettings } = props

	return (
		<button className='flex justify-end items-center w-7' onClick={openWidgetSettings}>
			<GoGear className="dark:text-sv-white text-sv-black" />
		</button>
	)
}

export const WidgetMinimizer: FC<WidgetMinimizerProps> = (props) => {

	const { isMinimized, setIsMinimized } = props

	return (
		<button className='flex justify-end items-center w-7' onClick={setIsMinimized}>
			{isMinimized ?
				<TbMaximize className="dark:text-sv-white text-sv-black" /> :
				<TbMinimize className="dark:text-sv-white text-sv-black" />
			}
		</button>
	)
}

export default Widget