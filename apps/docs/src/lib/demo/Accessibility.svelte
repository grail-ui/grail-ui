<script lang="ts" context="module">
	const KEY_ICONS: Record<string, any> = {
		ArrowDown: '▼',
		ArrowUp: '▲',
		ArrowLeft: '◀︎',
		ArrowRight: '▶︎',
	};
</script>

<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';

	export let title = 'Accessibility';

	export let keyboard: { key: string | string[]; description: string }[] = [];

	function getKeys(key: string | string[]): string[] {
		return Array.isArray(key) ? key : key.split(' ').map((s) => s.trim());
	}
</script>

{#if title}<SectionHeader id="Accessibility">{title}</SectionHeader>{/if}

<slot />

{#if keyboard.length > 0}
	<div class="my-4 font-semibold text-xl">Keyboard Interactions</div>
	<table class="table w-full">
		<thead>
			<tr>
				<th>Key</th>
				<th>description</th>
			</tr>
		</thead>
		<tbody>
			{#each keyboard as { key, description }}
				<tr>
					<td class="flex items-center gap-x-1">
						{#each getKeys(key) as _key}
							{#if _key === '+'}
								{_key}
							{:else}
								{@const icon = KEY_ICONS[_key]}
								<kbd class="kbd kbd-sm" title={icon ? _key : undefined}>
									{#if icon}
										{#if typeof icon === 'string'}
											{icon}
										{:else}
											<svelte:component this={icon} />
										{/if}
									{:else}
										{_key}
									{/if}
								</kbd>
							{/if}
						{/each}
					</td>
					<td class="whitespace-normal">{description}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
