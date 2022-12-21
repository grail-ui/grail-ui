<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import Accessibility from '$lib/demo/Accessibility.svelte';
	import Api from '$lib/api-documenter/Api.svelte';
	import Features from '$lib/demo/Features.svelte';
</script>

<Demo />

<Features
	list={[
		'Clamp value between a configurable minimum and maximum, and snap to step values.',
		'Round values to a specific number of fraction digits & handle floating point rounding errors.',
		'Press and hold the stepper buttons to continuously increment or decrement.',
		'Use the keyboard to increment and decrement the value according to the step value.',
		'Use the scroll wheel to increment and decrement the value.',
	]}
/>

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

<Api
	types={[
		{ definition: 'NumberInputConfig' },
		{ definition: 'NumberInputReturn', hideDefault: true },
	]}
/>
