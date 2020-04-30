<nav class="text-gray-500">
	<ul class="container">
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">Home</a></li>
		<li><a aria-current="{segment === 'stats' ? 'page' : undefined}" href="stats">Stats</a></li>
		<li><a aria-current="{segment === 'dashboard' ? 'page' : undefined}" href="{dashboardHref}">Dashboard</a></li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<!-- <li><a rel=prefetch aria-current='{segment === "blog" ? "page" : undefined}' href='blog'>blog</a></li> -->

		{#if address}
			<li class="account">
				<img src="{`https://api.nimiqwatch.com/iqon/${address}`}" alt="Your Identicon" class="w-8 mb-1 inline">
				<a href="." on:click="{logout}">Logout</a>
			</li>
		{:else}
			<li class="account"><a href="dashboard">Login</a></li>
		{/if}
	</ul>
</nav>

<script>
	import { stores } from '@sapper/app';

	export let segment;

	const { session } = stores();
	$: address = $session && $session.address || null;
	$: dashboardHref = address ? `dashboard/${address.replace(/ /g, '+')}` : 'dashboard';

	function logout() {
		delete localStorage.address;
		session.set({});
	}
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,255,255,.1);
		padding: 0 1em;
	}

	ul {
		margin: 0 auto;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	li.account {
		float: right;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: inline-block;
	}

	a:hover,
	a:focus {
		color: #cbd5e0; /* .text-gray-400 */
	}

	a[aria-current] {
		position: relative;
		display: inline-block;
		color: #cbd5e0; /* .text-gray-400 */
	}

	a[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgba(255,255,255,.6);
		display: block;
		bottom: -1px;
	}

	@media (max-width: 359px) {
		a {
			padding: 1em 0.25em;
		}
	}
</style>
