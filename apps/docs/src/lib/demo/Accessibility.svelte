<script lang="ts" context="module">
	const KEY_ICONS: Record<string, string> = {
		ArrowDown: '▼',
		ArrowUp: '▲',
		ArrowLeft: '◀︎',
		ArrowRight: '▶︎',
	};
</script>

<script lang="ts">
	import { formatHtml } from './demo.utils';
	import SectionHeader from './SectionHeader.svelte';

	export let keyboard: { key: string | string[]; description: string }[] = [];

	function getKeys(key: string | string[]): string[] {
		return Array.isArray(key) ? key : key.split(' ').map((s) => s.trim());
	}
</script>

{#if keyboard.length > 0}
	<SectionHeader id="Keyboard-Interactions" heading="h3">Keyboard Interactions</SectionHeader>
	<div class="not-prose -mx-4 overflow-x-auto sm:mx-0">
		<table class="table-compact md:table-normal table w-full min-w-[540px] sm:min-w-full">
			<thead>
				<tr>
					<th>Key</th>
					<th>description</th>
				</tr>
			</thead>
			<tbody>
				{#each keyboard as { key, description }}
					<tr>
						<th>
							<div class="flex items-center gap-x-1">
								{#each getKeys(key) as _key}
									{#if _key === '+'}
										{_key}
									{:else}
										{@const icon = KEY_ICONS[_key]}
										<kbd class="kbd kbd-sm" title={icon ? _key : undefined}>
											{#if icon}
												{#if typeof icon === 'string'}
													{icon}
													<!-- {:else}
													<svelte:component this={icon} /> -->
												{/if}
											{:else}
												{_key}
											{/if}
										</kbd>
									{/if}
								{/each}
							</div>
						</th>
						<td class="whitespace-normal">{@html formatHtml(description)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
