<script lang="ts">
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
</script>

{#if params}
	{#if title}<div class="my-4 font-semibold text-2xl">{title}</div>{/if}

	<table class="table w-full">
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
				<th>Type</th>
				{#if !hideDefault}
					<th>Default</th>
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each params as param}
				{@const data = getParamData(param)}
				<tr>
					<td>{data.name}</td>
					<td class="whitespace-normal">{@html data.description}</td>
					<td>{data.type}</td>
					{#if !hideDefault}
						<td class="font-mono">{@html data.defaultValue || '<div class="px-1">—</div>'}</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
