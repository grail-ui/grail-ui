<script lang="ts">
  import { createPortal } from '../portal';

  const { usePortal, target } = createPortal();

  export let portalId = 1;

  $: $target = `[data-testid="c${portalId}"]`;
</script>

<div data-testid="c1" />
<div data-testid="c2" />

<div use:usePortal data-testid="node">Content!</div>
