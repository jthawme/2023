<script>
	import { bux } from '$lib/store/bux.js';
	import { getId } from '$lib/utils.js';

	let messages = [];
	let active = false;

	let val = $bux;
	$: {
		if (val !== $bux) {
			addNote($bux - val);
			val = $bux;
		}
	}

	function limit(val) {
		const v = Math.abs(val);

		if (v > 1000000) {
			return `${(v / 1000000).toFixed(1)}m`;
		} else if (v > 1000) {
			return `${(v / 1000).toFixed(1)}k`;
		}
		return v;
	}

	function addNote(val) {
		const id = getId();

		messages = [
			...messages,
			{
				id,
				text: `${val > 0 ? '+' : '-'}${limit(val)} JT$`
			}
		];

		setTimeout(() => {
			let msgs = messages.slice();
			msgs.splice(
				msgs.findIndex((item) => item.id === id),
				1
			);
			messages = msgs;
		}, 1000);
	}

	function onEnter() {
		active = true;
	}

	function onLeave() {
		active = false;
	}
</script>

<div
	class="counter"
	class:active
	class:hide={$bux === 0}
	on:mouseenter={onEnter}
	on:mouseleave={onLeave}
	role="banner"
>
	<div class="messages">
		{#each messages as message}
			<span>{message.text}</span>
		{/each}
	</div>
	<span>{active ? $bux : limit($bux)} JT$</span> <a href="/shop" class="btn">cash in</a>
</div>

<style lang="scss">
	.counter {
		position: fixed;

		bottom: 1rem;
		right: 1rem;

		&.hide {
			display: none;
		}

		span {
			font-family: var(--font-family-sans-serif);
			font-weight: bold;

			color: blue;
		}
	}

	.messages {
		position: absolute;

		bottom: calc(100% + 0.5rem);
		right: 0;

		display: flex;

		flex-direction: column;
		align-items: flex-end;

		span {
			font-size: var(--font-size-small);
		}
	}
</style>
