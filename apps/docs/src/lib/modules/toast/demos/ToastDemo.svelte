<script lang="ts">
	import { createToast } from '@grail-ui/svelte';
	import { scale, fly } from 'svelte/transition';

	const { toasts, toaster, useToast, rootAttrs, groupAttrs, progress } = createToast();

	function addToast() {
		toaster.create({ title: 'New message!', description: 'You have 1 unread message' });
	}
</script>

<div class="toast z-20 w-96" {...$groupAttrs}>
	{#each $toasts as toast (toast.id)}
		<div>
			<div in:fly={{ y: 500 }} out:scale={{ duration: 500 }}>
				<div
					class="alert alert-{toast.type} relative overflow-hidden shadow-lg"
					use:useToast={toast}
					{...$rootAttrs(toast)}
				>
					<div>
						<div>
							<h3 class="font-bold">{toast.title}</h3>
							<div class="text-xs">{toast.description}</div>
							{#if isFinite(toast.duration)}
								<progress
									value={$progress(toast)}
									class="progress progress-{toast.type} absolute bottom-0 left-0 right-0 w-full"
									max={toast.duration}
								/>
							{/if}
						</div>
					</div>
					<div class="flex-none">
						<button class="btn btn-sm" on:click={() => toaster.dismiss(toast.id)}>See</button>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<button class="btn" on:click={() => addToast()}>Show toast</button>
