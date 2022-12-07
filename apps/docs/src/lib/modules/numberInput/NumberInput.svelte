<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import Accessibility from '$lib/demo/Accessibility.svelte';
	import ApiTable from '$lib/api-documenter/ApiTable.svelte';
</script>

<Demo />

<Accessibility
	keyboard={[
		{ key: ['ArrowUp', 'PageUp'], description: 'Increment value to the next step.' },
		{ key: ['ArrowDown', 'PageDown'], description: 'Decrement value to the previous next step.' },
		{
			key: ['Shift+ArrowUp', 'Shift+PageUp'],
			description: 'Increment value  with the step multiplied by ten.',
		},
		{
			key: ['Shift+ArrowDown', 'Shift+PageDown'],
			description: 'Decrement value with the step multiplied by ten.',
		},
		{ key: 'Home', description: 'Set input to minimum value.' },
		{ key: 'End', description: 'Set input to maximum allowed value.' },
	]}
/>

<ApiTable definition="NumberInputConfig" />
<ApiTable definition="NumberInputReturn" hideDefault />
