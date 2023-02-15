import type { Readable } from 'svelte/store';

export type ActiveElement = Readable<HTMLElement | null>;
