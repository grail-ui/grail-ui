<script lang="ts">
	import { fade } from 'svelte/transition';
	import PnpmIcon from '~icons/logos/pnpm';
	import YarnIcon from '~icons/logos/yarn';
	import NpmIcon from '~icons/logos/npm-icon';
	import CopyIcon from '~icons/ic/outline-content-copy';
	import CopiedIcon from '~icons/eva/checkmark-circle-outline';
	import { createTabs, createClipboard } from '@grail-ui/svelte';
	import Prism from '$lib/prism/Prism.svelte';
	import { getPackageManagerCommands, type PackageManager } from './packageManager.utils';

	export let title: string | undefined = undefined;
	export let command: 'add' | 'addDev';
	export let options: any = undefined;

	const frameworks: { label: PackageManager; icon: any }[] = [
		{ label: 'npm', icon: NpmIcon },
		{ label: 'pnpm', icon: PnpmIcon },
		{ label: 'yarn', icon: YarnIcon },
	];

	const { active, useTabs, rootAttrs, listAttrs, triggerAttrs, contentAttrs } = createTabs({
		defaultValue: 'npm',
	});
	const { isSupported, copy, copied } = createClipboard();

	let sourceElement: HTMLElement;

	$: source = getPackageManagerCommands($active as PackageManager)[command](options);
</script>

<div class:window={true} {...$$restProps}>
	<div class="py-2 px-4 flex">
		<div class="flex items-center gap-2" aria-hidden="true">
			{#each ['#ff5f57', '#febc2e', '#28c840'] as control}
				<div class="w-3 h-3 rounded-full" style:background-color={control} />
			{/each}
		</div>
		{#if title}<span class="mx-auto">{title}</span>{/if}
	</div>
	<div use:useTabs {...$rootAttrs}>
		<div class="relative">
			<div class="py-6 px-4 flex-grow text-sm" bind:this={sourceElement}>
				<div {...$contentAttrs($active)}>
					{#key $active}
						<div in:fade><Prism {source} language="bash" /></div>
					{/key}
				</div>
			</div>
			{#if isSupported}
				<div class="absolute right-2 top-1/2 -translate-y-1/2">
					<button
						type="button"
						title="Copy"
						on:click={() => copy(sourceElement)}
						class="btn btn-sm opacity-60 hover:opacity-100"
						>{#if $copied}<CopiedIcon />{:else}<CopyIcon />{/if}</button
					>
				</div>
			{/if}
		</div>
		<ul {...$listAttrs} class="frameworks flex">
			{#each frameworks as framework}
				<li {...$triggerAttrs(framework.label)} class="flex items-center gap-1.5 text-xs px-3 py-2">
					<svelte:component this={framework.icon} />
					{framework.label}
				</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="postcss">
	.window {
		overflow: hidden;
		flex-grow: 1;
		background-color: #000000d9;
		border-radius: 0.25em;
		color: #fff;
		box-shadow: 0 0 2em #0000004d;
		display: flex;
		flex-direction: column;
	}

	.frameworks {
		background-color: #414339;
	}

	.frameworks li {
		cursor: pointer;
	}

	.frameworks li:hover {
		background-color: #878787;
	}

	.frameworks li:global([data-state='active']) {
		background-color: #ffffff1a;
		cursor: default;
	}
</style>
