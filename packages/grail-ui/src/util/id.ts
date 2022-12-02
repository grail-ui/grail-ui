// Generate a unique id (unique within the entire client session).
// Useful for temporary DOM ids.
const idCounter: { [key: string]: number } = {};
export function uniqueId(prefix = 'uid') {
	if (!(prefix in idCounter)) {
		idCounter[prefix] = 0;
	}
	return `${prefix}_${++idCounter[prefix]}`;
}
