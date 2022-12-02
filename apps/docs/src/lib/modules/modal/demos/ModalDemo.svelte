<script lang="ts">
	import { createModal } from '@grail-ui/svelte';
	import { scale } from 'svelte/transition';

	const { useModal, modalAttrs, titleAttrs, triggerAttrs, open } = createModal({
		portal: null,
		isDismissible: true,
	});
</script>

<button type="button" class="btn" {...$triggerAttrs} on:click={() => ($open = true)}>Open</button>

{#if $open}
	<div
		use:useModal
		{...$modalAttrs}
		transition:scale={{ duration: 200 }}
		class="absolute inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
	>
		<h3 {...$titleAttrs} class="text-lg font-medium leading-6 text-gray-900">Payment successful</h3>
		<div class="mt-2">
			<p class="text-sm text-gray-500">
				Your payment has been successfully submitted. We’ve sent you an email with all of the
				details of your order.
			</p>
		</div>

		<div class="mt-4">
			<button
				type="button"
				on:click={() => ($open = false)}
				class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
				>Got it, thanks!</button
			>
		</div>
	</div>
{/if}
