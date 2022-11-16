<script lang="ts">
  import type { ClickOutsideConfig } from '../clickOutside.types';
  import { useClickOutside } from '../clickOutside';

  export let api: ClickOutsideConfig;
</script>

<div use:useClickOutside={api}>
  <button type="button" data-testid="inside">Inside</button>
</div>

<button type="button" data-testid="outside">Outside</button>
