<script lang="ts">
	import PageHeader from '$lib/demo/PageHeader.svelte';
	import SectionHeader from '$lib/demo/SectionHeader.svelte';
	import PackageManager from './PackageManager.svelte';
</script>

<PageHeader title="Getting started"
	>This page describes how to get started to build your own component library or application
	utilizing Grail UI.</PageHeader
>

<SectionHeader id="Installation">Installation</SectionHeader>
<p>Install using your preferred package manager to add to your project:</p>
<PackageManager
	class="max-w-xl mt-3"
	npm="npm install infiniteui"
	pnpm="pnpm add infiniteui"
	yarn="yarn add infiniteui"
/>
