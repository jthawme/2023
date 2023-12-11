<script>
	export let theme = 'primary';
</script>

<span class={`pill ${theme || ''}`}><slot /></span>

<style lang="scss">
	.pill {
		display: inline-block;

		padding: 0 0.25rem;

		border-radius: 1em;

		line-height: 1;
		font-size: var(--pill-font-size, var(--font-size-small));

		background-color: var(--pill-bg, teal);
		color: var(--pill-fg, white);
	}

	.primary {
		--pill-bg: teal;
		--pill-fg: white;
	}

	.secondary {
		--pill-bg: aqua;
		--pill-fg: teal;
	}
</style>
