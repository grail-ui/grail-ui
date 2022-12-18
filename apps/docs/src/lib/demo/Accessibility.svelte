<script lang="ts" context="module">
	const KEY_ICONS: Record<string, any> = {
		ArrowDown: '▼',
		ArrowUp: '▲',
		ArrowLeft: '◀︎',
		ArrowRight: '▶︎',
	};
</script>

<script lang="ts">
	import { formatHtml } from './demo.utils';
	import { Section, SectionHeader } from './section';

	export let keyboard: { key: string | string[]; description: string }[] = [];

	const title = 'Accessibility';

	function getKeys(key: string | string[]): string[] {
		return Array.isArray(key) ? key : key.split(' ').map((s) => s.trim());
	}
</script>

<Section>
	<SectionHeader id={title}>{title}</SectionHeader>
	<slot />
</Section>

{#if keyboard.length > 0}
	<Section>
		<SectionHeader id="Keyboard-Interactions" heading="h3">Keyboard Interactions</SectionHeader>
		<div class="overflow-x-auto -mx-4 sm:mx-0">
			<table class="table table-compact md:table-normal w-full min-w-[540px] sm:min-w-full">
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
													{:else}
														<svelte:component this={icon} />
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
	</Section>
{/if}
