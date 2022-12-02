export function clamp(
	value: number,
	min: number | undefined | null,
	max: number | undefined | null
): number {
	return Math.min(Math.max(value, min ?? -Infinity), max ?? Infinity);
}
