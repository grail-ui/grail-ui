<script lang="ts">
	import { useClickOutside } from '../clickOutside';

	let counter = 0;
</script>

<div use:useClickOutside={{ handler: () => counter++ }}>
	<button type="button" data-testid="inside">Inside</button>
</div>

<button type="button" data-testid="outside">Outside</button>

<span data-testid="counter">{counter}</span>
