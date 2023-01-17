export const Logo = () => {
	return (
		<div className="bg-sv-white dark:bg-sv-black  h-full px-[0.8em] corners flex justify-center items-center gap-2">
			{/* <img src="spaceverseLogo.webp" alt="SPACEVERSE" className="w-[90px]" /> */}
			<p className="font-koulen text-sv-black dark:text-sv-white text-lg tracking-widest">SPACEVERSE</p>
			<p className="font-koulen text-sv-black dark:text-sv-white text-lg tracking-widest">|</p>
			<p className="font-koulen text-red-500 text-lg tracking-widest">BETA</p>
		</div>
	);
}

export default Logo;