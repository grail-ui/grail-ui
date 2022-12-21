import type { ComponentType } from 'svelte';
import type { ActionReturn } from 'svelte/action';
import type { Readable } from 'svelte/store';

export type Type = ToastParams['type'];
export type State = ToastParams['state'];

export type ToastConfig = {
	/**
	 * Whether to pause toast when the user leaves the browser tab.
	 *
	 * @defaultValue `false`
	 */
	pauseOnPageIdle?: boolean;

	/**
	 * Whether to pause the toast when interacted with.
	 *
	 * @defaultValue `true`
	 */
	pauseOnInteraction?: boolean;

	/**
	 * The maximum number of toasts that can be shown at once.
	 *
	 * @defaultValue `Number.MAX_SAFE_INTEGER`
	 */
	max?: number;
};

export type ToastReturn = {
	/**
	 * The visible toasts.
	 */
	toasts: Readable<ToastParams[]>;

	/**
	 * Contains all the methods to control the toasts.
	 */
	toaster: Toaster;

	/**
	 * Action for the toast root element.
	 */
	useToast: ActionWithParams<HTMLElement, ToastParams>;

	/**
	 * HTML attributes for the toasts container.
	 */
	groupAttrs: Readable<Record<string, string>>;

	/**
	 * HTML attributes for each toast root element.
	 */
	rootAttrs: Readable<(params: ToastParams) => Record<string, string>>;

	/**
	 * Store for the progress motion.
	 */
	progress: Readable<(toast: ToastParams) => number>;
};

export type ToastParams = {
	/**
	 * The unique id of the toast.
	 */
	id: string;

	/**
	 * The type of the toast.
	 *
	 * @defaultValue `info`
	 */
	type: 'success' | 'error' | 'loading' | 'info' | 'custom';

	/**
	 * The duration of the toast. The default duration is computed based on the specified `type`.
	 */
	duration: number;

	/**
	 * The creation timestamp in ms.
	 * @private
	 */
	createdAt: number;

	/**
	 * The remaining duration in ms.
	 * @private
	 */
	remaining: number;

	/**
	 * The state of the toast.
	 * @private
	 *
	 * @defaultValue `active`
	 */
	state: 'paused' | 'active';

	/**
	 * The title of the toast.
	 */
	title?: string;

	/**
	 * The description of the toast.
	 */
	description?: string;

	/**
	 * Renders custom component as the toast body.
	 */
	component?: {
		/**
		 * The custom component itself.
		 */
		src: ComponentType;

		/**
		 * Extra props passed to the custom component.
		 */
		props?: Record<string | number | symbol, unknown>;

		/**
		 * Forwards toast id to `toastId` prop.
		 */
		forwardId?: string;
	};

	/**
	 * Function called when the toast has been closed and removed.
	 */
	onClose?: VoidFunction;

	/**
	 * Function called when the toast is shown.
	 */
	onOpen?: VoidFunction;

	/**
	 * Function called when the toast is updated.
	 */
	onUpdate?: VoidFunction;
};

export type ToastOptions = Partial<Omit<ToastParams, 'createdAt' | 'remaining' | 'state'>>;

export type MaybeFunction<Value, Args> = Value | ((arg: Args) => Value);

export type PromiseOptions<Value> = {
	loading: ToastOptions;
	success: MaybeFunction<ToastOptions, Value>;
	error: MaybeFunction<ToastOptions, Error>;
};

export interface Toaster {
	/**
	 * Returns the toast, if it's visible.
	 */
	find(id?: string): ToastParams | undefined;

	/**
	 * Creates or updates a toast.
	 */
	upsert(options: ToastOptions): string | undefined;

	/**
	 * Updates a toast.
	 */
	update(id: string, options: ToastOptions): string | undefined;

	/**
	 * Creates a toast.
	 */
	create(options: ToastOptions): string | undefined;

	/**
	 * Removes a toast.
	 */
	dismiss(id?: string | undefined): void;

	/**
	 * Pauses a toast.
	 */
	pause(id?: string | undefined): void;

	/**
	 * Resumes a toast.
	 */
	resume(id?: string | undefined): void;

	/**
	 * Update the toast when a given promise resolves or rejects.
	 */
	promise<T>(promise: Promise<T>, options: PromiseOptions<T>, shared?: ToastOptions): Promise<T>;

	/**
	 * Creates or updates a toast with `success` type.
	 */
	success(options: ToastOptions): string | undefined;

	/**
	 * Creates or updates a toast with `error` type.
	 */
	error(options: ToastOptions): string | undefined;

	/**
	 * Creates or updates a toast with `loading` type.
	 */
	loading(options: ToastOptions): string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ActionWithParams<Element = HTMLElement, Parameter = any> {
	<Node extends Element>(node: Node, parameter: Parameter): void | ActionReturn<Parameter>;
}
