<svelte:head>
	<title>Stats - NIMIQ.WATCH Pool</title>
</svelte:head>

<h1>Stats</h1>

<table>
	<tbody>
		<tr>
			<td>Miners</td>
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

	function formatHashrate(hashrate) {
		const kiloHash = hashrate / 1000;
		return Math.round(kiloHash * 10) / 10;
	}
</script>
