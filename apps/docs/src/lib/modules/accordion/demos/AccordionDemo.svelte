<script lang="ts">
	import { createAccordion } from '@grail-ui/svelte';
	import { scale } from 'svelte/transition';

	const { expanded, useAccordion, itemAttrs, triggerAttrs, contentAttrs } = createAccordion();
</script>

<ul use:useAccordion class="max-w-sm w-full rounded-lg bg-slate-100 divide-y divide-gray-300">
	<li {...$itemAttrs('item-1')} class="relative">
		<button {...$triggerAttrs('item-1')} class="font-medium text-md py-2 px-5 w-full text-left"
			>Accessibility</button
		>
		<div {...$contentAttrs('item-1')} class="overflow-hidden px-5 text-sm">
			<p>
				Accordion component is accessible by default, it follows <a
					href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/"
					target="_blank"
					rel="noreferrer noopener"
					class="underline">WAI-ARIA Authoring Practices</a
				>.
			</p>
		</div>
	</li>
	<li {...$itemAttrs('item-2')} class="relative">
		<h3>
			<button {...$triggerAttrs('item-2')} class="font-medium text-md py-2 px-5 w-full text-left"
				>Flexibility</button
			>
		</h3>
		<div {...$contentAttrs('item-2')} class="overflow-hidden px-5 text-sm">
			<p>You have total freedom over the look and feel.</p>
		</div>
	</li>
	<li {...$itemAttrs('item-3')} class="relative">
		<h3>
			<button {...$triggerAttrs('item-3')} class="font-medium text-md py-2 px-5 w-full text-left"
				>Animations</button
			>
		</h3>
		<div {...$contentAttrs('item-3')} class="overflow-hidden px-5 text-sm">
			{#if $expanded.has('item-3')}
				<p transition:scale={{ duration: 500 }}>
					You can use CSS or JavaScript to animate the Accordion. Yes, Svelte animations work too!
				</p>
			{/if}
		</div>
	</li>
</ul>

<style>
	button::after {
		position: absolute;
		display: block;
		height: 8px;
		width: 8px;
		transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		top: 15px;
		right: 15px;
		content: '';
		transform-origin: 75% 75%;
		transform: rotate(45deg);
		box-shadow: 2px 2px;
		pointer-events: none;
	}

	button:global([data-state='open'])::after {
		transform: rotate(225deg);
	}

	div {
		transition: padding 0.2s ease-in-out;
	}

	div:global([data-state='open']) {
		padding-bottom: 12px;
		max-height: 9000px;
	}

	div:global([data-state='closed']) {
		max-height: 0;
	}
</style>
