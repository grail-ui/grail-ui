<script lang="ts">
	import { createRangeSlider } from '@grail-ui/svelte';

	const { values, useRangeSlider, rangeAttrs, trackAttrs, thumbAttrs, labelAttrs } =
		createRangeSlider({
			initialValues: [15, 42, 77],
		});
	const {
		values: values2,
		useRangeSlider: useRangeSlider2,
		rangeAttrs: rangeAttrs2,
		thumbAttrs: thumbAttrs2,
		trackAttrs: trackAttrs2,
	} = createRangeSlider({
		initialValues: [22, 88],
		orientation: 'vertical',
	});
</script>

<div class="flex flex-col gap-4">
	<div class="flex justify-between">
		<label {...$labelAttrs}>Quantity</label>
		<div>{$values}</div>
	</div>

	<div use:useRangeSlider class="w-44 h-4 flex items-center mb-10">
		<div class="w-full bg-gray-700 h-1.5 rounded-md" {...$trackAttrs} />
		<div class="h-1.5 bg-pink-300" {...$rangeAttrs} />
		<div class="rounded-full w-4 h-4 bg-yellow-400" {...$thumbAttrs(0)} />
		<div class="rounded-full w-4 h-4 bg-blue-400" {...$thumbAttrs(1)} />
		<div class="rounded-full w-4 h-4 bg-red-400" {...$thumbAttrs(2)} />
	</div>
</div>

{$values2}
<div use:useRangeSlider2 class="w-6 h-44 flex justify-center">
	<div class="bg-blue-800 w-2 h-full" {...$trackAttrs2} />
	<div class="w-2 bg-violet-200" {...$rangeAttrs2} />
	<div class="rounded-full w-6 h-6 bg-yellow-400" {...$thumbAttrs2(0)} />
	<div class="rounded-full w-6 h-6 bg-green-500" {...$thumbAttrs2(1)} />
</div>
