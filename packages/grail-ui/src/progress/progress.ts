import type { ProgressConfig, ProgressReturn } from './progress.types';
import { derived, writable } from 'svelte/store';
import { clamp } from '../util/number.js';

export const createProgress = ({
	minValue = 0,
	maxValue = 100,
	value = 0,
	formatValueLabel,
}: ProgressConfig = {}): ProgressReturn => {
	const value$ = writable(value);

	const clampedValue$ = derived([value$], ([$value]) =>
		$value === null ? null : clamp($value, minValue, maxValue)
	);
	const percentage = derived([clampedValue$], ([$value]) =>
		$value === null ? 0 : ($value - minValue) / (maxValue - minValue)
	);

	if (!formatValueLabel) {
		const option = {
			style: 'percent',
		};
		const formatter = new Intl.NumberFormat('en-US', option);
		formatValueLabel = ({ percentage }) => {
			return formatter.format(percentage) as string;
		};
	}

	const valueLabel = derived([clampedValue$, percentage], ([$value, $percentage]) => {
		if ($value === null || !formatValueLabel) return '';
		return formatValueLabel({
			value: $value,
			percentage: $percentage as number,
			minValue,
			maxValue,
		});
	});

	const progressAttrs = derived([clampedValue$, valueLabel], ([$value, $valueLabel]) => {
		return {
			...($value !== null ? { 'aria-valuenow': `${$value}` } : {}),
			'aria-valuemin': `${minValue}`,
			'aria-valuemax': `${maxValue}`,
			...($valueLabel ? { 'aria-valuetext': $valueLabel } : {}),
			role: 'progressbar',
		};
	});

	return {
		value: value$,
		valueLabel,
		percentage,
		progressAttrs,
	};
};
