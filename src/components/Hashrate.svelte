{ formattedHashrate.value.toFixed(1) } <small>{ formattedHashrate.unit }</small>

<script>
    export let hashrate;

    $: formattedHashrate = formatHashrate(hashrate);

	function formatHashrate(hashrate) {
		const units = ['H/s', 'kH/s', 'MH/s', 'GH/s', 'TH/s'];
		let i = 0;
		let unit = units[i];
		while (hashrate >= 1000) {
			hashrate = hashrate / 1000;
			unit = units[++i];
		}

		// Round to one decimal
		hashrate = Math.round(hashrate * 10) / 10;

		return {
			value: hashrate,
			unit,
		};
	}
</script>
