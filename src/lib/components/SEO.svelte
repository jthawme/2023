<script>
	export let title = '';
	export let defaultTitle = 'JT';
	export let description = 'The OFFICIAL website of artist Jonny Thaw. Every other site is a fake!';

	$: renderedTitle = title ? `${title} – ${defaultTitle}` : defaultTitle;
</script>

<svelte:head>
	<title>{renderedTitle}</title>
	<meta name="description" content={description} />

	<slot />
</svelte:head>
