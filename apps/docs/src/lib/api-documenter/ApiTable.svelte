<script lang="ts">
	import { formatHtml } from '$lib/demo/demo.utils';
	import SectionHeader from '$lib/demo/SectionHeader.svelte';
	import data from '../../docs/api.json';
	import { getComment, getType, getParameters } from './helpers';

	export let hideDefault = false;

	export let definition: string;

	export let title = definition;

	$: params = getParameters(data as any, definition);

	function getParamData(param: any) {
		const { description = '', blockTags = [] } = getComment(param) || {};

		return {
			name: `${param.name}${param.flags.isOptional ? '?' : ''}`,
			description: description ?? '—',
			defaultValue: blockTags.find((t) => t.name === 'defaultValue')?.text,
			type: getType(param),
		};
	}

	// Remove known package types
	function removePackageType(str: string) {
		return str.replace(/(svelte\.)|(typescript\.)/g, () => '');
	}
</script>

{#if params}
	<SectionHeader id={definition}>{title}</SectionHeader>

	<table class="table table-compact md:table-normal w-full">
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
				<tr>
					<td class="align-baseline"><div class="font-robotic badge">{data.name}</div></td>
					<td class="align-baseline whitespace-normal flex flex-col gap-2">
						<div><code>{removePackageType(data.type)}</code></div>
						<div>{@html formatHtml(data.description)}</div>
					</td>
					{#if !hideDefault}
						<td class="align-baseline">{@html formatHtml(data.defaultValue) || '—'}</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
