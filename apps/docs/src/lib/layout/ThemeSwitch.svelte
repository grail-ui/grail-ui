<script lang="ts">
	import SunIcon from '~icons/carbon/sun';
	import NightIcon from '~icons/material-symbols/clear-night';
	import { Theme, theme, toggleTheme } from './layout.store';
</script>

<button
	type="button"
	class="swap text-base-content/60 hover:text-base-content"
	class:swap-active={$theme === Theme.Dark}
	title="Toggle theme"
	on:click={toggleTheme}
>
	<SunIcon class="swap-on" />
	<NightIcon class="swap-off" />
</button>
