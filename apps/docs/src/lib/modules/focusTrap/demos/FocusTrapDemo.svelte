<script lang="ts">
	import { createFocusTrap } from '@grail-ui/svelte';

	const { hasFocus, activate, deactivate, useFocusTrap } = createFocusTrap();
</script>

<input
	type="text"
	class="input input-bordered"
	placeholder={$hasFocus ? "You can't focus me" : 'You can focus me'}
/>

<form
	use:useFocusTrap
	class="border-base-content/20 bg-base-100 mt-8 flex flex-col items-center gap-4 rounded border p-8"
>
	<input type="text" class="input input-bordered" placeholder="Username" />
	<input type="email" class="input input-bordered" placeholder="Email" />
	<div class="flex justify-center">
		<button type="button" on:click={() => ($hasFocus ? deactivate() : activate())} class="btn"
			>{$hasFocus ? 'Free Focus' : 'Trap focus'}</button
		>
	</div>
</form>
