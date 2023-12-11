export const convertImageShortcode = (shortcode) => {
	const rule = /^\[\[IMAGE=\s*(.*)?\]\]/;
	const match = rule.exec(shortcode);

	if (match) {
		const data = JSON.parse(match[1]);

		const meta = {
			color: data.metadata.dominant,
			width: data.metadata.width,
			height: data.metadata.height,
			alt: ''
		};

		if ('inline' in data.params) {
			return {
				type: 'inlineimage',
				raw: match[0],

				color: meta.color,
				placeholder: {
					...data.placeholder,
					...meta
				},
				image: {
					src: data.src,
					sources: data.sources,
					...meta
				}
			};
		}

		return {
			type: 'customimage',
			raw: match[0],
			src: data.src,
			sources: data.sources,
			...meta
		};
	}

	return;
};
