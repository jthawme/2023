<script>
	// @ts-nocheck

	import SvelteMarkdown from 'svelte-markdown';
	import { marked } from 'marked';
	import { convertImageShortcode } from '../../factory/image.utils.js';

	import MarkdownImage from './Markdown/Image.svelte';
	import InlineThumbnail from './Common/InlineThumbnail.svelte';

	export let source;

	/** @type {import('marked').TokenizerAndRendererExtension} */
	const selectorTokenizerExtension = {
		name: 'customimage',
		level: 'inline',
		start(src) {
			return src.match(/\[\[IMAGE/)?.index;
		},
		tokenizer(src, tokens) {
			return convertImageShortcode(src);
		}
	};

	marked.use({
		extensions: [selectorTokenizerExtension]
	});
	const options = marked.defaults;
</script>

<SvelteMarkdown
	renderers={{
		customimage: MarkdownImage,
		inlineimage: InlineThumbnail
	}}
	{source}
	{options}
/>
