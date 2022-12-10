import StackBlitzSDK from '@stackblitz/sdk';

export function open(source: string, componentName: string) {
	StackBlitzSDK.openProject(
		{
			files: {
				['src/routes/app.css']: `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: system-ui;
  background-image: linear-gradient(330deg, hsl(272, 53%, 50%) 0%, hsl(226, 68%, 56%) 100%);
}`,

				['src/routes/+layout.svelte']: `<script lang="ts">
import './app.css';
</script>

<div class="flex flex-col items-center justify-center bg-transparent min-h-screen">
	<slot />
</div>`,
				['src/routes/+page.svelte']: source,
				['src/app.html']: `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width" />
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>`,

				['package.json']: JSON.stringify(
					{
						name: 'grailui-sveltekit-template',
						version: '0.0.0',
						scripts: {
							dev: 'vite dev',
						},
						devDependencies: {
							'@grail-ui/svelte': 'latest',
							'focus-trap': 'latest',
							'@floating-ui/dom': 'latest',
							'@sveltejs/adapter-auto': '1.0.0-next.90',
							'@sveltejs/kit': '1.0.0-next.572',
							autoprefixer: '10.4.2',
							daisyui: '2.6.0',
							postcss: '8.4.7',
							'postcss-load-config': '3.1.3',
							svelte: '3.46.0',
							'svelte-preprocess': '4.10.7',
							tailwindcss: '^3.0.23',
							typescript: '4.9.3',
							vite: '3.2.5',
						},
						type: 'module',
					},
					null,
					2
				),

				['postcss.config.cjs']: `module.exports = {
  plugins: [require('tailwindcss'),
  require('autoprefixer')],
};`,

				['svelte.config.js']: `import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

const config = {

	preprocess: [
		preprocess({
			postcss: true,
		}),
	],

  kit: {
    adapter: adapter(),
  },
};

export default config;`,

				['tailwind.config.cjs']: `module.exports = {
  content: ['./src/routes/**/*.{svelte,js,ts}'],
  plugins: [require('daisyui')],
};`,

				['vite.config.ts']: `import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()]
};

export default config;`,

				['tsconfig.json']: JSON.stringify(
					{
						extends: './.svelte-kit/tsconfig.json',
						compilerOptions: {
							allowJs: true,
							checkJs: true,
							esModuleInterop: true,
							forceConsistentCasingInFileNames: true,
							resolveJsonModule: true,
							skipLibCheck: true,
							sourceMap: true,
							strict: true,
						},
					},
					null,
					2
				),

				['.gitignore']: `.DS_Store
node_modules
/build
/.svelte-kit
/package
.env
.env.*
!.env.example
.vercel
.output
vite.config.js.timestamp-*
vite.config.ts.timestamp-*`,
			},
			template: 'node',
			title: `Grail UI - ${componentName}`,
			description: `Example usage of the "${componentName}"`,
			tags: ['grail-ui', 'svelte', 'sveltekit'],
		},

		// Options
		{
			newWindow: true,
			openFile: 'src/routes/+page.svelte',
		}
	);
}
