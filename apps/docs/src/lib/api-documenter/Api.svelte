<script lang="ts">
	import { SectionGroup, Section, SectionHeader } from '$lib/demo/section';

	const title = 'API';
</script>

<Section>
	<SectionHeader id={title}>{title}</SectionHeader>
	<SectionGroup>
		<slot />
	</SectionGroup>
</Section>
