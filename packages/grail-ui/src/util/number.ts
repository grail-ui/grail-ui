export function clamp(
	value: number,
	min: number | undefined | null,
	max: number | undefined | null
): number {
	return Math.min(Math.max(value, min ?? -Infinity), max ?? Infinity);
}

export function snapValueToStep(
	value: number,
	min: number | undefined | null,
	max: number | undefined | null,
	step: number
): number {
	const remainder = (value - (min ?? 0)) % step;
	let snappedValue =
		Math.abs(remainder) * 2 >= step
			? value + Math.sign(remainder) * (step - Math.abs(remainder))
			: value - remainder;

	if (min != null) {
		if (snappedValue < min) {
			snappedValue = min;
		} else if (max != null && snappedValue > max) {
			snappedValue = min + Math.floor((max - min) / step) * step;
		}
	} else if (max != null && snappedValue > max) {
		snappedValue = Math.floor(max / step) * step;
	}

	// correct floating point behavior by rounding to step/min precision
	const precision = Math.max(getPrecision(step), getPrecision(min));

	const pow = Math.pow(10, precision);
	snappedValue = Math.round(snappedValue * pow) / pow;

	return snappedValue;
}

function getPrecision(num: number | undefined | null): number {
	if (num == null) return 0;

	const string = num.toString();
	const index = string.indexOf('.');
	return index >= 0 ? string.length - index : 0;
}
