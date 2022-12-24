<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';
	import ToastCreate from './examples/ToastCreate.svelte';
	import ToastDuration from './examples/ToastDuration.svelte';
	import ToastProgrammaticControl from './examples/ToastProgrammaticControl.svelte';
	import ToastPromise from './examples/ToastPromise.svelte';
	import ToastMax from './examples/ToastMax.svelte';
	import ToastProgressbar from './examples/ToastProgressbar.svelte';
	import ToastPause from './examples/ToastPause.svelte';

	const features = [
		'Supports closing automatically after a specified time.',
		'Pauses closing on hover, focus and window blur.',
		'Can remove or update toast programmatically.',
		'Manage promises within toast.',
		'Support for progress bars.',
	];

	const api = [
		{ definition: 'ToastConfig' },
		{ definition: 'ToastReturn', hideDefault: true },
		{ definition: 'ToastParams', hideDefault: true },
	];

	const examples = [
		{ component: ToastCreate, header: 'Creating a toast' },
		{ component: ToastDuration, header: 'Setting custom duration' },
		{ component: ToastProgrammaticControl, header: 'Programmatic control' },
		{ component: ToastPromise, header: 'Handling promises' },
		{ component: ToastMax, header: 'Limiting the number of toasts' },
		{ component: ToastProgressbar, header: 'Using progressbars' },
		{ component: ToastPause, header: 'Pausing toasts' },
	];
</script>

<ComponentLayout {features} {api} {examples}>
	<svelte:fragment slot="anatomy">
		<p>Typically, a toast consists of:</p>
		<ul>
			<li><b>Group:</b> The container for all the toasts.</li>
			<ul>
				<li>
					<b>Root:</b> The root container for the toast.
				</li>
			</ul>
		</ul>

		<Highlight
			source={`<scr` +
				`ipt>
	import { createToast } from '@grail-ui/svelte';

	const { toasts, toaster, useToast, rootAttrs, groupAttrs, progress } = createToast();
</scr` +
				`ipt>

<div {...$groupAttrs}>
	{#each $toasts as toast (toast.id)}
		<div use:useToast={toast} {...$rootAttrs(toast)}>
			<h3>{toast.title}</h3>
			<div>{toast.description}</div>
		</div>
	{/each}
</div>

<button
	on:click={() => {
		toaster.create({ title: 'Hello world', description: 'This is a toast' });
	}}>Create</button
>`}
		/>
	</svelte:fragment>
</ComponentLayout>
