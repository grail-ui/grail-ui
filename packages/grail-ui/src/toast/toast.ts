import type {
	ActionWithParams,
	PromiseOptions,
	ToastConfig,
	Toaster,
	ToastOptions,
	ToastParams,
	ToastReturn,
} from './toast.types';
import { derived, get, readable, writable } from 'svelte/store';
import { chain } from '../util/chain.js';
import { uniqueId } from '../util/id.js';
import { ESCAPE } from '../util/keyboard.js';
import { addEventListener } from '../eventListener/eventListener.js';
import { getToastDuration, msTime$, runIfFn } from './toast.utils.js';

const normalizeOptions = (options: ToastOptions): ToastParams => {
	const { id = uniqueId('toast'), type = 'info', duration, ...rest } = options;
	const _duration = getToastDuration(duration, type);

	return {
		id,
		type,
		state: 'active',
		duration: _duration,
		createdAt: Date.now(),
		remaining: _duration,
		...rest,
	};
};

export function createToast(initConfig?: ToastConfig): ToastReturn {
	const {
		max = Number.MAX_SAFE_INTEGER,
		pauseOnInteraction = true,
		pauseOnPageIdle = false,
	} = initConfig || {};
	const toasts$ = writable<ToastParams[]>([]);

	const toaster: Toaster = {
		create(options: ToastOptions) {
			const params = normalizeOptions(options);
			if (toaster.find(params.id)) return;
			toasts$.update((toasts) =>
				toasts.length === max ? [...toasts.slice(1), params] : [...toasts, params]
			);
			return params.id;
		},
		find(id?: string) {
			return get(toasts$).find((toast) => toast.id === id);
		},
		update(id: string, options: ToastOptions) {
			if (!toaster.find(id)) return;
			toasts$.update((toasts) =>
				toasts.map((toast) => (toast.id === id ? normalizeOptions({ id, ...options }) : toast))
			);
			options.onUpdate?.();
			return id;
		},
		upsert(options: ToastOptions) {
			const { id } = options;
			return id && toaster.find(id) ? toaster.update(id, options) : toaster.create(options);
		},
		dismiss(id?: string) {
			toasts$.update((toasts) =>
				toasts.filter((toast) => {
					if (!id || toast.id === id) {
						toast.onClose?.();
						return false;
					}
					return true;
				})
			);
		},
		pause(id?: string) {
			toasts$.update((toasts) =>
				toasts.map((toast) =>
					(!id || toast.id === id) && toast.state !== 'paused'
						? {
								...toast,
								remaining: toast.remaining - Date.now() + toast.createdAt,
								state: 'paused',
						  }
						: toast
				)
			);
		},
		resume(id?: string) {
			toasts$.update((toasts) =>
				toasts.map((toast) =>
					(!id || toast.id === id) && toast.state !== 'active'
						? { ...toast, createdAt: Date.now(), state: 'active' }
						: toast
				)
			);
		},
		loading(options: ToastOptions) {
			return toaster.upsert({ ...options, type: 'loading' });
		},
		success(options: ToastOptions) {
			return toaster.upsert({ ...options, type: 'success' });
		},
		error(options: ToastOptions) {
			return toaster.upsert({ ...options, type: 'error' });
		},
		promise<T>(promise: Promise<T>, options: PromiseOptions<T>, shared: ToastOptions = {}) {
			const id = toaster.loading({ ...shared, ...options.loading });

			promise
				.then((response) => {
					const successOptions = runIfFn(options.success, response);
					toaster.success({ ...shared, ...successOptions, id });
				})
				.catch((error) => {
					const errorOptions = runIfFn(options.error, error);
					toaster.error({ ...shared, ...errorOptions, id });
				});

			return promise;
		},
	};

	const progress$ = derived(msTime$, (now) => (toast: ToastParams) => {
		const { state, createdAt, remaining, duration } = toast;
		return state === 'active' ? now - createdAt + duration - remaining : duration - remaining;
	});

	const useToast: ActionWithParams<HTMLElement, ToastParams> = (node, initParams) => {
		const params$ = writable(initParams);

		function dismiss() {
			toaster.dismiss(get(params$).id);
		}

		function pause() {
			toaster.pause(get(params$).id);
		}

		function resume() {
			toaster.resume(get(params$).id);
		}

		const unsubscribe = derived(
			[progress$, params$],
			([progress, params]) => [progress(params), params] as [number, ToastParams]
		).subscribe(([progress, { id, duration }]) => {
			if (progress >= duration) {
				toaster.dismiss(id);
			}
		});

		const removeEvents = chain(
			...(pauseOnInteraction
				? [
						addEventListener(node, `keydown`, (e: KeyboardEvent) => {
							if (!e.defaultPrevented && e.key === ESCAPE) {
								dismiss();
							}
						}),
						addEventListener(node, ['focus', 'pointerenter'], pause),
						addEventListener(node, ['blur', 'pointerleave'], resume),
				  ]
				: []),
			...(pauseOnPageIdle
				? [addEventListener(window, 'focus', resume), addEventListener(window, 'blur', pause)]
				: [])
		);

		return {
			update(newParams) {
				params$.update((params) => ({ ...params, ...newParams }));
			},
			destroy() {
				removeEvents();
				unsubscribe?.();
			},
		};
	};

	const groupAttrs = readable({
		id: uniqueId('toast-group'),
		'aria-live': 'polite',
		role: 'region',
	});

	const rootAttrs = derived(toasts$, (toasts: ToastParams[]) => (toast: ToastParams) => ({
		id: toast.id,
		'data-state': toast.state,
		'data-open': `${!!toasts.find(({ id }) => id === toast.id)}`,
		'data-type': toast.type,
		role: 'status',
		'aria-atomic': 'true',
		tabindex: '0',
	}));

	return {
		toasts: { subscribe: toasts$.subscribe },
		toaster,
		useToast,
		groupAttrs,
		rootAttrs,
		progress: progress$,
	};
}
