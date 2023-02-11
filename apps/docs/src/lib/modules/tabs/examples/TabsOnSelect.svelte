<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

Pass <code>onValueChange</code> to the <code>createTabs</code> function to perform some custom logic
when a tab is selected. This callback is invoked with the <code>id</code> of the tab.

<Highlight
	source={`createTabs({
	onValueChange(value) {
		console.log(value);
	},
})`}
	lines={[2, 3, 4]}
/>
