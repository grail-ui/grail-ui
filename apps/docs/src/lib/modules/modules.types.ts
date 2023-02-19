export type ModuleMetadata = {
	heading: string;
	description: string;
	category: 'component' | 'utility';
};

export type ModuleMetadataWithSlug = ModuleMetadata & { slug: string };
