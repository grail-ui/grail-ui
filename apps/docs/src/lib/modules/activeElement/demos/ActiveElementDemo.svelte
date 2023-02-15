<script lang="ts">
	import { activeElement } from '@grail-ui/svelte';

	$: activeInputKey = $activeElement?.dataset.key;
</script>

<div class="min-w-[400px] flex flex-col gap-1">
	<p>Focus the inputs below to see the changes</p>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-2">
		{#each [1, 2, 3, 4, 5, 6] as index}
			<input type="text" data-key={index} class="input input-bordered" placeholder={`${index}`} />
		{/each}
	</div>
	<div>Current Active Element: <b>{activeInputKey || ' - '}</b></div>
</div>
