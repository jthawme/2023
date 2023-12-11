<script>
	export let title;
	export let stretch = false;
</script>

<span class="title" class:stretch aria-label={title}>
	{#each title.split('') as char}<span>{char}</span>{/each}
</span>

<style lang="scss">
	@use 'sass:list';
	@use 'sass:math';

	@keyframes WAVE {
		to {
			transform: translate(0, -25%);
		}
	}

	.title {
		display: inline-flex;

		gap: var(--bounce-gap, 0.25em);

		justify-content: space-between;

		font-family: var(--font-family-sans-serif);
		font-weight: 600;
		font-size: var(--bounce-font-size, var(--font-size-medium));

		text-transform: uppercase;

		margin: 0.8em 0;

		&.stretch {
			width: 100%;
		}

		span {
			animation-name: WAVE;
			animation-duration: 0.35s;
			animation-direction: alternate;
			animation-iteration-count: infinite;
			transform: translate(0, 25%);
		}

		$colors: red, blue, green, yellow, fuchsia, purple, aqua, teal;
		$len: list.length($colors);

		@each $color in $colors {
			$i: list.index($colors, $color);

			span:nth-child(#{$len}n + #{$i}) {
				color: $color;
				animation-delay: #{$i * math.div(1, $len)}s;
			}
		}
	}
</style>
