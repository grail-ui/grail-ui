<script lang="ts">
	import type { LayoutData } from '$lib/layout/layout.types';
	import './app.css';
	import Header from '$lib/layout/Header.svelte';
	import { theme } from '$lib/layout/layout.store';
	import Fab from '$lib/layout/Fab.svelte';
	import Drawer from '$lib/layout/Drawer.svelte';

	export let data: LayoutData;

	const title = 'Grail UI';
	const description =
		'A library of accessible component primitives, actions and utilities for Svelte.';
	const domain = 'grail-ui.vercel.app';
	const deployUrl = `https://${domain}/`;
	const ogImageUrl = `${deployUrl}og.png`;
</script>

<svelte:head>
	<meta name="description" content={description} />

	<meta property="og:url" content={deployUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImageUrl} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={domain} />
	<meta property="twitter:url" content={deployUrl} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImageUrl} />
</svelte:head>

<div class="flex min-h-screen flex-col" data-theme={$theme}>
	<div class="sticky top-0 z-40"><Header /></div>
	<div class="flex flex-grow flex-col">
		<slot />
	</div>
	<Fab />
	<Drawer {data} />
</div>
