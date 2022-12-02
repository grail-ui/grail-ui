<script lang="ts">
	import { createProgress } from '../progress';

	const { progressAttrs, valueLabel } = createProgress({ value: 30 });
</script>

<div data-testid="progress" {...$progressAttrs}>
	{$valueLabel}
</div>
