<script lang="ts">
	import Prism from '$lib/prism/Prism.svelte';

	export let source: string;
	export let language: 'js' | 'svelte' | 'bash' = 'js';

	let _class = '';
	export { _class as class };
</script>

<Prism
	{source}
	{language}
	class="box-border max-h-96 p-3 text-[13px] leading-5 bg-base-300 overflow-y-auto {_class}"
	{...$$restProps}
/>
