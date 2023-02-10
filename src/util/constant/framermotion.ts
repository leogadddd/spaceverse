export const universeLoadingContainerVariants = {
	initial: {
		opacity: 0,
		transition: {
			duration: 0.5,
			ease: "easeInOut"
		}
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: "easeInOut"
		}
	}
}

export const widgetStatusTextVariants = {
	initial: {
		opacity: 0,
		transition: {
			duration: 0.2,
			ease: "easeInOut"
		}
	},
	animate: {
		opacity: .65,
		transition: {
			delay: 1,
			duration: 0.2,
			ease: "easeInOut"
		}
	}
}

export const widgetGrabIndicatorVariants = {
	initial: {
		opacity: 0,
		transition: {
			duration: 0.2,
			ease: "easeInOut"
		}
	},
	animate: {
		opacity: .1,
		transition: {
			duration: 0.2,
			ease: "easeInOut"
		}
	}
}

export const widgetOpenSettingsButton = {
	initial: {
		opacity: 0,
		transition: {
			duration: 0.2,
			ease: "easeInOut"
		}
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.2,
			ease: "easeInOut"
		}
	}
}

export const widgetContentVariants = {
	initial: {
		opacity: 0,
		height: 0,
		transition: {
			duration: 0.2,
			ease: "easeInOut"
		}
	},
	animate: {
		opacity: 1,
		height: "auto",
		transition: {
			duration: 0.2,
			ease: "easeInOut"
		}
	}
}