<script>
	const companies = [
		'KALING INTERNATIONAL',
		'GREEN MOUNTAIN POWER',
		'BICYCLE HEALTH',
		'OPENSEA',
		'REC ROOM',
		'TOGETHER LABS',
		'ASTROSCALE',
		'BIOBOT ANALYTICS',
		'OXFORD NANOPORE TECHNOLOGIES',
		'IONQ',
		'THE SANDBOX',
		'REDWOOD MATERIALS',
		'TREK BICYCLE',
		'BLOCPOWER',
		'FOLX HEALTH',
		'OPENAI',
		'BE ROOTED',
		'WONDERSCHOOL',
		'AXIOM SPACE',
		'AMAZON',
		'PFIZER',
		'UPS',
		'ALPHABET',
		'CAPITAL ONE',
		'UNITED AIRLINES',
		'MAERSK',
		'NUBANK',
		'FORD',
		'IBM',
		'META',
		'MICROSOFT',
		'APPLE',
		'WALMART',
		'NVIDIA',
		'BYD CO. LTD.',
		'DISNEY',
		'NETFLIX',
		'NATIONAL FOOTBALL LEAGUE',
		'HYBE',
		'SPOTIFY',
		'AIRBNB',
		'ALASKA AIRLINES',
		'EV CONNECT',
		'UPWORK',
		'SONY',
		'CALM',
		'NEXTDOOR',
		'HOK',
		'CURALEAF',
		'IMPOSSIBLE FOODS',
		'ORSTED',
		'NYKAA',
		'PATAGONIA',
		'BALENCIAGA',
		'KAMI',
		'REDDIT',
		'REVOLUT',
		"SOTHEBY'S",
		'DOORDASH',
		'WALGREENS',
		'RIVIAN',
		'SOFI',
		'MODERNA',
		'GUILD EDUCATION',
		'CLIMEWORKS',
		'NOTRAFFIC',
		'PEANUT',
		'KLARNA',
		'GRAMMARLY',
		'MODULATE',
		'PIGEONLY',
		'FLEXPORT',
		'JORO',
		'RENDEVER',
		'ATHLETIC BREWING COMPANY',
		'PERFECT DAY',
		'FADING WEST',
		'FLOCK FREIGHT',
		'ALLBIRDS',
		'WYZE',
		'ENGINE NO. 1',
		'AMC ENTERTAINMENT HOLDINGS',
		'TIKTOK',
		'OPIBUS',
		'STARRY',
		'SKIMS',
		'TWIGA FOODS',
		'THRIVE MARKET',
		'HEALTHIER GROCERY DELIVERY',
		'SUPERGOOP!',
		'NSO GROUP',
		'DIVVY HOMES',
		'GOTO GROUP',
		'SHEIN',
		'PAXFUL',
		'GOODRX',
		'THE PINKFONG COMPANY',
		'CONTEMPORARY AMPEREX TECHNOLOGY CO. LTD.',
		'TOO GOOD TO GO',
		'SONDER',
		'SPINLAUNCH'
	];
	companies.sort((a, b) => a.localeCompare(b));
</script>

<section class="block block-free">
	<h2>Companies</h2>
	<div class="companies">
		{#each companies as company}
			<span>{company}</span>
		{/each}
	</div>
	<p>
		<em
			>Just to be clear, I haven't worked with any of these companies, they were all on a Time 100
			list, they are all probably shite.</em
		>
	</p>
</section>

<style lang="scss">
	.companies {
		display: grid;

		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		gap: 1rem;

		span {
			font-size: var(--font-size-small);
			text-transform: lowercase;
		}
	}
</style>
