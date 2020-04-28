<svelte:head>
	<title>Dashboard - NIMIQ.WATCH Pool</title>
</svelte:head>

<h1>Your stats</h1>

<strong>{ user.address } - { user.id }</strong>

<table border="1">
	<thead>
		<tr>
			<th>Device ID</th>
			<th>Last Block</th>
			<th>Hashrate</th>
		</tr>
	</thead>
	<tbody>
		{#each devices as device}
			<tr>
				<td>{ device.id }</td>
				<td>#{ device.last_block }</td>
				<td>{ formatHashrate(device.hashrate) } kH/s</td>
			</tr>
		{/each}
	</tbody>
</table>

<script context="module">
	// the (optional) preload function takes a
	// `{ path, params, query }` object and turns it into
	// the data we need to render the page
	export async function preload(page, session) {
		// the `slug` parameter is available because this file
		// is called [slug].svelte
		// const { slug } = page.params;
		const address = 'NQ91 XLRA QFMR FJU5 KPHL 8TVH 9848 8BU7 7B8S';

		// `this.fetch` is a wrapper around `fetch` that allows
		// you to make credentialled requests on both
		// server and client
		const user = await this.fetch(`api/user/${address}.json`).then(res => res.json());
		if (!user.id) return { user, devices: [] };

		const devices = await this.fetch(`api/user/${user.id}/devices.json`).then(res => res.json());
		return { user, devices };
	}
</script>

<script>
	export let user;
	export let devices;

	function formatHashrate(hashrate) {
		const kiloHash = hashrate / 1000;
		return Math.round(kiloHash * 10) / 10;
	}
</script>
