import type { ModuleMetadata } from '$lib/modules/modules.types';

export type LayoutData = {
	theme?: string | undefined;
	modules: (ModuleMetadata & {
		slug: string;
	})[];
};
