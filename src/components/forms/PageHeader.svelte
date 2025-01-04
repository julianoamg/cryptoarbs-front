<script lang="ts">
    import type { ComponentType } from 'svelte';

    export let title = '';
    export let description = '';
    export let icon: ComponentType | undefined = undefined;
</script>

<div class="space-y-6">
    <div class="flex items-center space-x-4">
        <div class="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
            {#if icon}
                <svelte:component this={icon} class="h-8 w-8 text-emerald-500"></svelte:component>
            {:else}
                <div class="h-8 w-8 text-emerald-500"></div>
            {/if}
        </div>
        <div>
            <h1 class="text-2xl font-bold text-neutral-200">{title}</h1>
            <p class="text-sm text-neutral-400">
                {description}
            </p>
        </div>
    </div>
</div> 