import React, { useState, useEffect, useRef, FC, useCallback } from 'react';
import Draggable from 'react-draggable';
import useWindowSize from '../../util/hooks/useWindowSize';
import { formatString4Class } from '../../util/stringformatter';
import { WidgetContentComponentProps, WidgetMinimizerProps, WidgetsBarProps, WidgetsContainerProps, WidgetSettingsButtonProps, WidgetSettingsProps } from './widgetsComponentProps';
import { TbMinimize } from 'react-icons/tb';
import { TbMaximize } from 'react-icons/tb';
import { GoGear } from 'react-icons/go';
import { convertPercentageToPixels } from '../../util/percentageDimensionConverter';
import { motion, AnimatePresence } from 'framer-motion';
import { widgetContentVariants, widgetGrabIndicatorVariants, widgetOpenSettingsButton, widgetStatusTextVariants } from '../../util/constant';
import DividerComponent from '../divider';
import { CgLayoutGridSmall } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { SettingsFieldState } from '../../util/interfaces';
import { subscribersSettingsFields } from '../../util/enums/subscribersName';
import { bindActionCreators } from '@reduxjs/toolkit';
import { creators } from '../../lib';
import { Widget as WidgetState } from '../../util/interfaces/state/widgetsState';

export const Widget: FC<WidgetsContainerProps> = (props) => {

	const { title, statusText, minWidth, maxWidth, defaultPosition, alwaysOpen, settings, children } = props
	
	const widgetId = formatString4Class(title) + '-widget'

	const dispatch = useDispatch()
	const {
		subscribeWidget,
		unsubscribeWidget,
		updateOrder,
		updatePosition,
		setActiveWidget,
		setMinimizedWidget,
	} = bindActionCreators(creators, dispatch)

	const settingsFieldState: SettingsFieldState | undefined = useSelector((state: any) => {
		const settingsField = state.settings.settingsFields as SettingsFieldState[]
		return settingsField.find((field) => field.name === subscribersSettingsFields.widgets.fancyMinimizer.name)
	})

	const widgetState: WidgetState | undefined = useSelector((state: any) => {
		const widgets = state.widgets.widgets as WidgetState[]
		return widgets.find((widget) => widget.id === widgetId)
	})
	
	const self = useRef<HTMLDivElement>(null)

	const [isMinimized, setIsMinimized] = useState(false)
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)
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

	const updateWidgetPosition = (e: any, data: { x: number; y: number }) => {
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
		updateWidgetPosition(e, data)
	}, [])

	const handleDragStop = useCallback((e: any, data: { x: number; y: number }) => {
		updateWidgetPosition(e, data)
		updatePosition(widgetId, data)
	}, [])

	const handleMinimize = () => {
		if (!isMinimized)
			setIsSettingsOpen(false)

		setIsMinimized(!isMinimized)
	}

	const handleOpenSettings = () => {
		if (!isSettingsOpen)
			setIsMinimized(false)

		setIsSettingsOpen(!isSettingsOpen)
	}

	const onAnimationUpdate = () => {
		updateWindow()
		updateWidgetPosition(null, position)
	}

	const onFocus = () => {
		updateOrder(widgetId)
	}

	useEffect(() => {
		subscribeWidget({
			id: widgetId,
			name: title,
			isMinimized: isMinimized,
			position: position,
			isActive: false
		})

		return () => {
			unsubscribeWidget(widgetId)
		}
	}, [])

	useEffect(() => {
		updateWindow()
		updateWidgetPosition(null, position)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMinimized, isSettingsOpen, width, height])

	return (
		<Draggable
			position={position}
			onStop={handleDragStop}
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
				id={widgetId}
				onMouseDownCapture={onFocus}
				className={`absolute shadow-lg bg-sv-light dark:bg-sv-dark pointer-events-auto corners overflow-hidden`}
				style={{
					minWidth: minWidth,
					width: minWidth,
					maxWidth: maxWidth,
					zIndex: widgetState?.order,
				}}
			>
				<WidgetBar
					title={title}
					statusText={statusText}
					isMiminized={isMinimized}
					hasSettings={settings !== undefined}
					setIsMinimized={handleMinimize}
					openSettings={handleOpenSettings}
				/>
				<ContentComponent
					widgetId={widgetId}
					isMinimized={isMinimized}
					isFancyMinimized={settingsFieldState?.value}
					isSettingsOpen={isSettingsOpen}
					settings={settings}
					onAnimationUpdate={onAnimationUpdate}
					isAlwaysOpen={alwaysOpen ? alwaysOpen : false}
				>
					{children}
				</ContentComponent>
			</div>
		</Draggable>
	)
}

const WidgetSettings: FC<WidgetSettingsProps> = (props) => {

	const { settings, widgetId, isFancyMinimized, onAnimationUpdate } = props

	if (isFancyMinimized) {
		return (
			<motion.div
				key={widgetId + '-settings'}
				variants={widgetContentVariants}
				initial="initial"
				animate="animate"
				exit="initial"
				onUpdate={onAnimationUpdate ? onAnimationUpdate : undefined}
			>
				{settings}
			</motion.div>
		)
	}

	return (
		<div>
			{settings}
		</div>
	)
}

