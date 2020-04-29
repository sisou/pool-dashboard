<form on:submit|preventDefault="{onSubmit}" class="text-center mt-6">
	<label class="font-bold block mb-4 text-lg">Enter your mining address:</label>
	<input type="text" size="48" bind:value="{address}" class="bg-gray-800 appearance-none border-2 border-gray-700 rounded py-2 px-4 text-gray-400 leading-tight focus:outline-none focus:border-blue-800">
	<input type="submit" value="Login" class="shadow bg-gray-800 text-blue-600 font-bold py-2 px-4 rounded cursor-pointer hover:bg-blue-900 hover:text-blue-500 focus:shadow-outline focus:outline-none">
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
