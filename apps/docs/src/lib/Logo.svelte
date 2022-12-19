<script lang="ts">
	import Logo from '~icons/grail/logo';

	export let size: number | string = 24;
</script>

<div {...$$restProps}>
	<Logo width={size} height={size} style="padding: 14%" />
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		align-content: center;
		flex-wrap: wrap;
		background-image: linear-gradient(45deg, #4d3ae4 0%, hsl(310, 74%, 45%) 50%, #f88644 100%);
		color: white;
		border-radius: 9999px;
	}
</style>
