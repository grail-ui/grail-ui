<script lang="ts">
	import PageHeader from '$lib/demo/PageHeader.svelte';
	import SectionHeader from '$lib/demo/SectionHeader.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<div class="prose">
	<PageHeader title="Architecture"
		>Learn how to use Grail UI to build your own component library or application.</PageHeader
	>
	<SectionHeader id="Definition">Definition</SectionHeader>
	<p>
		Our library offers a wide range of component primitives and utilities, in the form of reactive
		DOM props, writable stores for managing state, and actions for event handling, to help you build
		accessible and high-quality Svelte applications efficiently and with a great developer
		experience. Everything is designed to streamline your workflow and reduce the time spent on
		routine tasks, allowing you to focus on creating innovative and user-friendly web applications.
	</p>

	<SectionHeader id="Usage">Example Usage</SectionHeader>
	<p>Next, we will demonstrate how to create and use the modal component primitive.</p>

	<p>
		1. Import the appropriate factory method.
		<Highlight source={`import { createModal } from '@grail-ui/svelte';`} />
	</p>
	<p>
		2. Create the component instance with the desired configuration & initial state.
		<Highlight
			source={`const {...} = createModal ({ open: false, portal: 'body', dismissible: true });`}
		/>
	</p>
	<p>
		3. Destructure all the required parts that will be used as attributes, state controls and event
		handlers.
		<Highlight
			source={`const {useModal, modalAttrs, titleAttrs, triggerAttrs, open} = createModal();`}
		/>
	</p>

	<p>
		4. Apply the parts to the appropriate elements.
		<Highlight
			source={`<scr` +
				`ipt>
	import { createModal } from '@grail-ui/svelte';

	const { useModal, modalAttrs, titleAttrs, triggerAttrs, open } = createModal();
</scr` +
				`ipt>

<button type="button" {...$triggerAttrs} on:click={() => ($open = true)}>Open</button>

{#if $open}
	<div use:useModal {...$modalAttrs}>
		<h3 {...$titleAttrs}>Modal title</h3>
		<div>Modal content</div>
	</div>
{/if}`}
		/>
	</p>

	<p>
		5. Optionally, you can apply custom transitions.
		<Highlight
			lines="3, 11"
			source={`<scr` +
				`ipt>
	import { createModal } from '@grail-ui/svelte';
	import { scale } from 'svelte/transition';

	const { useModal, modalAttrs, titleAttrs, triggerAttrs, open } = createModal();
</scr` +
				`ipt>

<button type="button" {...$triggerAttrs} on:click={() => ($open = true)}>Open</button>

{#if $open}
	<div use:useModal {...$modalAttrs} transition:scale={{ duration: 200 }}>
		<h3 {...$titleAttrs}>Modal title</h3>
		<div>Modal content</div>
	</div>
{/if}`}
		/>
	</p>

	<SectionHeader id="Benefits">Benefits</SectionHeader>
	<SectionHeader id="Styling" heading="h3">Styling</SectionHeader>
	<p>
		Grail UI does not handle rendering on its own. Instead, it is up to you to define the DOM
		structure for your component and apply the DOM props returned by the factory methods to the
		relevant elements. This flexibility allows you to fully customize the structure of your rendered
		DOM, such as adding extra elements for styling or layout purposes. Overall, Grail UI gives you
		complete control over the way your component is rendered, so you can use any CSS framework such
		as TailwindCSS, Bootstrap, Lightning, etc.
	</p>

	<SectionHeader id="Performance" heading="h3">Performance</SectionHeader>
	<p>
		By just using Svelte stores and implementing event delegation, we are able to minimize the
		impact on bundle size and runtime performance, as we do not have to ship any physical
		components.
	</p>

	<SectionHeader id="SSR" heading="h3">Server Side Rendering (SSR)</SectionHeader>
	<p>
		By leveraging the technique of spreading reactive DOM attributes from Svelte stores on the
		server-side and using actions only as event handlers, we can style all parts of the component
		and their corresponding state without any flickering.
	</p>

	<SectionHeader id="Components">Components</SectionHeader>
	<p>The above steps provide a brief overview of the process for using Grail UI primitives.</p>
	<p>
		While it is possible to use Grail UI directly in various places in your application, it is often
		recommended to create your own high-level components to handle all the different inputs and use
		cases while providing your own theme and design system specific logic. These wrapper components,
		which integrate all the pieces of Grail UI, resides within each design system.
	</p>

	<SectionHeader id="NextSteps">Next Steps</SectionHeader>
	<p>
		Now that you know ho to use Grail UI inside your app, you can read the documentation for the
		individual components and utilities to understand them in detail.
	</p>
</div>
