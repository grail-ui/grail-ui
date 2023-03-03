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
	class="max-w-96 mx-auto mt-8 rounded border-2 bg-white bg-opacity-5 p-8 shadow-lg"
>
	<input type="text" class="input input-bordered" placeholder="Username" />
	<input type="email" class="input input-bordered" placeholder="Email" />
	<div class="flex flex-row justify-center">
		<button
			type="button"
			on:click={() => ($hasFocus ? deactivate() : activate())}
			class="btn btn-sm mt-4">{$hasFocus ? 'Free Focus' : 'Trap focus'}</button
		>
	</div>
</form>
