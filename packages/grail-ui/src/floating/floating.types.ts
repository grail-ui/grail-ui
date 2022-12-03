import type { Boundary } from '@floating-ui/dom';

export type PositioningOptions = {
	/**
	 * The strategy to use for positioning.
	 * @defaultValue `"absolute"`
	 */
	strategy?: 'absolute' | 'fixed';

	/**
	 * The initial placement of the floating element.
	 * @defaultValue `"top"`
	 */
	placement?:
		| 'top'
		| 'top-start'
		| 'top-end'
		| 'right'
		| 'right-start'
		| 'right-end'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'left'
		| 'left-start'
		| 'left-end';

	/**
	 * The offset of the floating element.
	 */
	offset?: { mainAxis?: number; crossAxis?: number };

	/**
	 * The main axis offset or gap between the reference and floating elements.
	 * @defaultValue `5`
	 */
	gutter?: number;

	/**
	 * The virtual padding around the viewport edges to check for overflow.
	 * @defaultValue `8`
	 */
	overflowPadding?: number;

	/**
	 * Whether to flip the placement.
	 * @defaultValue `true`
	 */
	flip?: boolean;

	/**
	 * Whether the floating element can overlap the reference element.
	 * @defaultValue `false`
	 */
	overlap?: boolean;

	/**
	 * Whether to make the floating element same width as the reference element.
	 * @defaultValue `false`
	 */
	sameWidth?: boolean;

	/**
	 * Whether the popover should fit the viewport.
	 * @defaultValue `false`
	 */
	fitViewport?: boolean;

	/**
	 * The overflow boundary of the reference element.
	 */
	boundary?: Boundary;
};
