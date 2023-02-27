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
				"sv-light": "#e2eafe",
				"sv-dark": "#10181F",
				"sv-black": "#1E1E1E",
				"sv-buymeacoffee": "#bd5fff",
				"sv-accent": "#FFAC4F",
				"sv-ring-dark": "#e2eafe59",
				"sv-ring-light": "#0e111159",
				"sv-input-dark": "#e2eafe1A",
				"sv-input-light": "#0e11111A",
				"sv-pomodoro-green": "#007F00",
				"sv-pomodoro-red": "#C13D46",
				// "sv-light90": "#e2eafee6",
				// "sv-dark90": "#0e1111e6",
				// "sv-light75": "#e2eafebf",
				// "sv-dark75": "#0e1111bf",
				// "sv-light50": "#e2eafe80",
				// "sv-dark50": "#0e111180",
				// "sv-light35": "#e2eafe59",
				// "sv-dark35": "#1E1E1E59",
				// "sv-light10": "#e2eafe1A",
				// "sv-dark10": "#1E1E1E1A",
				
				"spcms-dark": "#171c1c",
				"spcms-darkup": "#202727",
				"spcms-darkupup": "#293131",
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