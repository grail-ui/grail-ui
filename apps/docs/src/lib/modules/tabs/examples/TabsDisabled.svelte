<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<p>
	To disable a specific tab, pass the <code>disabled: true</code> property to the
	<code>triggerAttrs</code>.
</p>
<p>
	When a tab is disabled, it is skipped from keyboard navigation and can't be interacted with.
	<Highlight
		source={`<button {...$triggerAttrs({ value: 'item-1', : disabled: true })}>Item 1</button>`}
		lines={[1]}
	/>
</p>
