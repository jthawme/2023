<script>
	import { navigating } from '$app/stores';
	import { onMount, setContext } from 'svelte';

	import BuxCta from '$lib/components/BuxCta.svelte';
	import NewsletterSignup from '$lib/components/NewsletterSignup.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { BUX_KEY } from '$lib/constants.js';
	import { bux } from '$lib/store/bux.js';
	import '$lib/styles/global.scss';
	import { getPersistedValue } from '$lib/utils.js';
	import Seo from '$lib/components/SEO.svelte';

	export let data;

	setContext('seo', data.metadata.seo);

	onMount(() => {
		bux.init(getPersistedValue(BUX_KEY, 0, (val) => parseInt(val)));
		bux.listen();

		const intervalId = setInterval(() => {
			bux.add(1);
		}, 5000);

		return () => {
			clearInterval(intervalId);
		};
	});

	$: if ($navigating) bux.add(10);
</script>

<Seo />

<PageHeader navigation={data.metadata.navigation} />

<slot />

<BuxCta />

<section class="newsletter-section">
	<hr />
	<NewsletterSignup />
</section>
