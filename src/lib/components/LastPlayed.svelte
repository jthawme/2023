<script>
	import { onMount } from 'svelte';
	import InlineThumbnail from './Common/InlineThumbnail.svelte';
	import BounceTitle from './Common/BounceTitle.svelte';
	import { lastPlayedStore } from '$lib/store/playing.js';

	let tracks = $lastPlayedStore;

	async function retrieveTracks() {
		const data = await fetch(
			'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=jawknee4&api_key=fc9a1cb8bc3ba37735ff3941152cb985&format=json&limit=10'
		).then((resp) => resp.json());

		tracks = data.recenttracks.track.map((item) => {
			return {
				title: item.name,
				album: item.album['#text'],
				artist: item.artist['#text'],
				nowPlaying: !!item?.['@attr']?.nowplaying,
				date: item?.date?.['#text'],
				image: {
					placeholder: (item.image.find((img) => img.size === 'small') ?? item.image[0])?.['#text'],
					image: (item.image.find((img) => img.size === 'extralarge') ??
						item.image[item.image.length - 1])?.['#text']
				}
			};
		});

		lastPlayedStore.update(() => tracks);
	}

	onMount(() => {
		retrieveTracks();

		let intervalId = setInterval(() => {
			retrieveTracks();
		}, 10000);

		return () => clearInterval(intervalId);
	});
</script>

<section class="block block-free">
	<h2>What I've been listening to</h2>

	<ul>
		{#if tracks.length === 0}
			<li>
				Can't load, but probably <a
					href="https://open.spotify.com/album/4QElAwQufg6wCeyvpafqwA"
					target="_blank">Modern Baseball – You're gonna miss it all</a
				>
				<InlineThumbnail
					image="https://upload.wikimedia.org/wikipedia/en/4/4a/Modern_Baseball_You%27re_Gonna_Miss_It_All.png"
				/>
			</li>
		{:else}
			{#each tracks as track}
				<li>
					{#if track.nowPlaying}
						<BounceTitle title={`${track.title} – ${track.artist}`} />
					{:else}
						{track.title} – <em>{track.artist}</em>
					{/if}

					{#if track.image.image}<InlineThumbnail {...track.image} />{/if}

					{#if track.date}<sup>{track.date}</sup>{:else}<sup>Playing now!!</sup>{/if}
				</li>
			{/each}
		{/if}
	</ul>
</section>

<style lang="scss">
	ul {
		--bounce-font-size: var(--font-size-small);

		li {
			sup {
				font-family: var(--font-family-sans-serif);
				color: gray;
			}
		}
	}
</style>
