<script lang="ts">
	import Prism from 'prismjs';
	import 'prismjs/components/prism-bash.js';
	import 'prism-svelte';
	import './prism.css';

	export let source: string;
	export let language: 'js' | 'svelte' | 'bash' = 'js';
	export let codeClasses = 'font-mono';

	let _class = '';
	export { _class as class };

	$: highlighted = Prism.highlight(source.trimStart(), Prism.languages[language], language).trim();
</script>

<pre class="language-{language} {_class}" {...$$restProps}><code
		class="language-{language} {codeClasses}">{@html highlighted}</code
	></pre>
