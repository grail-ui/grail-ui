import { redirect, type LoadEvent } from '@sveltejs/kit';

export async function load({ parent }: LoadEvent) {
	const { modules } = await parent();
	throw redirect(307, `/svelte/${modules[0].slug}`);
}