const ContentComponent: FC<WidgetContentComponentProps> = (props) => {

	const { children, settings, widgetId, isMinimized, isSettingsOpen, isFancyMinimized, isAlwaysOpen, onAnimationUpdate } = props

	if (isFancyMinimized) {

		if (isAlwaysOpen) {
			return (
				<>
					<motion.div
						key={widgetId + '-content'}
						initial={false}
						animate={{
							height: isMinimized ? 0 : 'auto',
						}}
						transition={{
							duration: 0.2,
							ease: 'easeInOut',
						}}
						onUpdate={onAnimationUpdate}
					>
						<DividerComponent />
						{children}
					</motion.div>
					<AnimatePresence initial={false} mode="wait">
						{isSettingsOpen && <WidgetSettings onAnimationUpdate={onAnimationUpdate} widgetId={widgetId} isFancyMinimized={isFancyMinimized} settings={settings} />}
					</AnimatePresence>
				</>
			)
		}

		return (
			<>
				<AnimatePresence initial={false} mode="wait">
					{!isMinimized &&
						<motion.div
							key={widgetId + '-content'}
							variants={widgetContentVariants}
							initial="initial"
							animate="animate"
							exit="initial"
							onUpdate={onAnimationUpdate}
						>
							<DividerComponent />
							<div>
								{children}
							</div>
						</motion.div>
					}

				</AnimatePresence>
				<AnimatePresence initial={false} mode="wait">
					{isSettingsOpen && <WidgetSettings onAnimationUpdate={onAnimationUpdate} widgetId={widgetId} isFancyMinimized={isFancyMinimized} settings={settings} />}
				</AnimatePresence>
			</>
		)
	}

	if (isAlwaysOpen) {
		return (
			<>
				<div style={{
					height: isMinimized ? '0px' : 'auto',
				}}>
					<DividerComponent />
					{children}
				</div>
				{isSettingsOpen && <WidgetSettings widgetId={widgetId} isFancyMinimized={isFancyMinimized} settings={settings} />}
			</>
		)
	}

	return (
		<>
			{!isMinimized &&
				<div>
					<DividerComponent />
					<div>
						{children}
					</div>
				</div>
			}
			{isSettingsOpen && <WidgetSettings widgetId={widgetId} isFancyMinimized={isFancyMinimized} settings={settings} />}
		</>
	)
}

export const WidgetBar: FC<WidgetsBarProps> = (props) => {

	const { title, statusText, isMiminized, hasSettings, setIsMinimized, openSettings } = props

	return (
		<div className={`handle-area h-[40px] cursor-grab flex`}>
			<div className='px-3 flex flex-row items-center justify-between flex-1'>
				<div className='flex-1 flex justify-start items-center gap-2'>
					<h1 className='text-sv-black dark:text-sv-white text-sm'>{title}</h1>
					<div className='flex-1 relative'>
						<AnimatePresence mode="wait">
							{
								statusText && isMiminized &&
								<div className='absolute inset-0 flex items-center justify-start gap-1'>
									<motion.p
										variants={widgetStatusTextVariants}
										initial='initial'
										animate='animate'
										exit='initial'
										className='text-sv-black dark:text-sv-white text-2xl'
									>·</motion.p>
									<motion.h1
										variants={widgetStatusTextVariants}
										initial='initial'
										animate='animate'
										exit='initial'
										className='text-sv-black dark:text-sv-white text-sm'
									>{statusText}</motion.h1>
								</div>
							}
						</AnimatePresence>
						{/* <AnimatePresence mode="wait">
							{
								!isMiminized &&
								<WidgetGrabberIndicator />
							}
						</AnimatePresence> */}
					</div>
				</div>
				<div className='flex justify-center items-center'>
					<AnimatePresence mode="wait">
						{
							hasSettings &&
							<WidgetSettingsButton openWidgetSettings={openSettings} />
						}
					</AnimatePresence>
					<WidgetMinimizerButton isMinimized={isMiminized} setIsMinimized={setIsMinimized} />
				</div>
			</div>
		</div>
	)
}

export const WidgetGrabberIndicator = () => {
	return (
		<motion.div
			key='grabber-indicator'
			id='grabber-indicator'
			variants={widgetGrabIndicatorVariants}
			initial='initial'
			animate='animate'
			exit='initial'
			className="absolute inset-0 flex justify-center items-center"
		>
			<CgLayoutGridSmall size={25} className="dark:text-sv-white text-sv-black" />
		</motion.div>
	)
}

export const WidgetSettingsButton: FC<WidgetSettingsButtonProps> = (props) => {

	const { openWidgetSettings } = props

	return (
		<motion.button
			key='openSettings-button'
			id='opensettings-button'
			variants={widgetOpenSettingsButton}
			initial='initial'
			animate='animate'
			exit='initial'
			className='h-[40px] flex justify-end items-center w-7' onClick={openWidgetSettings}
		>
			<GoGear className="dark:text-sv-white text-sv-black" />
		</motion.button>
	)
}

export const WidgetMinimizerButton: FC<WidgetMinimizerProps> = (props) => {

	const { isMinimized, setIsMinimized } = props

	return (
		<button className='h-[40px] flex justify-end items-center w-7' onClick={setIsMinimized}>
			{isMinimized ?
				<TbMaximize className="dark:text-sv-white text-sv-black" /> :
				<TbMinimize className="dark:text-sv-white text-sv-black" />
			}
		</button>
	)
}

export default Widget