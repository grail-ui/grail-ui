<script lang="ts">
	import { useKeyStroke } from '../keyStroke';

	let text = 'Not pressed yet';
</script>

<div data-testid="key" use:useKeyStroke={{ key: 'a', handler: () => (text = 'Key pressed') }}>
	{text}
</div>
