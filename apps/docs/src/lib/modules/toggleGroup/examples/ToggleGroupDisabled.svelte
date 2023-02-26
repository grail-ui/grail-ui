<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<p>To disable specific toggle items, pass their respective keys to the factory function.</p>
<p>
	When a toggle item is disabled, it is skipped from keyboard navigation and can't be interacted
	with.
	<Highlight
		source={`createToggleGroup({
	disabled: ['item-1'],
})`}
		lines={[2]}
	/>
</p>

<p>
	You can also disable the entire toggle group by passing <code>disabled: true</code>.
	<Highlight
		source={`createToggleGroup({
	disabled: true,
})`}
		lines={[2]}
	/>
</p>

<p>
	You can always modify the disabled items using the returned <code>disabled</code> writable store.
</p>
