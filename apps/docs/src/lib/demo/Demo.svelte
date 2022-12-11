<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import DemoLinkIcon from '~icons/iconoir/open-in-window';
	import CodeIcon from '~icons/ic/outline-code';
	import CodeOffIcon from '~icons/ic/outline-code-off';
	import CopyIcon from '~icons/mdi/content-copy';
	import StackBlitzIcon from '~icons/simple-icons/stackblitz';
	import { pascalCase } from 'change-case';
	import { createClipboard } from '@grail-ui/svelte';
	import Code from './Code.svelte';
	import { open as openStackBlitz } from './stackblitz';

	export let dir = $page.data.slug;
	export let file = pascalCase($page.data.slug);
	export let language: 'js' | 'svelte' | 'bash' = 'svelte';

	let source = '';
	let showSource = false;

	async function loadSource() {
		const demos = import.meta.glob('../../lib/modules/*/demos/*Demo.svelte', { as: 'raw' });
		source = await demos[`../modules/${dir}/demos/${file}Demo.svelte`]();
	}

	async function loadComponent() {
		return (await import(`../modules/${dir}/demos/${file}Demo.svelte`)).default;
	}

	function getDemoUrl(): string {
		const url = `/demo/${dir}`;
		if (file.toLowerCase() !== dir.toLowerCase()) {
			return `${url}/${file}`;
		}

		return url;
	}

	onMount(() => {
		loadSource();
	});

	const { isSupported, copy, copied } = createClipboard();
</script>

<div
	class="wrapper relative py-16 px-10 flex flex-col justify-center rounded-t-md min-h-[400px]"
	class:rounded-b-md={!showSource}
	data-theme="light"
>
	<div class="flex flex-col items-center justify-center bg-transparent">
		<slot>
			{#await loadComponent()}
				<button class="btn btn-ghost loading">Loading...</button>
			{:then component}
				<svelte:component this={component} />
			{/await}
		</slot>
	</div>
	<div class="absolute inset-x-0 bottom-0 z-10 m-[2px]">
		<div class="flex items-stretch justify-end px-2 py-1 gap-1">
			<button
				type="button"
				on:click={() => (showSource = !showSource)}
				class="btn btn-sm glass normal-case font-normal text-xs"
				>{#if showSource}<CodeOffIcon class="mr-1" /> Hide{:else}<CodeIcon class="mr-1" /> Show{/if}
				code</button
			>
			{#if isSupported}
				<button
					type="button"
					on:click={() => copy(source)}
					class="btn btn-sm glass normal-case font-normal text-xs w-24"
					>{#if $copied}Copied!{:else}<CopyIcon class="mr-1" />Copy{/if}</button
				>
			{/if}
			<div class="my-2 w-[2px] grow-0 bg-black bg-opacity-10" />
			<button
				type="button"
				on:click={() => openStackBlitz(source, file)}
				class="btn btn-sm glass"
				title="Open in StackBlitz"><StackBlitzIcon /></button
			>
			<a href={getDemoUrl()} class="btn btn-sm glass normal-case font-normal" title="View demo"
				><DemoLinkIcon /></a
			>
		</div>
	</div>
</div>

{#if showSource}
	<div in:fade>
		<Code {source} {language} />
	</div>
{/if}

<style>
	.wrapper {
		background-image: linear-gradient(to right, #6366f1, #38bdf8);
	}
</style>
