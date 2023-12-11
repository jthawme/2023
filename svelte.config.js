import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.md', '.svelte'],
	kit: {
		alias: {
			$data: 'src/data'
		},
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			handleHttpError: 'warn'
		}
	},
	preprocess: [
		// {
		// 	name: 'JTIndustry',
		// 	markup: async ({ content, filename }) => {
		// 		console.log('\nhey playa', filename, '\n');
		// 		if (filename.endsWith('.md')) {
		// 			console.log('HEYYO', content);
		// 		}
		// 		return;
		// 	}
		// },
		vitePreprocess()
	]
};

export default config;
