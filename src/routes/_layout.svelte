<Nav {segment}/>

<main>
	<slot></slot>
</main>

<script>
	import { stores } from '@sapper/app';
	import Nav from '../components/Nav.svelte';

	export let segment;

	if (typeof localStorage !== 'undefined' && localStorage.address) {
		const { session } = stores();
		session.set({ address: localStorage.address });
	}
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
