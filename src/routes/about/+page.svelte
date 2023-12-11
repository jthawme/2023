<script>
	import Blocks from '$lib/components/Blocks.svelte';
	import Companies from '$lib/components/Companies.svelte';
	import LastPlayed from '$lib/components/LastPlayed.svelte';
	import Markdown from '$lib/components/Markdown.svelte';
	import Seo from '$lib/components/SEO.svelte';

	export let data;
</script>

<Seo title="About" />

<main class="content">
	<h1>About</h1>

	<Blocks items={[{ type: 'text', text: data.content }]} />

	<LastPlayed />

	<Companies />
</main>
