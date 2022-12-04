<script lang="ts">
	import { createNumberInput } from '../numberInput';

	const { useNumberInput, inputAttrs, incrementAttrs, decrementAttrs, step } = createNumberInput({
		min: -100,
		max: 100,
	});

	let value = '';
</script>

<div data-testid="root" use:useNumberInput>
	<input data-testid="input" type="text" {...$inputAttrs} bind:value />
	<button data-testid="increment" {...$incrementAttrs}>+</button>
	<button data-testid="decrement" {...$decrementAttrs}>-</button>
</div>
<input data-testid="step" type="text" bind:value={$step} />
<input data-testid="value" type="text" bind:value />
