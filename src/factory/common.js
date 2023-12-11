/**
 *
 * @param {string} key
 * @param {string[]} keys
 * @returns {string | false}
 */
export const dataLookup = (key, keys = []) => {
	const lookups = [`../${key}`, key];
	return (
		keys[
			keys.findIndex((l) => {
				return !!lookups.some((k) => l.endsWith(k));
			})
		] ?? false
	);
};
