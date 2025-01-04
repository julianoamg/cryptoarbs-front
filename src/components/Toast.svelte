<script lang="ts">
    import { toast } from '$lib/stores/toast';
    import { fly } from 'svelte/transition';
    import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-svelte';

    const icons = {
        success: CheckCircle2,
        error: XCircle,
        warning: AlertCircle,
        info: Info
    };

    const colors = {
        success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        error: 'bg-red-500/20 text-red-400 border-red-500/30',
        warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        info: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    };
</script>

<div class="fixed top-0 right-0 left-0 z-[9999] pointer-events-none">
    <div class="max-w-xl mx-auto p-4 flex flex-col gap-2">
        {#each $toast as { id, message, type } (id)}
            <div
                class="flex items-center justify-between gap-3 px-5 py-4 rounded-lg border shadow-lg backdrop-blur-sm {colors[type]}"
                transition:fly={{ y: -100, duration: 300 }}
                role="alert"
            >
                <p class="text-sm font-medium">{message}</p>
                <svelte:component this={icons[type]} class="w-5 h-5 flex-shrink-0" />
            </div>
        {/each}
    </div>
</div> 