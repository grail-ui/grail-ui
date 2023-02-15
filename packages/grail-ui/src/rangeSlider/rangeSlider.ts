import type { RangeSliderConfig, RangeSliderReturn } from './rangeSlider.types';
import type { Action } from 'svelte/action';
import { derived, get, readable, writable } from 'svelte/store';
import { snapValueToStep } from '../util/number';
import { addEventListener } from '../eventListener/eventListener';
import { createKeyStroke } from '../keyStroke';
import { uniqueId } from '../util/id';

export const createRangeSlider = (initConfig: RangeSliderConfig = {}): RangeSliderReturn => {
	const {
		minValue = 0,
		maxValue = 100,
		step: initialStep = 1,
		orientation = 'horizontal',
		initialValues = 50,
	} = initConfig;

	const min = writable(minValue);
	const max = writable(maxValue);
	const step = writable(initialStep);
	const values = writable(
		Array.isArray(initialValues) ? initialValues.sort((a, b) => a - b) : initialValues
	);
	const labelId = uniqueId('slider-label');

	const useRangeSlider: Action<HTMLElement, void> = (node) => {
		const thumbList = node.querySelectorAll('div[data-part="thumb"]') as NodeListOf<HTMLElement>;
		const track = node.querySelector('div[data-part="track"]');
		if (!thumbList || !track) return;
		node.style.position = 'relative';

		const thumbs = Array.from(thumbList);
		const range = node.querySelector('div[data-part="range"]') as HTMLElement | null;
		if (range) range.style.position = 'absolute';

		thumbs.forEach((thumb) => {
			thumb.id = uniqueId('thumb');
			thumb.style.position = 'absolute';
			const thumbInitialTransform = thumb.style.transform;
			thumb.style.transform =
				thumbInitialTransform +
				(orientation === 'horizontal' ? 'translate(-50%, 0px)' : 'translate(0px, -50%)');
		});

		const label = document.getElementById(labelId);
		let removeLabelPointerDown: VoidFunction | undefined;
		if (label) {
			label.setAttribute('for', thumbs[0].id);
			removeLabelPointerDown = addEventListener(label, 'pointerdown', () => {
				const removeLabelPointerUp = addEventListener(document, 'pointerup', () => {
					thumbs[0].focus();
					removeLabelPointerUp();
				});
			});
		}

		if (Array.isArray(initialValues) && initialValues.length > thumbs.length) {
			values.update(($values) => ($values as number[]).slice(0, thumbs.length));
		}

		const getClosestThumb = (value: number, min: number, max: number) => {
			const { width, height, left, top } = node.getBoundingClientRect();
			const newPosition =
				orientation === 'horizontal'
					? left + (value / (max - min)) * width
					: top + (value / (max - min)) * height;
			let thumbPositions: number[] = [];
			for (const thumb of thumbs) {
				const { left, top, width, height } = thumb.getBoundingClientRect();
				thumbPositions = [
					...thumbPositions,
					orientation === 'horizontal' ? left + width * 0.5 : top + height * 0.5,
				];
			}
			const posDifference = thumbPositions.map((item) => Math.abs(item - newPosition));
			const closest = Math.min(...posDifference);
			let closestThumbIndex: number[] = [];
			posDifference.forEach((value, index) => {
				if (value === closest) {
					closestThumbIndex = [...closestThumbIndex, index];
				}
			});

			if (
				closestThumbIndex.length > 1 &&
				(thumbPositions[closestThumbIndex[0]] < newPosition ||
					thumbPositions[closestThumbIndex[0]] === left)
			) {
				return thumbs[closestThumbIndex[closestThumbIndex.length - 1]];
			} else {
				return thumbs[closestThumbIndex[0]];
			}
		};

		const setValues = (value: number, index: number) => {
			const thumbsValues = get(values);

			if (typeof thumbsValues === 'number') {
				values.set(value);
			} else {
				values.update(($values) => {
					const values = $values as number[];
					values[index] = value;
					return values;
				});
			}
		};

		const setThumbPosition = (thumb: HTMLElement, snappedValue: number) => {
			const minValue = get(min);
			const maxValue = get(max);

			const newValueThumbPosition = (snappedValue / (maxValue - minValue)) * 100;
			if (orientation === 'horizontal') {
				thumb.style.left = `${newValueThumbPosition}%`;
			} else {
				thumb.style.top = `${newValueThumbPosition}%`;
			}
		};

		const setRange = () => {
			if (!range) return;

			let length: number | string;
			let start: string;
			const firstThumb = thumbs[0];

			if (thumbs.length > 1) {
				const lastThumb = thumbs[thumbs.length - 1];
				const firstThumbPos =
					orientation === 'horizontal' ? firstThumb.style.left : firstThumb.style.top;
				const lastThumbPos =
					orientation === 'horizontal' ? lastThumb.style.left : lastThumb.style.top;

				start = firstThumbPos;
				length =
					parseFloat(lastThumbPos.slice(0, lastThumbPos.length - 1)) -
					parseFloat(firstThumbPos.slice(0, firstThumbPos.length - 1));
			} else {
				start = '0%';
				length = orientation === 'horizontal' ? firstThumb.style.left : firstThumb.style.top;
			}

			if (orientation === 'horizontal') {
				range.style.width = typeof length === 'number' ? `${length}%` : length;
				range.style.left = start;
			} else {
				range.style.height = typeof length === 'number' ? `${length}%` : length;
				range.style.top = start;
			}
		};

		const setThumb = ({
			position,
			value,
			thumb,
		}: {
			position?: number;
			value?: number;
			thumb?: HTMLElement;
		}) => {
			const minValue = get(min);
			const maxValue = get(max);
			const stepValue = get(step);
			const thumbsValues = get(values);
			const {
				width: trackWidth,
				height: trackHeight,
				left: trackPosLeft,
				top: trackPosTop,
			} = track.getBoundingClientRect();
			const size = orientation === 'horizontal' ? trackWidth : trackHeight;

			let currentThumbMin;
			let currentThumbMax;
			if (thumb && Array.isArray(thumbsValues)) {
				const indexOfThumb = thumbs.indexOf(thumb);
				currentThumbMin = thumbsValues[indexOfThumb - 1] || minValue;
				currentThumbMax = thumbsValues[indexOfThumb + 1] || maxValue;
			} else {
				currentThumbMin = minValue;
				currentThumbMax = maxValue;
			}

			let newValue: number;
			if (position) {
				const offset = position - (orientation === 'horizontal' ? trackPosLeft : trackPosTop);
				newValue = (offset / size) * (maxValue - minValue);
			} else {
				if (!value && value !== 0) return;
				newValue = value;
			}
			const snappedValue = snapValueToStep(newValue, currentThumbMin, currentThumbMax, stepValue);
			const closestThumb = thumb || getClosestThumb(snappedValue, minValue, maxValue);

			setThumbPosition(closestThumb, snappedValue);
			setValues(snappedValue, thumbs.indexOf(closestThumb));
			setRange();

			return closestThumb;
		};

		//Set initial thumb values and range
		if (typeof initialValues === 'number') {
			setThumb({ value: initialValues });
		} else {
			const initialValues = get(values) as number[];
			initialValues.forEach((value, index) => {
				setThumb({ value: value, thumb: thumbs[index] });
			});
		}
		setRange();

		const removePointerDown = addEventListener(node, 'pointerdown', (e: PointerEvent) => {
			if (e.target === node || node.contains(e.target as Node | null)) {
				e.preventDefault();
				const thumb = setThumb({ position: orientation === 'horizontal' ? e.pageX : e.pageY });
				thumb?.focus();

				const removePointerMove = addEventListener(document, 'pointermove', (e) => {
					e.preventDefault();
					setThumb({ position: orientation === 'horizontal' ? e.pageX : e.pageY, thumb });
				});

				const removePointerUp = addEventListener(document, 'pointerup', () => {
					removePointerMove();
					removePointerUp();
				});
			}
		});

		const currentThumbValue = (thumb: HTMLElement) => {
			const thumbValues = get(values);

			if (typeof thumbValues === 'number') {
				return thumbValues;
			} else {
				return thumbValues[thumbs.indexOf(thumb)];
			}
		};

		const removeIncButtonEvent = createKeyStroke({
			key:
				orientation === 'horizontal'
					? ['ArrowRight', 'PageUp', 'Shift+ArrowRight', 'Shift+PageUp']
					: ['ArrowDown', 'PageDown', 'Shift+ArrowDown', 'Shift+PageDown'],
			handler: (e) => {
				if (thumbs.includes(e.target as HTMLElement)) {
					const currentStep = get(step);
					const thumb = e.target as HTMLElement;
					const currentValue = currentThumbValue(thumb);

					setThumb({ value: currentValue + (e.shiftKey ? currentStep * 10 : currentStep), thumb });
				}
			},
			target: node,
			preventDefault: true,
		});

		const removeDecButtonEvent = createKeyStroke({
			key:
				orientation === 'horizontal'
					? ['ArrowLeft', 'PageDown', 'Shift+ArrowLeft', 'Shift+PageDown']
					: ['ArrowUp', 'PageUp', 'Shift+ArrowUp', 'Shift+PageUp'],
			handler: (e) => {
				if (thumbs.includes(e.target as HTMLElement)) {
					const currentStep = get(step);
					const thumb = e.target as HTMLElement;
					const currentValue = currentThumbValue(thumb);

					setThumb({ value: currentValue - (e.shiftKey ? currentStep * 10 : currentStep), thumb });
				}
			},
			target: node,
			preventDefault: true,
		});

		const removeHomeButtonEvent = createKeyStroke({
			key: 'Home',
			handler: (e) => {
				if (thumbs.includes(e.target as HTMLElement)) {
					const minValue = get(min);
					const thumb = e.target as HTMLElement;

					setThumb({ value: minValue, thumb });
				}
			},
			target: node,
			preventDefault: true,
		});

		const removeEndButtonEvent = createKeyStroke({
			key: 'End',
			handler: (e) => {
				if (thumbs.includes(e.target as HTMLElement)) {
					const maxValue = get(max);
					const thumb = e.target as HTMLElement;

					setThumb({ value: maxValue, thumb });
				}
			},
			target: node,
			preventDefault: true,
		});

		return {
			destroy() {
				removePointerDown();
				removeIncButtonEvent();
				removeDecButtonEvent();
				removeHomeButtonEvent();
				removeEndButtonEvent();
				removeLabelPointerDown?.();
			},
		};
	};

	const trackAttrs = readable({
		'data-part': 'track',
	});
	const rangeAttrs = readable({
		'data-part': 'range',
	});

	const thumbAttrs = derived(values, (values$) => {
		return function (index: number) {
			const minValue = get(min);
			const maxValue = get(max);
			let thumbValueMin: number;
			let thumbValueMax: number;
			let valueNow: number;
			if (typeof values$ === 'number') {
				thumbValueMin = minValue;
				thumbValueMax = maxValue;
				valueNow = values$;
			} else {
				thumbValueMin = values$[index - 1] || minValue;
				thumbValueMax = values$[index + 1] || maxValue;
				valueNow = values$[index];
			}

			return {
				'data-part': 'thumb',
				'data-orientation': orientation,
				'aria-orientation': orientation,
				'aria-valuemin': `${thumbValueMin}`,
				'aria-valuemax': `${thumbValueMax}`,
				'aria-valuenow': `${valueNow}`,
				'aria-labelledby': labelId,
				tabindex: '0',
			};
		};
	});

	const labelAttrs = readable({
		'data-part': 'label',
		id: labelId,
	});

	return {
		useRangeSlider,
		rangeAttrs,
		thumbAttrs,
		trackAttrs,
		labelAttrs,
		values: { subscribe: values.subscribe },
	};
};
