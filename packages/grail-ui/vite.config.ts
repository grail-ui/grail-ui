import type { UserConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { configDefaults } from 'vitest/config';

const config: UserConfig = {
	plugins: [sveltekit()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: 'vitest.setup.ts',
		include: ['src/**/*.test.ts'],
		coverage: {
			all: true,
			src: ['src/'],
			include: ['src/'],
			exclude: [
				...configDefaults.exclude,
				'**/index.ts',
				'**/*.types.ts',
				'**/{tests,__tests__}/**',
				'**/*.{test,spec}.ts',
				'util/**', // Exclude utilities
			],
			lines: 90,
			functions: 90,
			branches: 90,
			statements: 90,
		},
	},
};

export default config;
