<script lang="ts">
  import { createFocusTrap } from '@grail-ui/svelte';

  const { hasFocus, activate, deactivate, useFocusTrap } = createFocusTrap();
</script>

<input type="text" class="input input-bordered" placeholder={$hasFocus ? "You can't focus me" : 'You can focus me'} />

<form use:useFocusTrap class="shadow-lg border-2 bg-white bg-opacity-5 rounded max-w-96 mx-auto p-8 mt-8">
  <input type="text" class="input input-bordered" placeholder="Username" />
  <input type="email" class="input input-bordered" placeholder="Email" />
  <div class="flex flex-row justify-center">
    <button type="button" on:click={() => ($hasFocus ? deactivate() : activate())} class="btn btn-sm mt-4"
      >{$hasFocus ? 'Free Focus' : 'Trap focus'}</button
    >
  </div>
</form>
