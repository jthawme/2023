import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			hoistUseStatements: true,
			scss: {
				additionalData: (content) => {
					const imports = `@import "$lib/styles/common.scss";`;
					// If there are @use statements, insert the import after the last one,
					// otherwise insert it before all content.
					const match = content.match(/@use '[^']+';/g);
					if (match) {
						const last = match[match.length - 1];
						return content.replace(last, `${last}\n${imports}`);
					} else {
						return `${imports}\n${content}`;
					}
				}
			}
		}
	}
});
