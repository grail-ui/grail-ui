<script lang="ts">
	import type { NumberInputReturn } from '../numberInput.types';

	export let api: NumberInputReturn;

	const { useNumberInput, labelAttrs, inputAttrs, incrementAttrs, decrementAttrs } = api;
</script>

<div data-testid="root" use:useNumberInput>
	<div data-testid="label" {...$labelAttrs}>Enter number:</div>
	<input data-testid="input" type="text" {...$inputAttrs} />
	<button data-testid="increment" {...$incrementAttrs}>+</button>
	<button data-testid="decrement" {...$decrementAttrs}>-</button>
</div>
