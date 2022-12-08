<script lang="ts">
	import { createTimeout } from '../timeout';

	export let handler: () => unknown;
	export let autoStop: boolean | undefined = undefined;

	createTimeout(() => handler(), 4000, { autoStop });
</script>
