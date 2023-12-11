<script>
	// @ts-nocheck

	import { formDataToObject, timer } from '$lib/utils.js';
	import BounceTitle from './Common/BounceTitle.svelte';

	let title = 'Newsletter';

	let disabled = false;

	/** @type {string | null}*/
	let error = null;
	let timerId;

	function addEphemeralError(txt, time = 2000) {
		clearTimeout(timerId);

		error = txt;

		timerId = setTimeout(() => {
			error = null;
		}, time);
	}

	/**
	 *
	 * @param {SubmitEvent & { target: HTMLFormElement }} e
	 */
	async function onSubmit(e) {
		const el = e.target;

		if (disabled || !el) {
			return;
		}

		try {
			disabled = true;

			const fd = new FormData(el);
			const data = formDataToObject(fd);

			console.log(data);

			await timer(1000);
			throw new Error('e-mail is already signed up apaz');
		} catch (e) {
			addEphemeralError(e.message ?? 'Unknown error');
		} finally {
			disabled = false;
		}
	}
</script>

<form on:submit|preventDefault={onSubmit}>
	<p class="desc">great content!! never spam!! about once every 6 months!!</p>
	<p>
		<BounceTitle stretch title="Newsletter" />
	</p>

	<input {disabled} name="email" type="email" placeholder="E-mail address" />

	{#if error}
		<p class="error">{error}</p>
	{/if}

	<button {disabled} class="btn default">sign up</button>
</form>

<style lang="scss">
	form {
		border: 3px solid blue;

		border-radius: 0.8em;

		padding: 0.5em;

		max-width: 395px;

		text-align: center;
	}

	.desc {
		margin: 0;
	}

	input[type='email'] {
		display: block;

		border: 2px inset gray;
		background-color: transparent;

		outline: none;

		padding: 0.25em;
		margin: 0.25em 0 0.5em;

		width: 100%;

		&:focus {
			background-color: white;
		}
	}

	.error {
		color: var(--color-bad);
		font-style: italic;
	}
</style>
