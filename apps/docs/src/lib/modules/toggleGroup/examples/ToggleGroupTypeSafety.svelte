<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<p>
	By default <code>createToggleGroup</code> will accept any <code>string</code> as a valid value.
</p>
<p>
	If you want to narrow it down to specific values, you can use a generic like this
	<Highlight source={`createToggleGroup<'a' | 'b' | 'c'>()`} />
</p>

<p>
	An expanded example would look like this:
	<Highlight
		source={`type ToggleItemKey = 'accessibility' | 'flexibility' | 'animations';

const {...} = createToggleGroup<ToggleItemKey>({ value: 'animations' });

const data: { key: ToggleItemKey, ... }[] = [
	...
]
`}
		lines={[1, 2, 3, 4, 5]}
	/>
</p>
