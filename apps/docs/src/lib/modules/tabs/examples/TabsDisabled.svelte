<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<p>To disable a specific tab, pass their respective keys to the factory function.</p>
<p>
	When a tab is disabled, it is skipped from keyboard navigation and can't be interacted with.
	<Highlight
		source={`createTabs({
	disabled: ['item-1'],
})`}
		lines={[2]}
	/>
</p>

<p>
	You can also disable the entire tabs by passing <code>disabled: true</code>.
	<Highlight
		source={`createTabs({
	disabled: true,
})`}
		lines={[2]}
	/>
</p>

<p>
	You can always modify the disabled tabs using the returned <code>disabled</code> writable store.
</p>
