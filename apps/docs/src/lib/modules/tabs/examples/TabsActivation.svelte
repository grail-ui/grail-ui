<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

By default, the tab can be selected when it receives focus from either the keyboard or pointer
interaction. This is called "automatic tab activation". The other approach is "manual tab
activation" which means the tab is selected with the Enter key or by clicking on the tab.

<Highlight
	source={`createTabs({
  activationMode: "manual",
})`}
	lines={[2]}
/>
