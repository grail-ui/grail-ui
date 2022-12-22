<script lang="ts">
	import { formatHtml } from './demo.utils';
	import SectionHeader from './SectionHeader.svelte';

	export let list: string[];
</script>

<SectionHeader id="Features">Features</SectionHeader>

<ul>
	{#each list as feature}
		<li>{@html formatHtml(feature)}</li>
	{/each}
</ul>
