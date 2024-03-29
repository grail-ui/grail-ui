import type { ModuleMetadata, ModuleMetadataWithSlug } from '$lib/modules/modules.types';

export async function load() {
	const metadata: Record<string, ModuleMetadata> = import.meta.glob(
		'$lib/modules/*/__metadata.ts',
		{
			import: 'default',
			eager: true,
		}
	);

	const modules: ModuleMetadataWithSlug[] = Object.entries(metadata).map(([key, value]) => {
		const slug = key.split('/')[4];
		return { ...value, slug };
	});

	return { modules };
}
