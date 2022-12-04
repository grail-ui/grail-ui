<script lang="ts">
	import { createNumberInput } from '@grail-ui/svelte';
	import NumberInputParams from './NumberInputParams.svelte';

	const {
		useNumberInput,
		labelAttrs,
		inputAttrs,
		incrementAttrs,
		decrementAttrs,
		min,
		max,
		step,
		invalid,
	} = createNumberInput({
		min: -100,
		max: 100,
	});

	let value = '';
</script>

<div class="flex gap-5 items-center justify-center flex-wrap">
	<div use:useNumberInput class="flex flex-col gap-1">
		<div class="flex flex-col">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="text-center" {...$labelAttrs}>Enter number:</label>
			<div class="flex gap-1 scale-90">
				<button class="btn text-xl" {...$decrementAttrs}>-</button>
				<input
					class="input input-bordered text-xl w-44 text-center {$invalid
						? 'border-red-600 border-4'
						: ''}"
					type="text"
					{...$inputAttrs}
					bind:value
				/>
				<button class="btn text-xl" {...$incrementAttrs}>+</button>
			</div>
		</div>
	</div>

	<div class="flex flex-col gap-2">
		<NumberInputParams name="min" bind:value={$min} />
		<NumberInputParams name="max" bind:value={$max} />
		<NumberInputParams name="step" bind:value={$step} />
	</div>
</div>
