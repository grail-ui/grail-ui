import { vitePreprocess } from '@sveltejs/kit/vite';
import mm from 'micromatch';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	package: {
		source: 'src',
		exports: (filepath) => {
			return mm.isMatch(filepath, ['index.ts', '*/index.ts']);
		},
		files: (filepath) => {
			return !mm.isMatch(filepath, [
				'**/tests/**',
				'**/__tests__/**',
				'**/*.test.ts',
				'**/*.spec.ts',
			]);
		},
	},
};

export default config;
