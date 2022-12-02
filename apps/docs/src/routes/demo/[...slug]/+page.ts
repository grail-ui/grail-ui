import type { LoadEvent } from '@sveltejs/kit';
import type { ComponentType } from 'svelte';
import { pascalCase } from 'change-case';

export async function load({ params }: LoadEvent) {
	const [slug, demo = slug] = (params.slug as string).split('/');
	const component: ComponentType = (
		await import(`../../../lib/modules/${slug}/demos/${pascalCase(demo)}Demo.svelte`)
	).default;

	return { component, slug };
}
