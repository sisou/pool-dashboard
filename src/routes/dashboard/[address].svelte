<svelte:head>
	<title>Dashboard - NIMIQ.WATCH Pool</title>
</svelte:head>

<h1>Dashboard</h1>

<p>
	Your address: <strong>{ user.address }</strong>
</p>

<p>
	Confirmed Balance: <strong>{ balance.confirmed / 1e5 } NIM</strong>
</p>

<table border="1">
	<thead>
		<tr>
			<th>Device ID</th>
			<th>Last Block</th>
			<th>Hashrate</th>
			<th>Status</th>
		</tr>
	</thead>
	<tbody>
		{#each devices as device}
			<tr>
				<td>{ device.id }</td>
				<td>#{ device.last_block }</td>
				<td>{ formatHashrate(device.hashrate) } kH/s</td>
				{#if isOnline(device.chain_height, device.last_block)}
					<td class="online">online</td>
				{:else}
					<td class="offline">offline</td>
				{/if}
			</tr>
		{/each}
	</tbody>
</table>

<script context="module">
	// the (optional) preload function takes a
	// `{ path, params, query }` object and turns it into
	// the data we need to render the page
	export async function preload(page, session) {
		// the `address` parameter is available because this file
		// is called [address].svelte
		const address = page.params.address.replace(/\+/g, ' ');
		// const address = 'NQ91 XLRA QFMR FJU5 KPHL 8TVH 9848 8BU7 7B8S';

		// `this.fetch` is a wrapper around `fetch` that allows
		// you to make credentialled requests on both
		// server and client
		const user = await this.fetch(`api/user/${address}.json`).then(res => res.json());
		if (user.error) {
			this.error(user.error.code, user.error.message);
			return;
		}
		if (!user.id) return { user, devices: [], balance: { confirmed: 0, unconfirmed: 0 } };

		const [devices, balance] = await Promise.all([
			this.fetch(`api/user/${user.id}/devices.json`).then(res => res.json()),
			this.fetch(`api/user/${user.id}/balance.json`).then(res => res.json()),
		]);
		return { user, devices, balance };
	}
</script>

<script>
	export let user;
	export let devices;
	export let balance;

	function formatHashrate(hashrate) {
		const kiloHash = hashrate / 1000;
		return Math.round(kiloHash * 10) / 10;
	}

	function isOnline(chain_height, last_block) {
		return last_block >= chain_height - 2;
	}
</script>

<style>
	.online {
		color: green;
	}

	.offline {
		color: red;
	}
</style>
