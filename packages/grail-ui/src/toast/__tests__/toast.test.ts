import type { Toaster, ToastOptions, ToastParams, Type } from '../toast.types';
import { vi } from 'vitest';
import { get, type Readable } from 'svelte/store';
import { noop, tick } from 'svelte/internal';
import { createToast } from '../toast';

async function advanceTimersAndTick(time: number) {
	vi.advanceTimersByTime(time);
	await tick();
}

describe('Toast', () => {
	describe('Toaster', () => {
		describe('create', () => {
			it('should create with default params', () => {
				const { toaster, toasts } = createToast();

				const id = toaster.create({});
				const _toasts = get(toasts);

				expect(_toasts).toHaveLength(1);
				expect(id).toBeDefined();
				expect(_toasts[0]).toMatchObject({
					duration: 5000,
					state: 'active',
					type: 'info',
				});
			});

			it('should create with options', () => {
				const { toaster, toasts } = createToast();
				const options: ToastOptions = {
					id: '1',
					type: 'success' as Type,
					title: 'Title 1',
					description: 'description 1',
					duration: 10000,
					onClose: noop,
					onOpen: noop,
					onUpdate: noop,
				};

				const id = toaster.create(options);
				const _toasts = get(toasts);

				expect(_toasts).toHaveLength(1);
				expect(id).toBe('1');
				expect(_toasts[0]).toMatchObject(options);
			});

			it('should create with options', () => {
				const { toaster, toasts } = createToast();
				const options: ToastOptions = {
					id: '1',
					type: 'success' as Type,
					title: 'Title 1',
					description: 'description 1',
					duration: 10000,
					onClose: noop,
					onOpen: noop,
					onUpdate: noop,
				};

				toaster.create(options);
				const _toasts = get(toasts);

				expect(_toasts).toHaveLength(1);
				expect(_toasts[0]).toMatchObject(options);
			});

			it('should remove last toast if toasts exceed `max`', () => {
				const { toaster, toasts } = createToast({ max: 1 });

				toaster.create({ id: '1' });
				toaster.create({ id: '2' });
				const _toasts = get(toasts);

				expect(_toasts).toHaveLength(1);
				expect(_toasts[0]).toHaveProperty('id', '2');
			});

			it('should not create if toast id is already visible', () => {
				const { toaster, toasts } = createToast();

				toaster.create({ id: '1' });
				toaster.create({ id: '1' });
				const _toasts = get(toasts);

				expect(_toasts).toHaveLength(1);
			});
		});

		describe('find', () => {
			it('should return true if toast is visible', () => {
				const { toaster } = createToast();

				expect(toaster.find('1')).toBeFalsy();
				toaster.create({ id: '1' });
				expect(toaster.find('1')).toBeTruthy();
			});
		});

		describe('update', () => {
			it('should update with new options', () => {
				const { toaster, toasts } = createToast();
				const onUpdateSpy = vi.fn();

				const id = toaster.create({ id: '1' });
				toaster.update('1', { type: 'success', onUpdate: onUpdateSpy });
				const _toasts = get(toasts);

				expect(id).toBe('1');
				expect(_toasts[0]).toMatchObject({ id: '1', type: 'success' });
				expect(onUpdateSpy).toHaveBeenCalledTimes(1);
			});
		});

		describe('upsert', () => {
			it('should create if doesn`t exist', () => {
				const { toaster, toasts } = createToast();

				toaster.upsert({});
				const _toasts = get(toasts);

				expect(_toasts.length).toBe(1);
			});

			it('should update if exists', () => {
				const { toaster, toasts } = createToast();

				toaster.create({ id: '1' });
				toaster.upsert({ id: '1', type: 'success' });
				const _toasts = get(toasts);

				expect(_toasts.length).toBe(1);
				expect(_toasts[0]).toMatchObject({ id: '1', type: 'success' });
			});
		});

		describe('dismiss', () => {
			it('should dismiss if exists', () => {
				const { toaster, toasts } = createToast();
				const onCloseSpy = vi.fn();

				toaster.create({ id: '1', onClose: onCloseSpy });

				expect(get(toasts).length).toBe(1);

				toaster.dismiss('1');

				expect(get(toasts).length).toBe(0);
				expect(onCloseSpy).toHaveBeenCalledTimes(1);
			});

			it('should dismiss all if there is no id', () => {
				const { toaster, toasts } = createToast();

				toaster.create({});
				toaster.create({});

				expect(get(toasts).length).toBe(2);

				toaster.dismiss();

				expect(get(toasts).length).toBe(0);
			});
		});

		describe('pause & resume', () => {
			let toaster: Toaster;
			let toasts: Readable<ToastParams[]>;

			beforeEach(() => {
				({ toaster, toasts } = createToast());
				toaster.create({ id: '1' });
				toaster.create({ id: '2' });
			});

			it('should work for a specific id', () => {
				toaster.pause('1');
				expect(get(toasts)[0]).toMatchObject({ state: 'paused' });
				expect(get(toasts)[1]).toMatchObject({ state: 'active' });

				toaster.resume('unknown');
				expect(get(toasts)[0]).toMatchObject({ state: 'paused' });

				toaster.resume('1');
				expect(get(toasts)[0]).toMatchObject({ state: 'active' });
				expect(get(toasts)[1]).toMatchObject({ state: 'active' });
			});

			it('should work for all if there is no id', () => {
				toaster.pause();
				expect(get(toasts)[0]).toMatchObject({ state: 'paused' });
				expect(get(toasts)[1]).toMatchObject({ state: 'paused' });

				toaster.create({ id: '3' });
				expect(get(toasts)[2]).toMatchObject({ state: 'active' });

				toaster.resume();
				expect(get(toasts)[0]).toMatchObject({ state: 'active' });
				expect(get(toasts)[1]).toMatchObject({ state: 'active' });
				expect(get(toasts)[1]).toMatchObject({ state: 'active' });
			});
		});

		describe('types', () => {
			let toaster: Toaster;
			let toasts: Readable<ToastParams[]>;

			beforeEach(() => {
				({ toaster, toasts } = createToast());
			});

			it('should work for "success"', () => {
				toaster.success({ id: '1' });
				expect(get(toasts)[0].type).toEqual('success');
			});

			it('should work for "error"', () => {
				toaster.error({ id: '1' });
				expect(get(toasts)[0].type).toEqual('error');
			});

			it('should work for "loading"', () => {
				toaster.loading({ id: '1' });
				expect(get(toasts)[0].type).toEqual('loading');
			});
		});

		describe('promise', () => {
			let toaster: Toaster;
			let toasts: Readable<ToastParams[]>;

			beforeEach(() => {
				vi.useFakeTimers();
				({ toaster, toasts } = createToast());
			});

			afterEach(() => {
				vi.useRealTimers();
			});

			function addToast(success: boolean, result: object) {
				const promise = new Promise<object>((resolve, reject) => {
					setTimeout(() => (success ? resolve(result) : reject(result)), 200);
				});

				toaster.promise(promise, {
					loading: {
						title: 'Loading',
					},
					success: (data) => ({
						title: 'Success',
						...data,
					}),
					error: (err) => ({
						title: 'Error',
						...err,
					}),
				});

				return () => advanceTimersAndTick(200);
			}

			it('should work for success', async () => {
				const resolve = addToast(true, { description: 'Your request has been completed' });
				expect(get(toasts)[0]).toMatchObject({ type: 'loading', title: 'Loading' });

				await resolve();
				expect(get(toasts)[0]).toMatchObject({
					type: 'success',
					title: 'Success',
					description: 'Your request has been completed',
				});
			});

			it('should work for error', async () => {
				const resolve = addToast(false, { description: 'An error has occurred' });
				expect(get(toasts)[0]).toMatchObject({ type: 'loading', title: 'Loading' });

				await resolve();
				expect(get(toasts)[0]).toMatchObject({
					type: 'error',
					title: 'Error',
					description: 'An error has occurred',
				});
			});
		});
	});
});
