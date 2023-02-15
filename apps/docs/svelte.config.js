import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess({
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
