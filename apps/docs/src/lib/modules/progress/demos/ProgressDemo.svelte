<script lang="ts">
  import { createProgress } from '@grail-ui/svelte';

  const { progressAttrs, percentage, valueLabel, value } = createProgress({ value: 40 });

  function randomize() {
    $value = Math.floor(Math.random() * 100 + 1);
  }
</script>

<div class="radial-progress" style="--value: {$percentage * 100};" {...$progressAttrs}>
  {$valueLabel}
</div>
<button type="button" class="btn mt-8" on:click={randomize}>Randomize</button>
