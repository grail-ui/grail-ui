<script lang="ts">
	import clsx from 'clsx';
</script>

<button
	class={clsx(
		'inline-flex select-none items-center justify-center rounded-md px-4 py-2 text-sm font-medium',
		'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-900',
		'hover:bg-gray-50'
	)}
	{...$$restProps}><slot /></button
>
