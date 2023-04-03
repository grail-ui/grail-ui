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

<div
	class="border-base-content/20 bg-base-100 flex flex-wrap items-center justify-center gap-5 rounded border p-8"
>
	<div use:useNumberInput class="flex flex-col gap-1">
		<div class="flex flex-col">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="text-center" {...$labelAttrs}>Enter number:</label>
			<div class="flex scale-90 gap-1">
				<button class="btn text-xl" {...$decrementAttrs}>-</button>
				<input
					class="input input-bordered w-44 text-center text-xl {$invalid
						? 'border-4 border-red-600'
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
