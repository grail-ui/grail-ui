<script lang="ts">
	import GithubIcon from '~icons/mdi/github';
	import { PUBLIC_GITHUB_URL } from '$env/static/public';
</script>

<header
	class="backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white/90 supports-backdrop-blur:bg-white/60"
>
	<div class="max-w-8xl mx-auto">
		<div class="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 mx-4 lg:mx-0">
			<div class="flex items-center">
				<a
					class="mr-3 flex-none overflow-hidden md:w-auto inline-flex text-lg duration-200 md:text-3xl font-black font-robotic"
					style="font-stretch: extra-expanded;"
					href="/">Grail UI</a
				>
				<button
					class="text-xs leading-5 font-semibold bg-slate-400/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20"
					type="button">v0.0.0</button
				>

				<div class="flex items-center ml-auto">
					<div class="flex items-center ml-6 pl-6 gap-6 ">
						<a href={PUBLIC_GITHUB_URL} class="text-slate-600 hover:text-black"
							><span class="sr-only">Grail UI on GitHub</span><GithubIcon class="text-2xl" /></a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>
