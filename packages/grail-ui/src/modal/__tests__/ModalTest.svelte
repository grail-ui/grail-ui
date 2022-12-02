<script lang="ts">
	import type { ModalReturn } from '../modal.types';

	export let api: ModalReturn;

	const { useModal, modalAttrs, titleAttrs, triggerAttrs, open } = api;
</script>

<button type="button" {...$triggerAttrs} on:click={() => ($open = true)} data-testid="trigger"
	>Open</button
>

<div use:useModal {...$modalAttrs} data-testid="modal" style:display={$open ? '' : 'none'}>
	<h3 {...$titleAttrs}>Title</h3>
	<div>Content</div>
	<button type="button" on:click={() => ($open = false)}>Close</button>
	<button type="button" data-testid="focus">Initial Focus</button>
</div>
