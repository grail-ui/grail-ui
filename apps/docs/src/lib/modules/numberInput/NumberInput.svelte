<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';
	import NumberInputMinMax from './examples/NumberInputMinMax.svelte';

	const features = [
		'Clamp value between a configurable minimum and maximum, and snap to step values.',
		'Round values to a specific number of fraction digits & handle rounding errors.',
		'Press and hold the stepper buttons to continuously increment or decrement.',
		'Use the keyboard to increment and decrement the value according to the step value.',
		'Use the scroll wheel to increment and decrement the value.',
	];

	const api = [
		{ definition: 'NumberInputConfig' },
		{ definition: 'NumberInputReturn', hideDefault: true },
	];

	const examples = [{ component: NumberInputMinMax, header: 'Minimum and maximum' }];

	const keyboard = [
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
	];
</script>

<ComponentLayout {features} {api} {examples} {keyboard}>
	<svelte:fragment slot="anatomy">
		<p>Typically, a number input consists of:</p>

		<ul>
			<li><b>Root:</b> The element that listens to all events.</li>
			<li class="list-none">
				<ul>
					<li>
						<b>Input:</b> The element that shows current value and allows user to type a new value.
					</li>
					<li><b>Label:</b> The accessible label for the input.</li>
					<li><b>Increment:</b> The optional spin button to increment the value.</li>
					<li><b>Decrement:</b> The optional spin button to decrement the value.</li>
				</ul>
			</li>
		</ul>

		<Highlight
			source={`<scr` +
				`ipt>
	import { createNumberInput } from '@grail-ui/svelte';

	const { useNumberInput, labelAttrs, inputAttrs, incrementAttrs, decrementAttrs, } = createNumberInput();
</scr` +
				`ipt>

<div use:useNumberInput>
	<label {...$labelAttrs}>Enter number:</label>
	<button {...$decrementAttrs}>-</button>
	<input type="text" {...$inputAttrs} bind:value />
	<button {...$incrementAttrs}>+</button>
</div>`}
		/>
	</svelte:fragment>
</ComponentLayout>
