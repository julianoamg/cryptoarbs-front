<script>
    export let title = '';
    export let icon = null;
</script>

<div class="bg-neutral-900 border border-neutral-800 rounded-lg">
    <div class="p-4 border-b border-neutral-800">
        <div class="flex items-center gap-2">
            {#if icon}
                <svelte:component this={icon} class="w-5 h-5 text-emerald-500" />
            {/if}
            <h2 class="text-lg font-semibold text-neutral-200">{title}</h2>
        </div>
    </div>
    <div class="p-4">
        <slot />
    </div>
    {#if $$slots.actions}
        <div class="px-4 pb-4 flex justify-end gap-2">
            <slot name="actions" />
        </div>
    {/if}
</div> 