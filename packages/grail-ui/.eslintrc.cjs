module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/typescript',
	],
	plugins: ['svelte3', '@typescript-eslint', 'import'],
	ignorePatterns: ['*.cjs'],
	overrides: [
		{ files: ['*.svelte'], processor: 'svelte3/svelte3' },
		{
			files: ['src/**'],
			excludedFiles: ['*.test.ts', '**/__tests__/**'],
			rules: {
				'import/extensions': [
					'error',
					{
						ts: 'always',
					},
				],
			},
		},
	],
	settings: {
		'svelte3/typescript': () => require('typescript'),
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	rules: {
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		'import/order': [
			'error',
			{
				groups: [
					'type',
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
					'object',
					'unknown',
				],
				pathGroups: [],
				'newlines-between': 'ignore',
				warnOnUnassignedImports: true,
			},
		],
	},
};
