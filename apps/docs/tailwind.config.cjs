const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Mona Sans', ...defaultTheme.fontFamily.sans],
				robotic: ['Hubot Sans', ...defaultTheme.fontFamily.sans],
			},
			maxWidth: {
				'8xl': '90rem',
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
