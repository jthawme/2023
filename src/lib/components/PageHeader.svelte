<script>
	export let navigation = [];

	$: links = navigation.map((item) => ({
		text: item.text,
		href: item.link,
		props: item.new_tab
			? {
					target: '_blank'
			  }
			: {}
	}));
</script>

<header>
	<a href="/" class="title"><h1>jthawme</h1></a>

	<ul>
		{#each links as link}
			<li><a href={link.href} {...link.props}>{link.text}</a></li>
		{/each}
	</ul>
</header>

<style lang="scss">
	.title {
		text-decoration-line: underline;
		text-decoration-style: wavy;
		text-decoration-color: red;
		text-decoration-skip-ink: none;

		color: black;

		h1 {
			font-size: var(--font-size-large);

			margin: 0;
		}

		@include hover {
			color: blue;
			text-decoration-color: yellow;
		}
	}

	ul {
		display: flex;

		margin: 0.5rem 0 0;
		padding: 0;

		list-style: none;

		gap: 0.5rem;

		a {
			text-transform: lowercase;
		}
	}
</style>
