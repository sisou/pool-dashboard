<svelte:head>
	<title>Stats - NIMIQ.WATCH Pool</title>
</svelte:head>

<h1 class="text-3xl font-semibold mb-4">Pool Stats</h1>

<section class="flex flex-row justify-start mt-2">
	<div class="bg-blue-900 px-4 py-3 rounded shadow mr-4 flex-grow">
		<label class="block uppercase font-semibold text-xs tracking-wider text-white opacity-40">Hashrate</label>
		<span class="text-2xl whitespace-no-wrap">{ formatHashrate(stats.hashrate) } <span class="text-lg">kH/s</span></span>
	</div>
	<div class="bg-teal-900 px-4 py-3 rounded shadow sm:mr-4 flex-grow">
		<label class="block uppercase font-semibold text-xs tracking-wider text-white opacity-40">Devices</label>
		<span class="text-2xl">{ stats.device_count }</span>
	</div>
	<div class="bg-green-900 px-4 py-3 rounded shadow mr-0 flex-grow hidden sm:block">
		<label class="block uppercase font-semibold text-xs tracking-wider text-white opacity-40">Users</label>
		<span class="text-2xl">{ stats.user_count }</span>
	</div>
</section>

<h2 class="text-xl font-semibold mt-8 mb-4 text-gray-500">Block History</h2>

{#each blocks as block}
	<div class="{`bg-gray-800 px-4 py-2 rounded shadow mb-2 flex flex-col lg:flex-row lg:flex-wrap lg:items-center${!block.main_chain ? ' opacity-50' : ''}`}">
		<div class="flex flex-row items-center lg:mr-2 mb-2 lg:mb-0">
			<div class="w-8 h-8 rounded bg-gray-900 mr-4 flex-shrink-0"></div>
			<div class="truncate">
				<span class="font-bold">#{ block.height }</span>
				<small class="block font-mono truncate text-gray-500">{ block.hash }</small>
			</div>
		</div>
		<div class="flex flex-row items-center flex-grow justify-between lg:justify-evenly text-gray-500">
			<div class="whitespace-no-wrap mr-4 tabular-nums">{ formatDate(block.timestamp) }</div>
			<div>
				{#if block.main_chain}
					{#if block.confirmations_remaining > 0}
						{ block.confirmations_remaining } confirmations remaining
					{:else}
						☑️ Confirmed
					{/if}
				{:else}
					❌ Fork Block
				{/if}
			</div>
		</div>
	</div>
{/each}

<script context="module">
	// the (optional) preload function takes a
	// `{ path, params, query }` object and turns it into
	// the data we need to render the page
	export async function preload(page, session) {
		// `this.fetch` is a wrapper around `fetch` that allows
		// you to make credentialled requests on both
		// server and client
		const [stats, blocks] = await Promise.all([
			this.fetch(`api/stats.json`).then(res => res.json()),
			this.fetch(`api/blocks.json`).then(res => res.json()),
		]);

		return { stats, blocks };
	}
</script>

<script>
	export let stats;
	export let blocks;

	function formatHashrate(hashrate) {
		const kiloHash = hashrate / 1000;
		const rounded = Math.round(kiloHash * 10) / 10;
		return rounded.toFixed(1);
	}

	function formatDate(timestamp) {
		const date = new Date(timestamp * 1000);
		return date.toISOString().substring(0, 16).replace('T', ' ');
	}
</script>

<style>
	.opacity-40 {
		opacity: .4;
	}

	.tabular-nums {
		font-variant-numeric: lining-nums tabular-nums;
	}
</style>
