import { BUX_KEY } from '$lib/constants.js';
import { persistValue } from '$lib/utils.js';
import { writable, get } from 'svelte/store';

const buxStore = writable(0);

export const bux = {
	...buxStore,

	init(val) {
		buxStore.set(val);
	},

	add(amt = 1) {
		return new Promise((resolve) => {
			buxStore.update((val) => val + amt);
			resolve();
		});
	},

	deduct(amt = 1) {
		return new Promise((resolve) => {
			buxStore.update((val) => val - amt);
			resolve();
		});
	},

	has(amt) {
		return get(buxStore) >= amt;
	},

	listen() {
		buxStore.subscribe((val) => {
			persistValue(BUX_KEY, val.toString());
		});
	}
};
