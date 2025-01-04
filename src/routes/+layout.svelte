<script>
	import '../app.css';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Sidebar from '../components/Sidebar.svelte';
	import Toast from '../components/Toast.svelte';

	const unprotectedRoutes = ['/login', '/cadastro', '/recuperar-senha'];
	
	// Show sidebar if not on unprotected routes
	$: showSidebar = !unprotectedRoutes.includes($page.url.pathname);

	onMount(() => {
		if (browser) {
			const token = localStorage.getItem('token');
			const isPublicRoute = unprotectedRoutes.includes($page.url.pathname);

			if (!token && !isPublicRoute) {
				goto('/login');
			} else if (token && isPublicRoute) {
				goto('/');
			}
		}
	});
</script>

<Toast />

{#if showSidebar}
	<Sidebar>
		<slot />
	</Sidebar>
{:else}
	<slot />
{/if}
