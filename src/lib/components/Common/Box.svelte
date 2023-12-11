<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let title = null;
	export let close = true;

	let clazz = '';
	export let contentClass = '';

	export { clazz as class };

	function onClose() {
		dispatch('close');
	}
</script>

<div class={`box ${clazz || ''}`}>
	{#if title || close}
		<header>
			<span class="title">{title}</span>

			{#if close}
				<button class="close" on:click={onClose}>x</button>
			{/if}
		</header>
	{/if}

	<div class={`content ${contentClass || ''}`}>
		<slot />
	</div>
</div>

<style lang="scss">
	.box {
		border: 2px inset gray;
	}

	header {
		display: flex;

		justify-content: space-between;

		padding: 0;
		text-transform: lowercase;

		font-size: 10px;

		border-bottom: 2px solid gray;
	}

	.title {
		display: inline-block;

		padding: 0.3rem;
	}

	.close {
		border: none;

		padding: 0.25rem;
		margin: 0;

		outline: none;

		color: blue;
		border: 1px inset white;

		@include hover {
			color: yellow;
			background-color: gray;
			border: 1px inset black;
			cursor: pointer;
		}
	}
</style>
