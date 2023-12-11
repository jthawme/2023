<script>
	import { getContext } from 'svelte';

	export let title = '';
	export let description = '';

	let defaultSeo = getContext('seo');

	$: defaultTitle = defaultSeo.title;
	$: defaultDescription = defaultSeo.description;

	$: renderedTitle = title ? `${title} – ${defaultTitle}` : defaultTitle;
</script>

<svelte:head>
	<title>{renderedTitle}</title>
	<meta name="description" content={description || defaultDescription} />

	<slot />
</svelte:head>
