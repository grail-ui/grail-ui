import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import { version } from '../../packages/grail-ui/package.json';

const config: UserConfig = {
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
		}),
	],

	define: {
		__APP_ENV__: JSON.stringify(version),
		__NOW__: JSON.stringify(new Date().toISOString()),
	},
};

export default config;
