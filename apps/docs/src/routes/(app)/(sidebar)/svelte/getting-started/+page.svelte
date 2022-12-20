<script lang="ts">
	import { PUBLIC_DISCORD_URL, PUBLIC_GITHUB_URL } from '$env/static/public';
	import Highlight from '$lib/highlight/Highlight.svelte';
	import PageHeader from '$lib/demo/PageHeader.svelte';
	import SectionHeader from '$lib/demo/SectionHeader.svelte';
	import PackageManager from '$lib/demo/package-manager/PackageManager.svelte';
</script>

<div class="prose">
	<PageHeader title="Getting started"
		>This page provides instructions on how to get started with Grail UI.</PageHeader
	>
	<SectionHeader id="Installation">Installation</SectionHeader>
	<p>Install using your preferred package manager to add to your project:</p>
	<PackageManager class="max-w-xl mt-3" command="addDev" options="@grail-ui/svelte" />

	<SectionHeader id="Usage">Usage</SectionHeader>
	<p>
		Our tree-shakeable package includes all of the available functionality, ensuring that all
		components, actions, and utilities are compatible and kept up-to-date. By using this package,
		you can selectively include only the dependencies that are required for specific features in
		your final bundle, reducing the overall size and improving performance. In the below example,
		only dependencies required for modal and tooltip will be included in your final bundle:
		<Highlight
			source={`import { createModal, createTooltip } from "@grail-ui/svelte";`}
			class="rounded"
		/>
	</p>

	<p>
		If you are unable to use tree shaking, you can still selectively include only the specific
		modules that you need by importing them directly, like this:
		<Highlight
			source={`import { createModal } from "@grail-ui/svelte/accordion";
import { createTooltip } from "@grail-ui/svelte/tooltip";`}
			class="rounded"
		/>
	</p>

	<SectionHeader id="Documentation">Reading the documentation</SectionHeader>

	<p>
		Our API documentation for each module includes examples and a live demo that you can edit and
		experiment with using StackBlitz.
	</p>

	<SectionHeader id="Help">Need help?</SectionHeader>

	<p>
		If you have found a bug or have a suggestion for a new feature, you can
		<a href={`${PUBLIC_GITHUB_URL}/issues`}>create an issue on GitHub</a>. Please take a moment to
		check if the issue has already been reported before submitting a new one.
	</p>

	<p>
		If you prefer, you can also get in touch with us using any of the following methods to ask
		questions or get assistance:
	</p>

	<ul>
		<li><a href={PUBLIC_DISCORD_URL}>Chat with us on Discord</a></li>
		<li>
			<a href={`${PUBLIC_GITHUB_URL}/discussions`}>Start a discussion on GitHub</a>
		</li>
		<li>
			<a href="https://stackoverflow.com/questions/ask?tags=grail-ui"
				>Post a question on StackOverflow</a
			>
		</li>
	</ul>
</div>
