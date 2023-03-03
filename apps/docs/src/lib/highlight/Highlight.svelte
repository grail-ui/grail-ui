<script lang="ts">
	import atomOneDark from 'highlight.js/styles/atom-one-dark.css?inline';
	import atomOneLight from 'highlight.js/styles/atom-one-light.css?inline';
	import { theme } from '$lib/layout/layout.store';
	import HighlightSvelte from './HighlightSvelte.svelte';

	export let source: string;
	export let lines: number[] | string = [];

	let _class = '';
	export { _class as class };

	let themeCss: string;
	$: themeCss = $theme === 'dark' ? atomOneDark : atomOneLight;
</script>

<svelte:head>
	{@html `<style>${themeCss}</style>`}
</svelte:head>

<div class="not-prose font-mono text-sm {_class}" {...$$restProps}>
	<HighlightSvelte code={source} {lines} />
</div>
