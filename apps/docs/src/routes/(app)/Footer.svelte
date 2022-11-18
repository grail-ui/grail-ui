<script lang="ts">
  import ExternalLinkIcon from '~icons/prime/external-link';

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
        { title: 'GitHub', url: '#todo', external: true },
        { title: 'Twitter', url: '#todo', external: true },
        { title: 'Discord', url: '#todo', external: true },
        { title: 'StackOverflow', url: '#todo', external: true },
      ],
    },
  ];
</script>

<footer class="mt-5">
  <div class="container mx-auto max-w-5xl px-4 pt-10 md:pt-20">
    <div class="footer">
      <div>
        <div class="flex items-center gap-2 text-lg font-bold">Grail UI</div>
      </div>
      {#each footerColumns as column}
        <div>
          <span class="footer-title">{column.title}</span>
          {#each column.links as link}
            <a href={link.url} class="link link-hover"
              >{link.title}
              {#if 'external' in link && link.external}<ExternalLinkIcon class="inline-block ml-0.5 text-xs" />{/if}</a
            >
          {/each}
        </div>
      {/each}
    </div>
    <div class="border-t mt-10 py-10 text-sm text-center">
      © 2022 made with ❤ by these awesome contributors.<br />Code licensed under the MIT License.
    </div>
  </div>
</footer>

<style>
  footer {
    background-color: rgb(248, 249, 250);
  }
</style>
