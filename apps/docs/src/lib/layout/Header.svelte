<script lang="ts">
	/*global __NOW__, __APP_ENV__*/
	import GithubIcon from '~icons/mdi/github';
	import DiscordIcon from '~icons/mdi/discord';
	import LogoType from '~icons/grail/logotype';
	import { PUBLIC_DISCORD_URL, PUBLIC_GITHUB_URL, PUBLIC_NPM_URL } from '$env/static/public';
	import ThemeSwitch from './ThemeSwitch.svelte';
	import Logo from '$lib/Logo.svelte';

	const navLinks = [
		{ href: '/svelte/getting-started', label: 'Docs' },
		{ href: '/svelte', label: 'Components' },
	];
</script>

<!-- svelte-ignore missing-declaration -->
<svelte:head><meta name="built-at" content={__NOW__} /></svelte:head>

<header
	class="backdrop-blur flex-none z-50 border-b border-base-content/10 bg-base-100/90 supports-backdrop-blur:bg-white/60"
>
	<div class="max-w-8xl mx-auto">
		<div class="py-4 lg:px-8 mx-4 lg:mx-0">
			<div class="flex items-center">
				<a class="mr-3 flex-none overflow-hidden md:w-auto duration-200 items-center" href="/">
					<div class="flex items-center gap-1.5">
						<div class="hidden sm:block"><Logo size="30" /></div>
						<LogoType width="100%" height="30px" />
					</div>
				</a>
				<!-- svelte-ignore missing-declaration -->
				<a
					href={PUBLIC_NPM_URL}
					class="text-xs leading-5 font-semibold bg-base-content/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-base-content/20"
					>v{__APP_ENV__}</a
				>

				<div class="flex items-center ml-auto">
					<nav class="hidden md:block text-sm leading-6 font-semibold">
						<ul class="flex space-x-8">
							{#each navLinks as { href, label } (href)}
								<li><a class="link-hover" {href}>{label}</a></li>
							{/each}
						</ul>
					</nav>
					<div class="flex items-center ml-6 pl-6 gap-4 text-xl">
						<a
							href={PUBLIC_DISCORD_URL}
							class="text-base-content/60 hover:text-base-content"
							title="Discord"><DiscordIcon /></a
						>
						<a
							href={PUBLIC_GITHUB_URL}
							class="text-base-content/60 hover:text-base-content"
							title="Source code on GitHub"><GithubIcon /></a
						>
						<ThemeSwitch />
					</div>
				</div>
			</div>
		</div>
	</div>
</header>
