<script lang="ts">
	import ExternalLinkIcon from '~icons/prime/external-link';
	import LogoType from '$lib/LogoType.svelte';
	import { PUBLIC_DISCORD_URL, PUBLIC_GITHUB_URL } from '$env/static/public';

	const footerColumns = [
		{
			title: 'Docs',
			links: [
				{ title: 'Introduction', url: '/svelte/getting-started' },
				{
					title: 'Changelog',
					url: `${PUBLIC_GITHUB_URL}/blob/master/packages/grail-ui/CHANGELOG.md`,
					external: true,
				},
				{ title: 'Releases', url: `${PUBLIC_GITHUB_URL}/releases`, external: true },
			],
		},
		{
			title: 'Community',
			links: [
				{ title: 'GitHub', url: PUBLIC_GITHUB_URL, external: true },
				{ title: 'Discord', url: PUBLIC_DISCORD_URL, external: true },
				{
					title: 'StackOverflow',
					url: 'https://stackoverflow.com/questions/tagged/grail-ui',
					external: true,
				},
			],
		},
	];
</script>

<footer class="border-base-content/10 bg-base-200/60 prose border-t">
	<div class="mx-auto max-w-4xl px-4 pt-10 md:pt-20">
		<div class="footer md:place-items-center">
			<div class="self-start">
				<div class="flex items-center gap-2 text-lg font-bold">
					<LogoType height={25} />
				</div>
			</div>
			{#each footerColumns as column}
				<div>
					<span class="footer-title">{column.title}</span>
					{#each column.links as link}
						<a href={link.url}
							>{link.title}
							{#if 'external' in link && link.external}<ExternalLinkIcon
									class="ml-0.5 inline-block text-xs"
								/>{/if}</a
						>
					{/each}
				</div>
			{/each}
		</div>
		<div class="border-base-content/10 mt-10 border-t py-10 text-center text-sm">
			© 2022 made with ❤ by these awesome <a href={`${PUBLIC_GITHUB_URL}/contributors`}
				>contributors</a
			>.<br />Code licensed under the MIT License.
		</div>
	</div>
</footer>
