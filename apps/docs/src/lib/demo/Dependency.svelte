<script lang="ts">
	import PackageManager from './package-manager/PackageManager.svelte';
	import { Section, SectionHeader } from './section';

	export let modules: ('focus-trap' | '@floating-ui/dom')[];
</script>

<Section>
	<SectionHeader id="Dependencies">Dependencies</SectionHeader>

	<div>
		In order for this module to work you have to install {@html modules
			.map((m) => `<a href="https://www.npmjs.com/package/${m}"><code>${m}</code></a>`)
			.join(', ')}.
	</div>

	<PackageManager class="max-w-xl" command="add" options={modules} />
</Section>
