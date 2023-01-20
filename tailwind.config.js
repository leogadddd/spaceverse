/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	darkMode: 'class',
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"sv-white": "#F5F5F5",
				"sv-black": "#0e1111",
				"sv-buymeacoffee": "#bd5fff",
			},
			fontFamily: {
				'koulen': ["Koulen", "sans-serif"],
				'ubuntu': ["Ubuntu", "sans-serif"],
				'poppins': ["Poppins", "sans-serif"],
			}
		},
	},
	plugins: [],
}