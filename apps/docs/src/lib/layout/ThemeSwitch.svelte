<script lang="ts">
	import SunIcon from '~icons/carbon/sun';
	import NightIcon from '~icons/material-symbols/clear-night';
	import { Theme, theme, toggleTheme } from './layout.store';
</script>

<label class="swap text-base-content/60 hover:text-base-content" title="Toggle theme">
	<input type="checkbox" checked={$theme === Theme.Dark} on:change={toggleTheme} />
	<NightIcon class="swap-on text-2xl" />
	<SunIcon class="swap-off text-2xl" />
</label>
