<script lang="ts">
	import { fade } from 'svelte/transition';
	import PnpmIcon from '~icons/logos/pnpm';
	import YarnIcon from '~icons/logos/yarn';
	import NpmIcon from '~icons/logos/npm-icon';
	import CopyIcon from '~icons/ic/outline-content-copy';
	import CopiedIcon from '~icons/eva/checkmark-circle-outline';
	import { createTabs, createClipboard } from '@grail-ui/svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';
	import { getPackageManagerCommands } from './packageManager.utils';
	import type { PackageManager } from './packageManager.utils';
	import { packageManager, setPackageManager } from '$lib/layout/layout.store';

	export let command: 'add' | 'addDev';
	export let options: any = undefined;

	const frameworks: { label: PackageManager; icon: any }[] = [
		{ label: 'npm', icon: NpmIcon },
		{ label: 'pnpm', icon: PnpmIcon },
		{ label: 'yarn', icon: YarnIcon },
	];

	const { active, useTabs, rootAttrs, listAttrs, triggerAttrs, contentAttrs } =
		createTabs<PackageManager>({
			value: $packageManager,
			onValueChange: (value) => value && setPackageManager(value),
		});
	const { isSupported, copy, copied } = createClipboard();

	let sourceElement: HTMLElement;

	$: source = getPackageManagerCommands($active as PackageManager)[command](options);
</script>

<div use:useTabs class:not-prose={true} {...$rootAttrs} {...$$restProps}>
	<div {...$listAttrs} class="flex border-b-2 border-base-content/20">
		{#each frameworks as { label, icon } (label)}
			<button
				{...$triggerAttrs(label)}
				class="tab gap-2 -mb-0.5 border-b-2 border-transparent"
				class:tab-active={$active === label}
			>
				<svelte:component this={icon} />
				{label}
			</button>
		{/each}
	</div>
	{#if $active}
		<div class="relative group min-h-12">
			<div class="flex-grow text-sm" bind:this={sourceElement}>
				<div {...$contentAttrs($active)}>
					{#key $active}
						<div in:fade><Highlight {source} /></div>
					{/key}
				</div>
			</div>
			{#if isSupported}
				<div class="absolute right-2 top-1/2 -translate-y-1/2">
					<button
						type="button"
						title="Copy"
						on:click={() => copy(sourceElement)}
						class="btn btn-sm opacity-50 group-hover:opacity-100"
						>{#if $copied}<CopiedIcon />{:else}<CopyIcon />{/if}</button
					>
				</div>
			{/if}
		</div>
	{/if}
</div>
