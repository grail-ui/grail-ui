<script lang="ts">
	import hljs from 'highlight.js/lib/core';
	import xml from 'highlight.js/lib/languages/xml';
	import javascript from 'highlight.js/lib/languages/javascript';
	import css from 'highlight.js/lib/languages/css';

	export let code: string | undefined = undefined;
	export let lines: number[] = [];

	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('css', css);

	let highlighted: string;
	$: {
		const html = code ? hljs.highlightAuto(code).value : '';

		if (lines.length === 0) {
			highlighted = html;
		} else {
			let i = 0;
			highlighted = html.replace(/([ \S]*\n|[ \S]*$)/gm, function (match) {
				i++;
				return `<div class="code-line">${match}${lines.includes(i) ? '<div class="highlight-line" />' : ''}</div>`;
			});
		}
	}
</script>

<!-- prettier-ignore -->
<pre data-language="svelte" {...$$restProps}><code class="hljs" style="position: relative">{@html highlighted}</code></pre>

<style>
	:global(.code-line) {
		display: inline;
	}

	:global(.highlight-line)::after {
		content: ' ';
		position: absolute;
		left: 0;
		right: 0;
		background: hsl(var(--bc) / 0.1);
		border-left: 2px solid #48bb78;
	}
</style>
