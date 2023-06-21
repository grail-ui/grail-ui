<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

Pass <code>onSelect</code> to the <code>createMenu</code> function to perform some custom logic when
an item is selected. This callback is invoked with the <code>id</code> of the item.
<Highlight
	source={`createMenu({
	onSelect(id) {
		console.log(id);
	},
})`}
	lines={[2, 3, 4]}
/>
