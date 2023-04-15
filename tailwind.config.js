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
				"sv-black": "#1E1E1E",

				// SpApp

				"sv-light": "#e2eafe",
				"sv-dark": "#10181F",
				"sv-buymeacoffee": "#bd5fff",
				"sv-accent": "#FFAC4F",
				"sv-ring-dark": "#e2eafe59",
				"sv-ring-light": "#0e111159",
				"sv-input-dark": "#e2eafe1A",
				"sv-input-light": "#0e11111A",
				"sv-pomodoro-green": "#007F00",
				"sv-pomodoro-red": "#C13D46",
				"sv-whatsnew-li-dark": "#b4b7b9",

				"sv-error-black": "#ce636a",
				"sv-error-dark": "#872b31",

				// SpCMS

				"spcms-dark": "#10181F",
				"spcms-darkup": "#e2eafe1A",
				"spcms-darkupup": "#192530",

				// SpWeb

				"spweb-dark": "#10181F",
				"spweb-darkup": "#192530",
			},
			fontFamily: {
				'koulen': ["Koulen", "sans-serif"],
				'ubuntu': ["Ubuntu", "sans-serif"],
				'poppins': ["Poppins", "sans-serif"],
				'barlow-condensed': ["Barlow Condensed", "sans-serif"],
			}
		},
	},
	plugins: [],
}