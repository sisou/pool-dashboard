<svelte:head>
	<title>Dashboard - NIMIQ.WATCH Pool</title>
</svelte:head>

<h1 class="text-3xl font-semibold mb-4">Dashboard</h1>

<section class="flex flex-row justify-start mt-2">
	<div class="bg-blue-900 px-4 py-3 rounded shadow mr-4 flex-grow">
		<label class="block uppercase font-semibold text-xs tracking-wider text-white opacity-40">Your Hashrate</label>
		<span class="text-2xl whitespace-no-wrap">{ formatHashrate(hashrate) } <span class="text-lg">kH/s</span></span>
	</div>
	<div class="bg-teal-900 px-4 py-3 rounded shadow sm:mr-4 flex-grow">
		<label class="block uppercase font-semibold text-xs tracking-wider text-white opacity-40">Confirmed Balance</label>
		<span class="text-2xl">{ balance.confirmed / 1e5 } <span class="text-lg">NIM</span></span>
	</div>
	<div class="bg-green-900 px-4 py-3 rounded shadow flex-grow hidden sm:block">
		<label class="block uppercase font-semibold text-xs tracking-wider text-white opacity-40">Online Devices</label>
		<span class="text-2xl">{ device_count }</span>
	</div>
</section>

<h2 class="text-xl font-semibold mt-8 mb-4 text-gray-500">Your Devices</h2>

{#each devices as device}
	<div class="bg-gray-800 px-4 py-2 rounded shadow mb-2 flex flex-row justify-between items-center">
		<div class="flex flex-row items-center mr-2">
			<div class="{`w-8 h-8 rounded bg-gray-900 mr-4 flex-shrink-0${isOnline(device.chain_height, device.last_block) ? ' bg-green-600' : ' opacity-50'}`}"></div>
			<div class="truncate">
				<span class="">{ device.id }</span>
				<small class="block text-gray-500">Last work for #{ device.last_block }</small>
			</div>
		</div>
		{#if isOnline(device.chain_height, device.last_block)}
			<div class="text-gray-500 tabular-nums font-bold">{ formatHashrate(device.hashrate) } kH/s</div>
		{:else}
			<div class="text-red-600 font-bold">offline</div>
		{/if}
	</div>
{:else}
	<p class="bg-orange-900 py-2 px-4 rounded inline-block text-sm uppercase tracking-wide font-bold text-orange-600">
		No registered devices
	</p>
{/each}

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
		if (!user.id) return { devices: [], balance: { confirmed: 0, unconfirmed: 0 } };

		const [devices, balance] = await Promise.all([
			this.fetch(`api/user/${user.id}/devices.json`).then(res => res.json()),
			this.fetch(`api/user/${user.id}/balance.json`).then(res => res.json()),
		]);
		return { devices, balance };
	}
</script>

<script>
	export let devices;
	export let balance;

	$: hashrate = devices.reduce((sum, device) => sum + (isOnline(device.chain_height, device.last_block) ? device.hashrate : 0), 0);
	$: device_count = devices.filter(device => isOnline(device.chain_height, device.last_block)).length;

	function formatHashrate(hashrate) {
		const kiloHash = hashrate / 1000;
		const rounded = Math.round(kiloHash * 10) / 10;
		return rounded.toFixed(1);
	}

	function isOnline(chain_height, last_block) {
		return last_block >= chain_height - 2;
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
