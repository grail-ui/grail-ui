/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { ScriptTagConfig, ScriptTagReturn } from './scriptTag.types';
import { get, writable } from 'svelte/store';
import { noop } from '../util/noop.js';
import { isClient } from '../util/is.js';
import { toReadable } from '../util/store.js';

export const createScriptTag = (options: ScriptTagConfig): ScriptTagReturn => {
	const defaultDocument = isClient ? window.document : undefined;

	const {
		url,
		immediate = true,
		type = 'text/javascript',
		async = true,
		crossOrigin,
		referrerPolicy,
		noModule,
		defer,
		document = defaultDocument,
		attrs = {},
		onLoaded = noop,
		onError = noop,
	} = options;

	const scriptTag = writable<HTMLScriptElement | null>(null);

	let _promise: Promise<HTMLScriptElement | false> | null = null;

	const loadScript = (waitForScriptLoad: boolean): Promise<HTMLScriptElement | false> =>
		new Promise((resolve, reject) => {
			// Check if document actually exists, otherwise resolve the Promise (SSR Support).
			if (!document) {
				resolve(false);
				return;
			}

			// Some little closure for resolving the Promise.
			const resolveWithElement = (el: HTMLScriptElement) => {
				scriptTag.set(el);
				resolve(el);
				return el;
			};

			// Local variable defining if the <script> tag should be appended or not.
			let shouldAppend = false;

			let script = document.querySelector<HTMLScriptElement>(`script[src="${url}"]`);

			// Script tag not found, preparing the element for appending
			if (!script) {
				script = document.createElement('script');
				script.type = type;
				script.async = async;
				script.src = url;

				// Optional attributes
				if (defer) script.defer = defer;
				if (crossOrigin) script.crossOrigin = crossOrigin;
				if (noModule) script.noModule = noModule;
				if (referrerPolicy) script.referrerPolicy = referrerPolicy;

				Object.entries(attrs).forEach(([name, value]) => script!.setAttribute(name, value));

				// Enables shouldAppend
				shouldAppend = true;
			}
			// Script tag already exists, resolve the loading Promise with it.
			else if (script.hasAttribute('data-loaded')) {
				if (script.getAttribute('data-loaded') === 'true') {
					resolveWithElement(script);
					onLoaded(script!);
				} else {
					onError(script);
					reject(script);
				}

				return;
			}

			// Event listeners
			const handleError = (event: ErrorEvent | UIEvent) => {
				script!.setAttribute('data-loaded', 'false');

				onError(script!, event);
				reject(script);
			};

			script.addEventListener('error', handleError);
			script.addEventListener('abort', handleError);
			script.addEventListener('load', () => {
				script!.setAttribute('data-loaded', 'true');

				onLoaded(script!);
				resolveWithElement(script!);
			});

			// Append the <script> tag to head.
			if (shouldAppend) script = document.head.appendChild(script);

			// If script load awaiting isn't needed, we can resolve the Promise.
			if (!waitForScriptLoad) resolveWithElement(script);
		});

	const load = (waitForScriptLoad = true) => {
		if (!_promise) {
			_promise = loadScript(waitForScriptLoad);
		}

		return _promise;
	};

	const unload = () => {
		if (!document) return;

		_promise = null;

		if (get(scriptTag)) scriptTag.set(null);

		const el = document.querySelector<HTMLScriptElement>(`script[src="${url}"]`);
		if (el) document.head.removeChild(el);
	};

	if (immediate) load();

	return { scriptTag: toReadable(scriptTag), load, unload };
};
