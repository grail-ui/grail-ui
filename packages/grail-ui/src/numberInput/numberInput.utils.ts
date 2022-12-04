export function observeElement(
	element: HTMLElement,
	property: string,
	callback: (oldValue: string, newValue: string) => void,
	delay = 0
) {
	const elementPrototype = Object.getPrototypeOf(element);
	// eslint-disable-next-line no-prototype-builtins
	if (elementPrototype.hasOwnProperty(property)) {
		const descriptor = Object.getOwnPropertyDescriptor(elementPrototype, property);
		Object.defineProperty(element, property, {
			get: function () {
				// eslint-disable-next-line prefer-rest-params
				return descriptor?.get?.apply(this, arguments as unknown as []);
			},
			set: function () {
				const oldValue = this[property];
				// eslint-disable-next-line prefer-rest-params
				descriptor?.set?.apply(this, arguments as unknown as [v: any]);
				const newValue = this[property];
				if (typeof callback == 'function') {
					setTimeout(callback.bind(this, oldValue, newValue), delay);
				}
				return newValue;
			},
			configurable: true,
		});
	}
}
