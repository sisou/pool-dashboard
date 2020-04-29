<Nav {segment}/>

<main class="container mx-auto p-4">
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
