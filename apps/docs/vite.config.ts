import type { UserConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { promises as fs } from 'fs';
import Icons from 'unplugin-icons/vite';
import { version } from '../../packages/grail-ui/package.json';

const config: UserConfig = {
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
			customCollections: {
				grail: {
					logo: () => fs.readFile('./static/grail.svg', 'utf-8'),
					logotype: () => fs.readFile('./static/logotype.svg', 'utf-8'),
				},
			},
		}),
	],

	optimizeDeps: {
		include: [
			'focus-trap',
			'@floating-ui/dom',
			'change-case',
			'@stackblitz/sdk',
			'typedoc-json-parser',
			'highlight.js',
			'highlight.js/lib/core',
			'svelte-highlight',
		],
	},

	define: {
		__APP_ENV__: JSON.stringify(version),
		__NOW__: JSON.stringify(new Date().toISOString()),
	},
};

export default config;
