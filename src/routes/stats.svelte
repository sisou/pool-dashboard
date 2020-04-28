<svelte:head>
	<title>Stats - NIMIQ.WATCH Pool</title>
</svelte:head>

<h1>Stats</h1>

<table>
	<tbody>
		<tr>
			<td>Connected Miners</td>
			<td>{ connectedMiners }</td>
		</tr>
		<tr>
			<td>Pool Hashrate</td>
			<td>{ hashrate } H/s</td>
		</tr>
		<tr>
			<td>Blocks Mined</td>
			<td>{ blocksMined }</td>
		</tr>
		<tr>
			<td>Network</td>
			<td>Mainnet</td>
		</tr>
	</tbody>
</table>

<script>
	let connectedMiners = 0;
	let hashrate = 0;
	let blocksMined = 0;
</script>
