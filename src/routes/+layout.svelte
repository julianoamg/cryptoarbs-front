<script>
	import '../app.css';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Sidebar from '../components/Sidebar.svelte';
	import Toast from '../components/Toast.svelte';

	const unprotectedRoutes = ['/login', '/cadastro', '/recuperar-senha'];
	
	// Show sidebar if not on unprotected routes
	$: showSidebar = !unprotectedRoutes.includes($page.url.pathname);
</script>

<Toast />

{#if showSidebar}
	<Sidebar>
		<slot />
	</Sidebar>
{:else}
	<slot />
{/if}
