import type { PositioningOptions } from './floating.types';
import { readable } from 'svelte/store';
import {
	arrow,
	computePosition,
	autoUpdate,
	type Middleware,
	flip,
	offset,
	shift,
	size,
} from '@floating-ui/dom';
import { noop } from '../util/noop.js';

const defaultOptions: PositioningOptions = {
	strategy: 'absolute',
	placement: 'top',
	gutter: 5,
	flip: true,
	sameWidth: false,
	overflowPadding: 8,
};

const ARROW_TRANSFORM = {
	bottom: 'rotate(45deg)',
	left: 'rotate(135deg)',
	top: 'rotate(225deg)',
	right: 'rotate(315deg)',
};

export const arrowAttrs = (arrowSize = 8) =>
	readable({
		'data-arrow': 'true',
		style: `position: absolute; width: var(--arrow-size, ${arrowSize}px); height: var(--arrow-size, ${arrowSize}px);`,
	});

export function getPlacement(
	reference: HTMLElement | null,
	floating: HTMLElement | null,
	opts: PositioningOptions = {}
): () => void {
	if (!floating || !reference) return noop;

	const options = Object.assign({}, defaultOptions, opts);

	const arrowEl = floating.querySelector<HTMLElement>('[data-arrow=true]');
	const middleware: Middleware[] = [];

	if (options.flip) {
		middleware.push(
			flip({
				boundary: options.boundary,
				padding: options.overflowPadding,
			})
		);
	}

	const arrowOffset = arrowEl ? arrowEl.offsetHeight / 2 : 0;
	if (options.gutter || options.offset) {
		const data = options.gutter ? { mainAxis: options.gutter } : options.offset;
		if (data?.mainAxis != null) data.mainAxis += arrowOffset;
		middleware.push(offset(data));
	}

	middleware.push(
		shift({
			boundary: options.boundary,
			crossAxis: options.overlap,
			padding: options.overflowPadding,
		})
	);

	if (arrowEl) {
		middleware.push(arrow({ element: arrowEl, padding: 8 }));
	}

	middleware.push(
		size({
			padding: options.overflowPadding,
			apply({ rects, availableHeight, availableWidth }) {
				if (options.sameWidth) {
					Object.assign(floating.style, {
						width: `${Math.round(rects.reference.width)}px`,
						minWidth: 'unset',
					});
				}

				if (options.fitViewport) {
					Object.assign(floating.style, {
						maxWidth: `${availableWidth}px`,
						maxHeight: `${availableHeight}px`,
					});
				}
			},
		})
	);

	function compute() {
		if (!reference || !floating) return;
		const { placement, strategy } = options;

		computePosition(reference, floating, {
			placement,
			middleware,
			strategy,
		}).then((data) => {
			const x = Math.round(data.x);
			const y = Math.round(data.y);

			Object.assign(floating.style, {
				top: `${y}px`,
				left: `${x}px`,
			});

			if (arrowEl && data.middlewareData.arrow) {
				const { x, y } = data.middlewareData.arrow;

				const dir = data.placement.split('-')[0] as 'top' | 'bottom' | 'left' | 'right';

				Object.assign(arrowEl.style, {
					position: 'absolute',
					left: x != null ? `${x}px` : '',
					top: y != null ? `${y}px` : '',
					[dir]: `calc(100% - ${arrowOffset}px)`,
					transform: ARROW_TRANSFORM[dir],
					backgroundColor: 'inherit',
					zIndex: 'inherit',
				});
			}

			return data;
		});
	}

	// Apply `position` to floating element prior to the computePosition() call.
	Object.assign(floating.style, {
		position: options.strategy,
	});

	return autoUpdate(reference, floating, compute);
}
