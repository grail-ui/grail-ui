<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import Accessibility from '$lib/demo/Accessibility.svelte';
	import Api from '$lib/api-documenter/Api.svelte';
	import Dependency from '$lib/demo/Dependency.svelte';
</script>

<Demo />

<Dependency modules={['focus-trap']} />

<Accessibility
	keyboard={[
		{ key: 'Esc', description: 'Closes the dialog and moves focus to trigger element.' },
		{ key: 'Tab', description: 'Moves focus to the next focusable element.' },
		{ key: 'Shift + Tab', description: 'Moves focus to the previous focusable element.' },
	]}
	>Adheres to the

	<a
		href="https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal"
		target="_blank"
		class="underline"
		rel="noreferrer noopener">Dialog WAI-ARIA design pattern</a
	>

	.</Accessibility
>

<Api types={[{ definition: 'ModalConfig' }, { definition: 'ModalReturn', hideDefault: true }]} />
