import * as factory from '../../factory/index.js';

/** @type {import('./$types.js').PageServerLoad} */
export async function load() {
	const data = await factory.transformFile(`data/projects.md`);
	return data;
}
