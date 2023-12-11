import sharp from 'sharp';
import hasha from 'hasha';
import * as path from 'path';
import { ensureDirSync } from 'fs-extra';
import * as url from 'url';

import { promiseRunner } from '$lib/utils.js';
import { dev } from '$app/environment';

// A loose cheap cache atm
const imageCache = {};

const images = import.meta.glob('../data/uploads/**/*.{png,jpg,jpeg,PNG,JPEG,webp}', {
	eager: true,
	as: 'url'
});
const imageKeys = Object.keys(images);

// Regex to search any text string for any signs of image paths
const imageRegex = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif)(\?\S+)?)/gi;

const options = {
	sizes: [320, 640, 768, 1024, 1280, 1920]
};

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const root = process.cwd();

const asset = (file = '') => {
	if (dev) {
		return path.join(root, 'static', 'assets', file);
	}

	return path.join(root, 'build', 'assets', file);
};

const formatMap = {
	jpeg: 'image/jpeg',
	jpg: 'image/jpeg',
	png: 'image/png',
	webp: 'image/webp'
};

const getMimeType = (format) => {
	if (typeof format !== 'undefined' && format in formatMap) {
		return formatMap[format ?? ''];
	}

	return '';
};
/**
 * A utility for creating a file name out of various options
 *
 * @param file
 * @param hash
 * @param param2
 * @returns
 */
const fileConstruct = (file, hash, { suffix = null, ext = null } = {}) => {
	// Get the period-less extension
	const _ext = ext ?? path.extname(file).slice(1);

	// Will be using the hash as the ultimate base for this file
	const parts = [hash];

	// This allows us to add a suffix, useful for sizes where
	// we don't know the actual hash ahead of time
	if (suffix) {
		parts.push(suffix);
	}

	// Join all together with periods
	return [...parts, _ext].join('.');
};

/**
 * A utility for saving a sharp image to the asset directory
 * and then immediately returning its absolute path
 *
 * @param node
 * @param target
 * @returns
 */
const saveFile = (node, target) => {
	return node.toFile(asset(target)).then(() => {
		console.log(`✅ Generated: ${asset(target)}`);
		return `/assets/${target}`;
	});
};

/**
 * Turns file route into a saved hash version of said image
 *
 * @param src
 * @returns
 */
const convertFile = (src, _node) => {
	const hash = hasha.fromFileSync(src, {
		algorithm: 'md5'
	});

	return saveFile(_node ?? sharp(src), fileConstruct(src, hash));
};

const constructNode = (files, type) => {
	return {
		srcset: files.map(([file, size]) => `${file} ${size}w`).join(', '),
		sizes: files
			.map(([file, size], idx, arr) => {
				const parts = [`100vw`];

				if (idx < arr.length - 1) {
					parts.unshift(`(max-width: ${size}px)`);
				}

				return parts.join(' ');
			})
			.join(', '),
		type
	};
};

const convertSource = async (src, _node, format) => {
	const node = _node ?? sharp(src);
	const { width = 1000, format: inferredFormat } = await node.metadata();

	const hash = hasha.fromFileSync(src, { algorithm: 'md5' });
	const sizes = options.sizes.filter((size) => size < width);

	const files = await Promise.all(
		sizes.map((size) => {
			const target = fileConstruct(src, hash, {
				suffix: size.toString(),
				ext: format
			});
			return saveFile(node.resize(size), target).then((target) => {
				return [target, size];
			});
		})
	);

	return constructNode(files, getMimeType(format ?? inferredFormat));
};

const convertImageDictionary = async (src) => {
	const { format, width, height } = await sharp(src).metadata();
	const { dominant } = await sharp(src).stats();

	const small = sharp(src).resize(50);

	if (src in imageCache) {
		return imageCache[src];
	}

	const data = {
		metadata: {
			format,
			width,
			height,
			dominant: `rgb(${[dominant.r, dominant.g, dominant.b].join(',')})`
		},
		src: await convertFile(src),
		sources: await Promise.all([
			convertSource(src, sharp(src).webp(), 'webp'),
			convertSource(src, sharp(src))
		]),
		placeholder: {
			src: await convertFile(src, small),
			sources: await Promise.all([
				convertSource(src, small.webp(), 'webp'),
				convertSource(src, small)
			])
		}
	};

	imageCache[src] = data;

	return data;
};

const getAbsolutePath = (img) => {
	if (img.startsWith('/_app/immutable')) {
		return path.join(root, '.svelte-kit/output/client', img);
	}

	return path.join(root, img);
};

/**
 *
 * @param {string} text
 * @returns {Promise<string>}
 */
export const searchAndReplace = async (text) => {
	ensureDirSync(asset());

	const matches = [...text.matchAll(imageRegex)];
	let localText = text;

	await promiseRunner(matches, async (match, idx) => {
		localText = localText.replace(match[1], `~@${idx}@~`);

		const [url, paramString = ''] = match[1].split('?');
		const params = new URLSearchParams(paramString);

		const imageKey = imageKeys.find((k) => k.endsWith(url));

		const imageDict = await convertImageDictionary(getAbsolutePath(images[imageKey]));

		localText = localText.replace(
			`~@${idx}@~`,
			`[[IMAGE=${JSON.stringify({
				...imageDict,
				params: Object.fromEntries(params)
			})}]]`
		);
	});

	return localText;
};
