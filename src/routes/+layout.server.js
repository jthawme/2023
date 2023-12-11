import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import * as factory from '../factory/index.js';
import { setContext } from 'svelte';

/** @type {import('./$types.js').LayoutServerLoad} */
export async function load() {
	const data = await factory.transformFile(`data/meta.md`);
	return data;
}
