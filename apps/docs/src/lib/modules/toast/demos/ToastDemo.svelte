<script lang="ts">
	import { createToast } from '@grail-ui/svelte';
	import { scale, fly } from 'svelte/transition';

	const { toasts, toaster, useToast, rootAttrs, groupAttrs, progress } = createToast();

	function addToast() {
		toaster.create({ title: 'New message!', description: 'You have 1 unread message' });
	}
</script>

<div class="toast w-96 z-20" {...$groupAttrs}>
	{#each $toasts as toast (toast.id)}
		<div>
			<div in:fly={{ y: 500 }} out:scale={{ duration: 500 }}>
				<div
					class="alert alert-{toast.type} shadow-lg relative overflow-hidden"
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
									class="progress progress-{toast.type} w-full absolute left-0 right-0 bottom-0"
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
