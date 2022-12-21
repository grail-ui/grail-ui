<script lang="ts">
	import atomOneDark from 'highlight.js/styles/atom-one-dark.css?inline';
	import atomOneLight from 'highlight.js/styles/atom-one-light.css?inline';
	import { Theme, theme } from '$lib/layout/layout.store';
	import HighlightSvelte from './HighlightSvelte.svelte';

	export let source: string;
	export let lines: number[] | string = [];

	let _class = '';
	export { _class as class };

	let themeCss: string;
	$: themeCss = $theme === Theme.Dark ? atomOneDark : atomOneLight;
</script>

<svelte:head>
	{@html `<style>${themeCss}</style>`}
</svelte:head>

<div class="font-mono text-sm not-prose {_class}" {...$$restProps}>
	<HighlightSvelte code={source} {lines} />
</div>
