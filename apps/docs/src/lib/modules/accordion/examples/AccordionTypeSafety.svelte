<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<p>By default <code>createAccordion</code> will accept any <code>string</code> as a valid value.</p>
<p>
	If you want to narrow it down to specific values, you can use a generic like this
	<Highlight source={`createAccordion<'a' | 'b' | 'c'>()`} lines={[2]} />
</p>

<p>
	An expanded example would look like this:
	<Highlight
		source={`type AccordionKey = 'accessibility' | 'flexibility' | 'animations';

const {...} = createAccordion<AccordionKey>({ value: 'animations' });

const data: { key: AccordionKey, ... }[] = [
	...
]
`}
		lines={[1, 2, 3, 4, 5]}
	/>
</p>
