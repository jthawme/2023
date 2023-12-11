<script>
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	export let src;
	export let sources;
	export let color = 'white';
	export let alt = '';
	export let width = 1;
	export let height = 1;

	let imageEl = null;

	$: aspect = height / width;

	let loaded = false;

	function onLoad() {
		loaded = true;

		dispatch('load');
	}

	onMount(() => {
		if (imageEl.complete) {
			loaded = true;
		}
	});
</script>

<picture class="picture" style={`--aspect: ${aspect}; --dominant: ${color};`} class:loaded>
	{#each sources as source}
		<source srcset={source.srcset} sizes={source.sizes} type={source.type} />
	{/each}
	<img bind:this={imageEl} {src} {alt} loading="lazy" on:load={onLoad} />
</picture>

<style lang="scss">
	.picture {
		position: relative;

		display: inline-block;

		width: 100%;
		height: 0;

		padding-bottom: calc(var(--aspect, 1) * 100%);
		background-color: var(--dominant, 'gray');

		line-height: 0;

		img {
			position: absolute;

			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			opacity: 0;

			transition: {
				duration: 0.25s;
				property: opacity;
			}
		}

		&.loaded img {
			opacity: 1;
		}
	}
</style>
