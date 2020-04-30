<svelte:head>
	<title>NIMIQ.WATCH Pool</title>
</svelte:head>

<h1 class="text-3xl font-semibold">{ pool.name }</h1>
<h3 class="text-xl mb-6">{ pool.tagline }</h3>

<div class="flex flex-row flex-wrap">
	<div class="bg-gray-800 px-2 py-2 rounded shadow inline-block mr-2 mb-2">
		<label class="block uppercase font-semibold text-xs tracking-wider text-white opacity-40 pl-2 mb-1">Connect to this Pool</label>
		<p class="text-lg font-mono whitespace-no-wrap bg-gray-700 px-2 pt-1 rounded-sm">{ pool.domain }:{ pool.port }</p>
	</div>

	<div class="bg-gray-800 px-4 py-2 rounded shadow inline-block mr-2 mb-2">
		<label class="block uppercase font-semibold text-xs tracking-wider text-white opacity-40 mb-1">Pool Fee</label>
		<p class="text-2xl">{ pool.fee }%</p>
	</div>

	<div class="bg-gray-800 px-4 py-2 rounded shadow inline-block mr-2 mb-2">
		<label class="block uppercase font-semibold text-xs tracking-wider text-white opacity-40 mb-1">Payouts every</label>
		<p class="text-2xl">{ pool.payout_frequency }</p>
	</div>
</div>

<script context="module">
	// the (optional) preload function takes a
	// `{ path, params, query }` object and turns it into
	// the data we need to render the page
	export async function preload(page, session) {
		// `this.fetch` is a wrapper around `fetch` that allows
		// you to make credentialled requests on both
		// server and client
		const pool = await this.fetch(`api/pool.json`).then(res => res.json());

		return { pool };
	}
</script>

<script>
	export let pool;
</script>
