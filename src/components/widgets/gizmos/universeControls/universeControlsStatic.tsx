export const UniverseControlsStatic = () => {

	return (
		<div className="absolute bottom-2 shadow-lg bg-sv-light dark:bg-sv-dark pointer-events-auto corners left-2/4 -translate-x-2/4 w-[35%] min-w-[400px] min-h-[300px] h-[20%]">
			<UniverseControlsStaticBar />
			<div className='dark:bg-sv-light bg-sv-black h-[1px] opacity-30'></div>
			<div className="flex justify-center items-center">
				<h1 className="text-sv-black dark:text-sv-white">Static Universe Controller</h1>
			</div>
		</div>
	)
}

export const UniverseControlsStaticBar = () => {

	return (
		<div className={`handle-area h-[40px]`}>
			<div className='px-3 py-2 flex flex-row items-center justify-center'>
				<div>
					<h1 className='text-sv-black dark:text-sv-white'>Universe</h1>
				</div>
				<div className='flex justify-center items-center'>
					
				</div>
			</div>
		</div>
	)
}

export default UniverseControlsStatic