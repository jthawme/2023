<script>
	import Pill from '$lib/components/Common/Pill.svelte';

	let sections = [
		{
			title: 'Art Projects',
			links: [
				{
					text: 'Picture-in-Painting',
					to: '/work/test',
					tags: [
						{
							text: 'Installation',
							theme: 'primary'
						}
					]
				},
				{
					text: 'OCR Font',
					to: '/work/test',
					tags: [
						{
							text: 'Mixed Media',
							theme: 'primary'
						}
					]
				},
				{
					text: 'Johnny Trash',
					to: '/work/test',
					tags: [
						{
							text: 'Zine',
							theme: 'primary'
						}
					]
				},
				{
					text: 'Interrail',
					to: '/work/test',
					tags: [
						{
							text: 'Zine',
							theme: 'primary'
						}
					]
				},
				{
					text: 'Drum Generates',
					to: '/work/test',
					tags: [
						{
							text: 'Installation',
							theme: 'primary'
						}
					]
				}
			]
		},
		{
			title: 'Web Projects',
			links: [
				{
					text: 'Endless Vine',
					to: '/work/test',
					tags: [
						{
							text: 'Silly',
							theme: 'secondary'
						}
					]
				},
				{
					text: 'Kinegram',
					to: '/work/test',
					tags: [
						{
							text: 'Niche',
							theme: 'secondary'
						}
					]
				},
				{
					text: 'Watch Better Films',
					to: '/work/test',
					tags: [
						{
							text: 'Useful',
							theme: 'secondary'
						}
					]
				},
				{
					text: 'Friends of Kerouac',
					to: '/work/test',
					tags: [
						{
							text: 'Homage',
							theme: 'secondary'
						}
					]
				},
				{
					text: 'Neighbourgoods',
					to: '/work/test',
					tags: [
						{
							text: 'Good intentions',
							theme: 'secondary'
						}
					]
				}
			]
		}
	];
</script>

<main class="content">
	{#each sections as section}
		<h2>{section.title}</h2>

		<ul>
			{#each section.links as link}
				<li>
					<a href={link.to}
						>{link.text}<span class="tags"
							>{#each link.tags as tag}<Pill theme={tag.theme}>{tag.text}</Pill>{/each}</span
						></a
					>
				</li>
			{/each}
		</ul>
	{/each}
</main>

<style lang="scss">
	ul {
		text-transform: lowercase;
	}

	.tags {
		display: inline-flex;

		vertical-align: super;

		padding: 0 0.25rem;
		gap: 0.25rem;
	}
</style>
