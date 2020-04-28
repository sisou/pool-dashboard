Enter your mining address:
<form on:submit|preventDefault="{onSubmit}">
	<input type="text" size="44" bind:value="{address}">
	<input type="submit" value="Login">
</form>

<script>
	import { stores, goto } from '@sapper/app';
	const { session } = stores();

	let address = '';

	function onSubmit() {
		localStorage.address = address;
		session.set({ address });
		goto(`/dashboard/${address.replace(/ /g, '+')}`);
	}
</script>
