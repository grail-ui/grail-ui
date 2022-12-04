<script lang="ts">
	export let value: string | number | null | undefined;
	export let name: string;

	const uid = `number-input-param-${name}`;
</script>

<div class="flex gap-1.5 items-center w-full justify-between">
	<label for={uid}>{name}:</label>
	<input id={uid} class="input input-bordered w-20 h-7 text-center" type="number" bind:value />
</div>

<style>
	/* Chrome, Safari, Edge, Opera */
	input[type='number']::-webkit-outer-spin-button,
	input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
