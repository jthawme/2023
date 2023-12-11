/**
 *
 * @param {string} key
 * @param {string[]} keys
 * @returns {string | false}
 */
export const dataLookup = (key, keys = []) => {
	const lookups = [key, `../${key}`];
	return lookups[lookups.findIndex((l) => keys.includes(l))] ?? false;
};
