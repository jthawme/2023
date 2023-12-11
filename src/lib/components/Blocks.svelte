<script>
	import Markdown from './Markdown.svelte';

	export let items = [];
</script>

{#each items as block}
	<div class={`block block-${block.type}`}>
		{#if block.type === 'image'}
			<Markdown source={block.image} />
		{/if}
		{#if block.type === 'text'}
			<Markdown source={block.text} />
		{/if}
	</div>
{/each}
