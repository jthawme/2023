<script>
	import Blocks from '$lib/components/Blocks.svelte';
	import Markdown from '$lib/components/Markdown.svelte';

	export let data;

	/**
	 *
	 * @param {Date} date
	 */
	function year(date) {
		return date.getFullYear();
	}
</script>

<header>
	<h1>{data.metadata.title}</h1>
	<span class="year">{year(data.metadata.date)}</span>
</header>

<hr />

<main class="content">
	<Blocks items={data.metadata.blocks} />
	<Markdown source={data.content} />
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
