<script lang="ts">
	import GithubIcon from '~icons/mdi/github';
	import DiscordIcon from '~icons/mdi/discord';
	import { PUBLIC_DISCORD_URL, PUBLIC_GITHUB_URL, PUBLIC_NPM_URL } from '$env/static/public';
	import ThemeSwitch from './ThemeSwitch.svelte';
	import Logo from '$lib/Logo.svelte';
	import LogoType from '$lib/LogoType.svelte';

	const navLinks = [
		{ href: '/svelte/getting-started', label: 'Docs' },
		{ href: '/svelte', label: 'Components' },
	];
</script>

<!-- svelte-ignore missing-declaration -->
<svelte:head><meta name="built-at" content={__NOW__} /></svelte:head>

<header
	class="border-base-content/10 bg-base-100/90 supports-backdrop-blur:bg-white/60 z-50 flex-none border-b backdrop-blur"
>
	<div class="max-w-8xl mx-auto">
		<div class="mx-4 py-4 lg:mx-0 lg:px-8">
			<div class="flex items-center">
				<a class="mr-3 flex-none items-center overflow-hidden duration-200 md:w-auto" href="/">
					<div class="flex items-center gap-1.5">
						<div class="hidden sm:block"><Logo size="30" /></div>
						<LogoType height={30} />
					</div>
				</a>
				<!-- svelte-ignore missing-declaration -->
				<a
					href={PUBLIC_NPM_URL}
					class="bg-base-content/10 hover:bg-base-content/20 flex items-center space-x-2 rounded-full py-1 px-3 text-xs font-semibold leading-5"
					>v{__APP_ENV__}</a
				>

				<div class="ml-auto flex items-center">
					<nav class="hidden text-sm font-semibold leading-6 md:block">
						<ul class="flex space-x-8">
							{#each navLinks as { href, label } (href)}
								<li><a class="link-hover" {href}>{label}</a></li>
							{/each}
						</ul>
					</nav>
					<div class="ml-6 flex items-center gap-4 text-xl">
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
