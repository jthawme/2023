import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import * as factory from '../../../factory/index.js';

/** @type {import('./$types.js').PageServerLoad} */
export async function load({ params }) {
	const data = await factory.transformFile(`data/projects/${params.slug}.md`);
	return data;
}
