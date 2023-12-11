import * as factory from '../../factory/index.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const data = await factory.transformFile(`data/about.md`);
	return data;
}
