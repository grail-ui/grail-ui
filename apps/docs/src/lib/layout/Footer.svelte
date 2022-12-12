<script lang="ts">
	import ExternalLinkIcon from '~icons/prime/external-link';
	import { PUBLIC_GITHUB_URL } from '$env/static/public';

	const footerColumns = [
		{
			title: 'Docs',
			links: [
				{ title: 'Introduction', url: '#todo' },
				{ title: 'Changelog', url: '#todo' },
				{ title: 'Releases', url: '#todo' },
			],
		},
		{
			title: 'Community',
			links: [
				{ title: 'GitHub', url: PUBLIC_GITHUB_URL, external: true },
				{ title: 'Twitter', url: '#todo', external: true },
				{ title: 'Discord', url: '#todo', external: true },
				{ title: 'StackOverflow', url: '#todo', external: true },
			],
		},
	];
</script>

<footer class="mt-5 border-t border-b border-base-content/10 bg-base-200/60">
	<div class="max-w-4xl mx-auto px-4 pt-10 md:pt-20">
		<div class="footer md:place-items-center">
			<div>
				<div class="flex items-center gap-2 text-lg font-bold">Grail UI</div>
			</div>
			{#each footerColumns as column}
				<div>
					<span class="footer-title">{column.title}</span>
					{#each column.links as link}
						<a href={link.url} class="link link-hover"
							>{link.title}
							{#if 'external' in link && link.external}<ExternalLinkIcon
									class="inline-block ml-0.5 text-xs"
								/>{/if}</a
						>
					{/each}
				</div>
			{/each}
		</div>
		<div class="border-t border-b border-base-content/10 mt-10 py-10 text-sm text-center">
			© 2022 made with ❤ by these awesome contributors.<br />Code licensed under the MIT License.
		</div>
	</div>
</footer>
