<script>
	// @ts-nocheck
	import { bux } from '$lib/store/bux.js';
	import { clickOutside } from '$lib/utils.js';
	import Image from '../Markdown/Image.svelte';
	import Box from './Box.svelte';

	export let image;
	export let placeholder = null;
	export let color = 'white';
	export let alt = '';

	$: internalPlaceholder = placeholder ?? image;

	let popover = null;

	let showImage = false;
	let showThumbnail = false;
	let permanent = false;

	$: width = typeof image === 'string' ? 'auto' : `${(image.width / image.height) * 1.3}em`;

	function onLoadThumbnail() {
		showThumbnail = true;
	}

	function loaded() {
		showImage = true;
	}

	function onClickEnter() {
		permanent = true;
		onEnter();
	}

	function onKeyEnter(e) {
		if (e.key === 'Enter') {
			permanent = true;
			onEnter();
		}
	}

	function onEnter() {
		bux.add(2);
		popover.togglePopover();
	}

	function onLeave() {
		if (!permanent) {
			popover?.hidePopover();
		}
	}

	function onClose() {
		permanent = false;
		onLeave();
	}

	let unlisten;

	$: {
		if (permanent) {
			unlisten = clickOutside(popover, () => {
				onClose();
			});
		} else if (unlisten) {
			unlisten();
		}
	}
</script>

<span
	tabindex="-1"
	class="thumbnail"
	class:show={showThumbnail}
	on:mouseenter={onEnter}
	on:mouseleave={onLeave}
	on:click={onClickEnter}
	on:keyup={onKeyEnter}
	role="button"
	style={`--thumbnail-color: ${color}; --width: ${width}`}
>
	{#if typeof internalPlaceholder === 'string'}<img
			src={internalPlaceholder}
			{alt}
			on:load={onLoadThumbnail}
		/>
	{:else}
		<Image {...internalPlaceholder} on:load={onLoadThumbnail} />
	{/if}
</span>

<div popover bind:this={popover} class={`popover`} class:permanent class:show={showImage}>
	<Box title="Thumbnail Viewer" close={permanent} on:close={onClose} contentClass="popover-content">
		<div class="image">
			{#if typeof image === 'string'}<img src={image} {alt} on:load={loaded} />
			{:else}
				<Image {...image} on:load={loaded} />
			{/if}
		</div>

		{#if typeof internalPlaceholder === 'string'}<img
				src={internalPlaceholder}
				{alt}
				class="aspect"
				on:load={onLoadThumbnail}
			/>
		{:else}
			<Image class="aspect" {...internalPlaceholder} on:load={onLoadThumbnail} />
		{/if}
	</Box>
</div>

<style lang="scss">
	.thumbnail {
		display: inline-block;

		height: var(--thumbnail-size, 1.3em);
		width: var(--width, auto);

		border-radius: 0.25em;
		overflow: hidden;

		transform: translate(0, 20%);

		line-height: 0;

		background-color: var(--thumbnail-color, white);

		img {
			height: 100%;
			width: auto;
			opacity: 0;
		}

		&.show img {
			opacity: 1;
		}

		// anchor-name: --thumbnail;
	}

	// @position-fallback --top-to-bottom {
	// 	@try {
	// 		bottom: anchor(top);
	// 		left: anchor(center);
	// 	}

	// 	@try {
	// 		top: anchor(bottom);
	// 		left: anchor(center);
	// 	}
	// }

	.popover {
		// anchor-default: --thumbnail;
		// position-fallback: --top-to-bottom;

		// bottom: anchor(top);
		// left: anchor(center);

		// width: calc(4 * anchor-size(--thumbnail width));
		width: 300px;

		padding: 0;
		border: none;

		&:not(.permanent) {
			pointer-events: none;
		}

		.image {
			position: absolute;

			top: 0;
			left: 0;
			right: 0;
			bottom: 0;

			opacity: 1;

			z-index: 2;
		}

		.aspect {
			width: 100%;
			height: auto;
		}

		:global(.popover-content) {
			position: relative;

			line-height: 0;

			background-color: var(--thumbnail-color, white);
		}
	}
</style>
