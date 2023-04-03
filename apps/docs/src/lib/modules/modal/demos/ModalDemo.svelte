<script lang="ts">
	import { createModal } from '@grail-ui/svelte';

	const { useModal, modalAttrs, titleAttrs, triggerAttrs, open } = createModal({
		portal: null,
		open: false,
		dismissible: true,
	});
</script>

<button type="button" class="btn" {...$triggerAttrs} on:click={() => ($open = true)}>Modal</button>

<div use:useModal class="modal absolute" class:modal-open={$open}>
	<div {...$modalAttrs} class="modal-box">
		<h3 {...$titleAttrs} class="text-lg font-medium leading-6">Payment successful</h3>
		<div class="mt-2">
			<p class="text-sm">
				Your payment has been successfully submitted. We’ve sent you an email with all of the
				details of your order.
			</p>
		</div>

		<div class="modal-action">
			<button class="btn" type="button" on:click={() => ($open = false)}>Got it, thanks!</button>
		</div>
	</div>
</div>
