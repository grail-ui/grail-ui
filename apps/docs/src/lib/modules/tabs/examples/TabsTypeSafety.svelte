<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<p>The <code>createTabs</code> function accepts any string as a valid value by default.</p>
<p>
	However, you can specify a set of specific values to be accepted by using a generic. For example:
	<Highlight source={`createTabs<'a' | 'b' | 'c'>()`} />
</p>

<p>
	To illustrate this in a more comprehensive manner, consider the following code:
	<Highlight
		source={`type TabsKey = 'recent' | 'popular' | 'trending';

const {...} = createTabs<TabsKey>({ value: 'recent' });

const data: { key: TabsKey, ... }[] = [
	...
]
`}
		lines={[3, 5]}
	/>
</p>
