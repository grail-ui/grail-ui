<script lang="ts">
	import { createKeyStroke } from '../keyStroke';

	export let handler: () => unknown;

	createKeyStroke({ key: 'ArrowDown', handler: () => handler() });
</script>
