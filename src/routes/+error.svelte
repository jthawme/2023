<script>
	import { page } from '$app/stores';
</script>

<p>Woah weird, errors are for chumps, yet here you are? <a href="/">Go home, you're drunk</a></p>

<div class="mess">
	{#each { length: 20 } as i}
		<span>error {$page.status}</span>
	{/each}
</div>
