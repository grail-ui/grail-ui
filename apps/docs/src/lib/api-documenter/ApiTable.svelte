<script lang="ts">
	import { formatHtml } from '$lib/demo/demo.utils';
	import SectionHeader from '$lib/demo/SectionHeader.svelte';
	import data from '../../docs/api.json';
	import { getParamData, getParameters } from './helpers';

	export let hideDefault = false;

	export let definition: string;

	export let title = definition;

	$: params = getParameters(data, definition);

	// Remove known package types
	function removePackageType(str: string) {
		return str.replace(/(svelte\.)|(typescript\.)/g, () => '');
	}
</script>

{#if params}
	<SectionHeader id={definition} heading="h3">{title}</SectionHeader>

	<div class="not-prose -mx-4 overflow-x-auto sm:mx-0">
		<table class="table-compact md:table-normal table w-full min-w-[540px] sm:min-w-full">
			<thead>
				<tr>
					<th>Property</th>
					<th>Description</th>
					{#if !hideDefault}
						<th>Default</th>
					{/if}
				</tr>
			</thead>
			<tbody>
				{#each params as param}
					{@const data = getParamData(param)}
					{#if data}
						<tr>
							<th class="align-baseline"><div class="font-robotic badge">{data.name}</div></th>
							<td class="flex flex-col gap-2 whitespace-normal align-baseline">
								<div><code>{removePackageType(data.type)}</code></div>
								<div>{@html formatHtml(data.description)}</div>
							</td>
							{#if !hideDefault}
								<td class="align-baseline">{@html formatHtml(data.defaultValue) || '—'}</td>
							{/if}
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</div>
{/if}
