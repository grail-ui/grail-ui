<script lang="ts">
	import type { ComponentType } from 'svelte';
	import Accessibility from '$lib/demo/Accessibility.svelte';
	import Demo from '$lib/demo/Demo.svelte';
	import ApiTable from '$lib/api-documenter/ApiTable.svelte';
	import SectionHeader from './SectionHeader.svelte';
	import { formatHtml } from './demo.utils';

	export let features: string[] = [];
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

	<Accessibility {keyboard} title="">
		<slot name="accessibility" />
	</Accessibility>
{/if}

{#if api.length > 0}
	<SectionHeader id="API">API</SectionHeader>

	<slot name="api" />

	{#each api as _api (_api.definition)}
		<ApiTable {..._api} />
	{/each}
{/if}
