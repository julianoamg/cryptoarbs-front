<script lang="ts">
    export let name: string;
    export let label: string;
    export let type = 'text';
    export let value: string;
    export let placeholder = '';
    export let errors: { [key: string]: string[] } = {};

    $: fieldError = errors[name]?.[0];
</script>

<div>
    <label for={name} class="block text-sm font-medium text-neutral-400 mb-1">
        {label}
    </label>
    <input
        {type}
        {name}
        id={name}
        bind:value
        {placeholder}
        class="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
        class:border-red-500={fieldError}
    />
    {#if fieldError}
        <p class="mt-1 text-sm text-red-500">{fieldError}</p>
    {/if}
</div> 