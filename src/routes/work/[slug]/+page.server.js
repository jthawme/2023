import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import * as factory from '../../../factory/index.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	try {
		const data = await factory.transformFile(`data/${params.slug}.md`);
		return data;
	} catch (e) {
		if (dev) {
			console.error(e);
		}

		throw error(404, {
			message: `Not found: /work/${params.slug}`
		});
	}
}
