import type { Readable, Writable } from 'svelte/store';

export type TimeoutConfig = {
	/**
	 * Whether to start the timer immediately.
	 *
	 * @defaultValue `true`
	 */
	immediate?: boolean;
};

export type TimeoutReturn = {
	/**
	 * Indicate whether is timer is running.
	 */
	isPending: Readable<boolean>;

	/**
	 * Stop the timer.
	 */
	stop: VoidFunction;

	/**
	 * Start the timer.
	 */
	start: VoidFunction;

	/**
	 * The controlled delay of the timer.
	 */
	delay: Writable<number>;
};

export declare function CreateTimeoutFn(
	callback: (...args: unknown[]) => unknown,
	ms: number,
	options?: TimeoutConfig
): TimeoutReturn;
