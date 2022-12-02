import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],

	kit: {
		adapter: adapter(),

		alias: {
			'@grail-ui/svelte': `../../packages/grail-ui/src/index.ts`,
		},
	},
};

export default config;
