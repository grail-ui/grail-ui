<script lang="ts">
	import { PUBLIC_GITHUB_URL } from '$env/static/public';
	import Code from '$lib/demo/Code.svelte';
	import PageHeader from '$lib/demo/PageHeader.svelte';
	import SectionHeader from '$lib/demo/SectionHeader.svelte';
	import PackageManager from './PackageManager.svelte';
</script>

<PageHeader title="Getting started"
	>This page describes how to get started to build your own component library or application
	utilizing Grail UI.</PageHeader
>
<div class="flex flex-col">
	<div>
		<SectionHeader id="Installation">Installation</SectionHeader>
		<p>Install using your preferred package manager to add to your project:</p>
		<PackageManager
			class="max-w-xl mt-3"
			npm="npm install @grail-ui/svelte"
			pnpm="pnpm add @grail-ui/svelte"
			yarn="yarn add @grail-ui/svelte"
		/>
	</div>

	<div>
		<SectionHeader id="Usage">Usage</SectionHeader>
		<p>
			We offer a tree-shakeable package that contains all of the available functionality. This makes
			sure that all components, actions and utilities are compatible and are updated together. In
			the below example, only dependencies required for modal and tooltip will be included in your
			final bundle:
			<Code
				source={`import { createModal, createTooltip } from "@grail-ui/svelte";`}
				class="w-fit"
			/>
		</p>
		<p class="mt-6">
			If you can't do tree shaking, you can import files directly, and only include the modules you
			need, like this:
			<Code
				source={`import { createModal } from "@grail-ui/svelte/accordion";
import { createTooltip } from "@grail-ui/svelte/tooltip";`}
				class="w-fit"
			/>
		</p>
	</div>

	<div>
		<SectionHeader id="Documentation">Reading the documentation</SectionHeader>

		Each module has API documentation, examples, and a working demo that you can edit on StackBlitz.
	</div>

	<div>
		<SectionHeader id="Help">Need help?</SectionHeader>

		If you have discovered a bug or have a feature suggestion, feel free to
		<a class="link" href={`${PUBLIC_GITHUB_URL}/issues`}>create an issue on GitHub</a>. Otherwise,
		you can use any of the following methods to find somenone available to answer your questions.
	</div>
</div>
