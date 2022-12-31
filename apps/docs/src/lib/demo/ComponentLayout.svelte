<script lang="ts">
	import type { ComponentType } from 'svelte';
	import Accessibility from '$lib/demo/Accessibility.svelte';
	import Demo from '$lib/demo/Demo.svelte';
	import ApiTable from '$lib/api-documenter/ApiTable.svelte';
	import SectionHeader from './SectionHeader.svelte';
	import { formatHtml } from './demo.utils';
	import PackageManager from './package-manager/PackageManager.svelte';

	export let features: string[] = [];
	export let dependencies: ('focus-trap' | '@floating-ui/dom')[] = [];
	export let examples: { component: ComponentType; header?: string }[] = [];
	export let keyboard: { key: string | string[]; description: string }[] = [];

	export let api: { definition: string; hideDefault?: boolean; title?: string }[] = [];
</script>

<Demo />

{#if features.length > 0}
	<SectionHeader id="Features">Features</SectionHeader>

	<ul>
		{#each features as feature}
			<li>{@html formatHtml(feature)}</li>
		{/each}
	</ul>
{/if}

{#if dependencies.length > 0}
	<SectionHeader id="Dependencies">Dependencies</SectionHeader>

	{@const links = dependencies.map((m) => `<a href="https://www.npmjs.com/package/${m}">${m}</a>`)}
	<p>
		In order for this module to work you have to install {@html links.length < 3
			? links.join(' and ')
			: `${links.slice(0, -1).join(', ')}, and ${links.at(-1)}`}.
	</p>

	<PackageManager class="max-w-xl" command="add" options={dependencies} />
{/if}

{#if $$slots.anatomy}
	<SectionHeader id="Anatomy">Anatomy</SectionHeader>

	<slot name="anatomy" />
{/if}

{#if examples.length > 0}
	<SectionHeader id="Examples">Examples</SectionHeader>

	{#each examples as example}
		{@const header = example.header}
		{#if header}
			{@const id = header.split(' ').join('-')}
			<SectionHeader {id} heading="h3">{header}</SectionHeader>
		{/if}
		<p>
			<svelte:component this={example.component} />
		</p>
	{/each}
{/if}

{#if $$slots.accessibility || keyboard.length > 0}
	<SectionHeader id="Accessibility">Accessibility</SectionHeader>

	<slot name="accessibility" />
	<Accessibility {keyboard} />
{/if}

{#if api.length > 0}
	<SectionHeader id="API">API</SectionHeader>

	<slot name="api" />

	{#each api as _api (_api.definition)}
		<ApiTable {..._api} />
	{/each}
{/if}
