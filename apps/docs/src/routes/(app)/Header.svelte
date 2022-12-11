<script lang="ts">
	/*global __NOW__, __APP_ENV__*/
	import GithubIcon from '~icons/mdi/github';
	import { PUBLIC_GITHUB_URL, PUBLIC_NPM_URL } from '$env/static/public';
</script>

<!-- svelte-ignore missing-declaration -->
<svelte:head><meta name="built-at" content={__NOW__} /></svelte:head>

<header
	class="backdrop-blur flex-none transition-colors duration-500 z-50 border-b border-base-content/10 bg-base-100/90 supports-backdrop-blur:bg-white/60"
>
	<div class="max-w-8xl mx-auto">
		<div class="py-4 lg:px-8 mx-4 lg:mx-0">
			<div class="flex items-center">
				<a
					class="mr-3 flex-none overflow-hidden md:w-auto inline-flex text-lg duration-200 md:text-3xl font-black font-robotic"
					style="font-stretch: extra-expanded;"
					href="/">Grail UI</a
				>
				<!-- svelte-ignore missing-declaration -->
				<a
					href={PUBLIC_NPM_URL}
					class="text-xs leading-5 font-semibold bg-base-content/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-base-content/20"
					>v{__APP_ENV__}</a
				>

				<div class="flex items-center ml-auto">
					<div class="flex items-center ml-6 pl-6 gap-6 ">
						<a href={PUBLIC_GITHUB_URL} class="text-base-content/60 hover:text-base-content"
							><span class="sr-only">Grail UI on GitHub</span><GithubIcon class="text-2xl" /></a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>
