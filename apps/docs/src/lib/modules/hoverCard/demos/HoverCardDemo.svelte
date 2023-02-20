<script lang="ts">
	import { createHoverCard } from '@grail-ui/svelte';
	import { fade } from 'svelte/transition';
	import { PUBLIC_GITHUB_URL } from '$env/static/public';
	import GrailUIPreview from './GrailUIPreview.svelte';

	const { useHoverCardTrigger, useHoverCard, arrowAttrs, open } = createHoverCard();
</script>

<a use:useHoverCardTrigger href={PUBLIC_GITHUB_URL}
	><img
		src="https://avatars.githubusercontent.com/u/106253289?s=200&v=4"
		alt="Grail UI"
		class="rounded-full h-11 w-11"
	/></a
>

{#if $open}
	<div use:useHoverCard class="bg-white rounded-md z-20" in:fade={{ duration: 150 }}>
		<GrailUIPreview />
		<div {...$arrowAttrs} />
	</div>
{/if}
