import type { ComponentType } from 'svelte';
import type { ModuleMetadataWithSlug } from '$lib/modules/modules.types';
import { error, type LoadEvent } from '@sveltejs/kit';
import { pascalCase } from 'change-case';
// import { getRouteItem } from '$lib/routes';

export async function load({ params, parent }: LoadEvent) {
	const { modules } = await parent();
	// const { current } = getRouteItem(url.pathname);

	const slug = params.slug as string;
	const index = modules.findIndex((module: ModuleMetadataWithSlug) => module.slug === slug);
	if (index < 0) {
		throw error(400, 'not found');
	}

	const { default: component } = await import(
		`../../../../../lib/modules/${slug}/${pascalCase(slug)}.svelte`
	);

	return { modules, component: component as ComponentType, slug, index };
}
