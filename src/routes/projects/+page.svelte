<script>
	import Pill from '$lib/components/Common/Pill.svelte';

	export let data;
</script>

<main class="content">
	{#each data.metadata.sections as section}
		<h2>{section.title}</h2>

		<ul>
			{#each section.projects as link}
				<li>
					<a href={`/project/${link.relation}`}
						>{link.title}<span class="tags"
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
