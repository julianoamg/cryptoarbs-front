<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth';
    import { getMe } from '$lib/services/user';
    import { toast } from '$lib/stores/toast';

    let loading = true;

    onMount(async () => {
        if ($auth.token) {
            try {
                const userData = await getMe($auth.token);
                if (!userData.has_active_subscription) {
                    toast.error('É necessário ter uma assinatura ativa para acessar esta área');
                    goto('/assinatura');
                }
            } catch (error) {
                console.error('Failed to check subscription:', error);
                goto('/assinatura');
            } finally {
                loading = false;
            }
        } else {
            goto('/login');
        }
    });
</script>

{#if loading}
    <div class="flex items-center justify-center min-h-screen">
        <div class="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
    </div>
{:else}
    <slot />
{/if} 