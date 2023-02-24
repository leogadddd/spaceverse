import { bindActionCreators } from '@reduxjs/toolkit'
import React, { useState, useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { creators } from '../../lib'

export const useWindowSize = () => {
	const dispatch = useDispatch()
	const {
		setWindowSize
	} = bindActionCreators(creators, dispatch)
	const [size, setSize] = useState([0, 0])
	useLayoutEffect(() => {
		const updateSize = () => {
			setSize([window.innerWidth, window.innerHeight])
			setWindowSize(window.innerWidth, window.innerHeight)
		}
		window.addEventListener('resize', updateSize)
		updateSize()
		return () => window.removeEventListener('resize', updateSize)
	}, [])
	return size
}

export default useWindowSize