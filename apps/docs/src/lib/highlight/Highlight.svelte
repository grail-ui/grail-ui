<script lang="ts">
	import { HighlightSvelte } from 'svelte-highlight';
	import atomOneDark from 'svelte-highlight/styles/atom-one-dark';
	import atomOneLight from 'svelte-highlight/styles/atom-one-light';
	import 'svelte-highlight/styles/github.css';
	import { Theme, theme } from '$lib/layout/layout.store';

	export let source: string;

	let _class = '';
	export { _class as class };
</script>

<svelte:head>
	{@html $theme === Theme.Dark ? atomOneDark : atomOneLight}
</svelte:head>

<div class="font-mono {_class}" {...$$restProps}>
	<HighlightSvelte code={source} />
</div>
