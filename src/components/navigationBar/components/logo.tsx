export const Logo = () => {
	return (
		<div className="shadow-lg bg-sv-light dark:bg-sv-dark pointer-events-auto h-full px-[0.8em] corners flex justify-center items-center gap-2">
			{/* <img src="spaceverseLogo.webp" alt="SPACEVERSE" className="w-[90px]" /> */}
			<p className="font-koulen text-sv-black dark:text-sv-white text-lg tracking-widest mt-[2px]">SPACEVERSE</p>
			<p className="font-koulen text-sv-black dark:text-sv-white text-lg tracking-widest">|</p>
			<p className="font-koulen text-red-500 text-lg tracking-widest">BETA</p>
		</div>
	);
}

export default Logo;