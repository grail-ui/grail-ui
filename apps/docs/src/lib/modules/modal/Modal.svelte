<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';
	import ModalPortal from './examples/ModalPortal.svelte';

	const features = [
		'Focus is moved and contained within the modal while it is open, and returned to the trigger element when it is closed.',
		'Manages screen reader announcements for improved accessibility.',
		'Modal can be closed by interacting outside of it or pressing the`Escape` key.',
	];

	const api = [{ definition: 'ModalConfig' }, { definition: 'ModalReturn', hideDefault: true }];

	const examples = [{ component: ModalPortal, header: 'Custom portal container' }];

	const keyboard = [
		{ key: 'Esc', description: 'Closes the modal and moves focus to trigger element.' },
		{ key: 'Tab', description: 'Moves focus to the next focusable element.' },
		{ key: 'Shift + Tab', description: 'Moves focus to the previous focusable element.' },
	];
</script>

<ComponentLayout {features} {api} {examples} {keyboard} dependencies={['focus-trap']}>
	<svelte:fragment slot="anatomy">
		<p>Typically, a modal consists of:</p>

		<ul>
			<li><b>Trigger:</b> The element that opens the modal.</li>
			<li>
				<b>Modal:</b> The container element that consists of:
				<ul>
					<li><b>Title:</b> An optional element used as title of the modal.</li>
				</ul>
			</li>
		</ul>

		<Highlight
			source={`<scr` +
				`ipt>
	import { createModal } from '@grail-ui/svelte';

	const { useModal, modalAttrs, titleAttrs, triggerAttrs, open } = createModal();
</scr` +
				`ipt>

<button {...$triggerAttrs} on:click={() => ($open = true)}>Open</button>

{#if $open}
	<div use:useModal {...$modalAttrs}>
		<h3 {...$titleAttrs}>Title</h3>
		<div>
			Content
		</div>
	</div>
{/if}`}
		/>
	</svelte:fragment>

	<svelte:fragment slot="accessibility"
		>Adheres to the
		<a
			href="https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal"
			target="_blank"
			class="underline"
			rel="noreferrer noopener">Dialog WAI-ARIA design pattern</a
		>.</svelte:fragment
	>
</ComponentLayout>
