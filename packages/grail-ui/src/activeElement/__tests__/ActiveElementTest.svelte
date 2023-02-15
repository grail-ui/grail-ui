<script lang="ts">
	import { activeElement } from '../activeElement';

	$: activeKey = $activeElement?.getAttribute('data-key') || null;
</script>

{#each [1, 2] as key}
	<input type="text" placeholder="input {key}" data-key={key} />
{/each}

<div>Active: <span data-testid="activeKey">{activeKey}</span></div>
