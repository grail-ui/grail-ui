<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import Api from '$lib/api-documenter/Api.svelte';
	import Dependency from '$lib/demo/Dependency.svelte';
	import Features from '$lib/demo/Features.svelte';
	import Accessibility from '$lib/demo/Accessibility.svelte';
</script>

<Demo />

<Features
	list={[
		'Trigger and popover are automatically associated semantically using ARIA for improved accessibility.',
		'Popover can be closed by interacting outside of it or pressing the `Escape` key.',
		'Focus is moved and contained within the popover while it is open, and returned to the trigger element when it is closed.',
		'Customization options for side, alignment, offsets, and collision handling.',
	]}
/>

<Dependency modules={['focus-trap', '@floating-ui/dom']} />

<Accessibility
	keyboard={[
		{ key: 'Esc', description: 'Closes the popover and moves focus to trigger element.' },
		{ key: 'Tab', description: 'Moves focus to the next focusable element.' },
		{ key: 'Shift + Tab', description: 'Moves focus to the previous focusable element.' },
	]}
/>

<Api
	types={[
		{ definition: 'PopoverConfig' },
		{ definition: 'PopoverReturn', hideDefault: true },
		{ definition: 'PositioningOptions' },
	]}
/>
