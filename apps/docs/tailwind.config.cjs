const defaultTheme = require('tailwindcss/defaultTheme');
const themes = require('daisyui/src/colors/themes');
const sharedTheme = {
	'--rounded-btn': '0.5rem',
};

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
			typography: {
				DEFAULT: {
					css: {
						color: 'var(--bc)',
						maxWidth: '100%',
					},
				},
			},
		},
	},
	daisyui: {
		themes: [
			{
				light: { ...themes['[data-theme=corporate]'], ...sharedTheme },
				dark: { ...themes['[data-theme=night]'], ...sharedTheme },
			},
		],
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	safelist: [
		{
			pattern: /(progress|alert)-/,
		},
	],
};
