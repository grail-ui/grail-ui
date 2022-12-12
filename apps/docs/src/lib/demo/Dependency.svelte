<script lang="ts">
	import PackageManager from './package-manager/PackageManager.svelte';
	import SectionHeader from './SectionHeader.svelte';

	export let modules: ('focus-trap' | '@floating-ui/dom')[];
</script>

<SectionHeader id="Dependencies">Dependencies</SectionHeader>

In order for this module to work you have to install {@html modules
	.map((m) => `<a href="https://www.npmjs.com/package/${m}"><code>${m}</code></a>`)
	.join(', ')}.

<PackageManager class="max-w-xl mt-3" command="add" options={modules} />
