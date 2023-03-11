import type { TextareaAutosizeReturn } from './textareaAutosize.types';
import { createResizeObserver } from '../resizeObserver/resizeObserver.js';
import { addEventListener } from '../eventListener/eventListener.js';
import { chain } from '../util/chain.js';

export const createTextareaAutosize = (): TextareaAutosizeReturn => {
	const { useResizeObserver } = createResizeObserver();

	const useTextareaAutosize = (node: HTMLTextAreaElement) => {
		function triggerResize() {
			node.style.height = 'auto';
			node.style.height = `${node.scrollHeight}px`;
		}

		const observer = useResizeObserver(node, { handler: () => triggerResize() });
		const removeEvents = chain(addEventListener(node, 'input', triggerResize));

		return {
			destroy() {
				observer?.destroy?.();
				removeEvents();
			},
		};
	};

	return {
		useTextareaAutosize,
	};
};
