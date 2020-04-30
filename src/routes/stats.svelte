<svelte:head>
	<title>Stats - NIMIQ.WATCH Pool</title>
</svelte:head>

<h1 class="text-3xl font-semibold mb-4">Pool Stats</h1>

<section class="flex flex-row justify-start mt-2">
	<div class="bg-blue-900 px-4 py-3 rounded shadow mr-4 flex-grow">
		<label class="block uppercase font-semibold text-xs tracking-wider text-white opacity-40">Hashrate</label>
		<span class="text-2xl whitespace-no-wrap"><Hashrate hashrate="{stats.hashrate}"/></span>
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
			<div class="w-8 h-8 mr-4 flex-shrink-0 opacity-50">
				<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-box"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
			</div>
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
						<div class="inline-block w-5 h-5 mr-1 align-sub opacity-75">
							<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
						</div>
						{ block.confirmations_remaining } confirms left
					{:else}
						<div class="inline-block w-5 h-5 mr-1 align-sub text-green-600">
							<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
						</div>
						Confirmed
					{/if}
				{:else}
					<div class="inline-block w-5 h-5 mr-1 align-sub text-orange-600">
						<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
					</div>
					Fork Block
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
	import Hashrate from '../components/Hashrate.svelte';

	export let stats;
	export let blocks;

	function formatDate(timestamp) {
		const date = new Date(timestamp * 1000);
		return date.toISOString().substring(0, 16).replace('T', ' ');
	}
</script>
