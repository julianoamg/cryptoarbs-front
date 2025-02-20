<script lang="ts">
    interface Option {
        id: string | number;
        name: string;
    }

    export let label = '';
    export let options: Option[] = [];
    export let selected: (string | number) | (string | number)[] = [];
    export let multiple = false;
    
    let id = `select-${Math.random().toString(36).slice(2)}`;
</script>

<div class="space-y-2">
    {#if label}
        <label for={id} class="text-sm font-medium text-neutral-300">
            {label}
        </label>
    {/if}
    
    {#if multiple}
        <select
            {id}
            class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50"
            bind:value={selected}
            multiple
        >
            {#each options as option}
                <option value={option.id}>{option.name}</option>
            {/each}
        </select>
    {:else}
        <select
            {id}
            class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50"
            bind:value={selected}
        >
            {#each options as option}
                <option value={option.id}>{option.name}</option>
            {/each}
        </select>
    {/if}
</div> 