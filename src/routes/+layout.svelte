<script lang="ts">
	import '../app.css';
	import Sidebar from '../components/Sidebar.svelte';
	import { page } from '$app/stores';

	// Rotas que não devem mostrar a sidebar
	const authRoutes = ['/login', '/cadastro', '/recuperar-senha'];
	$: showSidebar = !authRoutes.includes($page.url.pathname);
</script>

{#if showSidebar}
	<Sidebar>
		<slot />
	</Sidebar>
{:else}
	<slot />
{/if}
