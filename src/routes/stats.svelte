<svelte:head>
	<title>Stats - NIMIQ.WATCH Pool</title>
</svelte:head>

<h1>Stats</h1>

<table>
	<tbody>
		<tr>
			<td>Devices</td>
			<td>{ pool.device_count }</td>
		</tr>
		<tr>
			<td>Users</td>
			<td>{ pool.user_count }</td>
		</tr>
		<tr>
			<td>Pool Hashrate</td>
			<td>{ formatHashrate(pool.hashrate) } kH/s</td>
		</tr>
		<tr>
			<td>Blocks Mined</td>
			<td>{ pool.block_count }</td>
		</tr>
	</tbody>
</table>

<h2>Blocks</h2>

<table>
	<thead>
		<tr>
			<th>Height</th>
			<th>Time</th>
			<th>Hash</th>
			<th>Confirmations Remaining</th>
			<th>Main Chain</th>
		</tr>
	</thead>
	<tbody>
		{#each blocks as block}
			<tr>
				<td>{ block.height }</td>
				<td>{ new Date(block.timestamp * 1000).toLocaleString() }</td>
				<td>{ block.hash }</td>
				<td>{ block.confirmations_remaining }</td>
				<td>{ block.main_chain }</td>
			</tr>
		{/each}
	</tbody>
</table>

<script context="module">
	// the (optional) preload function takes a
	// `{ path, params, query }` object and turns it into
	// the data we need to render the page
	export async function preload(page, session) {
		// `this.fetch` is a wrapper around `fetch` that allows
		// you to make credentialled requests on both
		// server and client
		const [pool, blocks] = await Promise.all([
			this.fetch(`api/pool.json`).then(res => res.json()),
			this.fetch(`api/blocks.json`).then(res => res.json()),
		]);

		return { pool, blocks };
	}
</script>

<script>
	export let pool;
	export let blocks;

	function formatHashrate(hashrate) {
		const kiloHash = hashrate / 1000;
		return Math.round(kiloHash * 10) / 10;
	}
</script>
