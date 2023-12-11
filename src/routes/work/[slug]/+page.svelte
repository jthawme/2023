<script>
	import Blocks from '$lib/components/Blocks.svelte';
	import Markdown from '$lib/components/Markdown.svelte';
	import Image from '$lib/components/Markdown/Image.svelte';

	export let data;
</script>

<header>
	<h1>{data.metadata.title}</h1>
	<span class="year">{data.metadata.date}</span>
</header>

<hr />

<main class="content">
	<Blocks items={data.metadata.blocks} />
</main>

<style lang="scss">
	header {
		padding: 2rem 0 0;
	}

	h1 {
		text-transform: lowercase;

		margin: 1rem 0 0;
	}
</style>
