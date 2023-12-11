import { walkAsync } from 'walkjs';
import * as yaml from 'js-yaml';
import { searchAndReplace } from './image.js';
import { dataLookup } from './common.js';
import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';

const dataFiles = import.meta.glob('../data/**/*.md', { as: 'raw' });
const keys = Object.keys(dataFiles);

const FRONTMATTER_FENCE = '---\n';

const set = (obj, path, value) => {
	// Regex explained: https://regexr.com/58j0k
	const pathArray = (Array.isArray(path) ? path : path.match(/([^[.\]])+/g)).map((k) => {
		if (typeof k === 'string') {
			return k.replace(/['"]+/g, '');
		}
		return k;
	});

	pathArray.reduce((acc, key, i) => {
		if (acc[key] === undefined) acc[key] = {};
		if (i === pathArray.length - 1) acc[key] = value;
		return acc[key];
	}, obj);
};

const walkObject = async (metadata) => {
	const obj = {};

	await walkAsync(metadata, {
		onVisit: {
			async callback(node) {
				if (node.isRoot) {
					return;
				}

				if (node.nodeType === 'object') {
					set(obj, node.getPath(), {});
				}
				if (node.nodeType === 'array') {
					set(obj, node.getPath(), []);
				}
				if (node.nodeType === 'value') {
					if (typeof node.val === 'string') {
						set(obj, node.getPath(), await searchAndReplace(node.val));
					} else {
						set(obj, node.getPath(), node.val);
					}
				}
			}
		}
	});

	return obj;
};

/**
 *
 * @param {string} _key
 * @returns {Promise<any>}
 */
export const transformFile = async (_key) => {
	try {
		const key = dataLookup(_key, keys);

		if (!key) {
			throw new Error(`No file: ${_key}`);
		}

		const fileData = await dataFiles[key]();

		const data = {
			content: fileData,
			metadata: null
		};

		if (fileData.startsWith(FRONTMATTER_FENCE)) {
			const block = fileData.substring(
				FRONTMATTER_FENCE.length,
				fileData.lastIndexOf(FRONTMATTER_FENCE)
			);

			data.metadata = await walkObject(yaml.load(block.trim()));
			data.content = fileData.substring(
				fileData.lastIndexOf(FRONTMATTER_FENCE) + FRONTMATTER_FENCE.length
			);
		}

		return {
			...data,
			content: await searchAndReplace(data.content)
		};
	} catch (e) {
		if (dev) {
			console.error(e);
		}

		throw error(404, {
			message: `Not found: ${_key}`
		});
	}
};
