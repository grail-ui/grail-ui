import preprocess from 'svelte-preprocess';
import mm from 'micromatch';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	package: {
		source: 'src',
		exports: (filepath) => {
			return mm.isMatch(filepath, ['index.ts', '*/index.ts']);
		},
		files: (filepath) => {
			return !mm.isMatch(filepath, ['**/tests/**']);
		},
	},
};

export default config;
