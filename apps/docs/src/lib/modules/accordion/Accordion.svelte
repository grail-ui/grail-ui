<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import Accessibility from '$lib/demo/Accessibility.svelte';
	import { Api, ApiTable } from '$lib/api-documenter';
</script>

<Demo />

<Accessibility
	keyboard={[
		{
			key: ['Space', 'Enter'],
			description: 'When focus is on an `useAccordionTrigger` element, toggles the section.',
		},
		{ key: 'Tab', description: 'Moves focus to the next focusable element.' },
		{ key: 'Shift + Tab', description: 'Moves focus to the previous focusable element.' },
		{ key: 'ArrowDown', description: 'Moves focus to the next `useAccordionTrigger` element.' },
		{ key: 'ArrowUp', description: 'Moves focus to the previous `useAccordionTrigger` element.' },
		{ key: 'Home', description: 'Moves focus to the first `useAccordionTrigger` element.' },
		{ key: 'End', description: 'Moves focus to the last `useAccordionTrigger` element.' },
	]}
>
	<p>
		Accordion keyboard interactions follows the recommendations of the <a
			href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/"
			target="_blank"
			class="underline"
			rel="noreferrer noopener">WAI-ARIA Authoring Practices</a
		>
		for accordions.
	</p>
	<p>
		Availability of accordion content to assistive technology requires the use of aria-controls and
		toggling aria-expanded as regions are expanded and collapsed.
	</p>
</Accessibility>

<Api>
	<ApiTable definition="AccordionSingleConfig" />
	<ApiTable definition="AccordionMultipleConfig" />
	<ApiTable definition="AccordionReturn" hideDefault />
	<ApiTable definition="AccordionParams" hideDefault />
	<ApiTable definition="AccordionItemParams" hideDefault />
</Api>
