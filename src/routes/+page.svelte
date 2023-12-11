<script>
	import InlineThumbnail from '$lib/components/Common/InlineThumbnail.svelte';
	import Seo from '$lib/components/SEO.svelte';
</script>

<Seo />

<main class="content">
	<div class="block block-text">
		<p>
			My name is Jonny Thaw <InlineThumbnail
				placeholder="images/small.jpg"
				image="/images/large.jpg"
			/>, welcome to my website. I am an artist mainly utilising code <InlineThumbnail
				image="/images/large.jpg"
			/>, like a carpenter uses a saw. I have some preferences in which saw I use, but ultimately
			they’re all saws and if they cut wood, it ticks the box.
		</p>

		<p>I work at Mschf <InlineThumbnail image="/images/large.jpg" /></p>

		<p>I am an associate lecturer at Ual <InlineThumbnail image="/images/large.jpg" /></p>
	</div>
</main>

<svelte:head>
	<script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async defer></script>
</svelte:head>
