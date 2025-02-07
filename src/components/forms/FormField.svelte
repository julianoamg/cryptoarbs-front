<script lang="ts">
    import { Eye, EyeOff } from 'lucide-svelte';
    export let name = '';
    export let label = '';
    export let value: string | number = '';
    export let type = 'text';
    export let step: string | undefined = undefined;
    export let placeholder = '';
    export let errors: { [key: string]: string[] } = {};

    let showPassword = false;
    $: fieldError = errors[name]?.[0];
    $: inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    let id = `field-${Math.random().toString(36).slice(2)}`;

    function togglePassword() {
        showPassword = !showPassword;
    }
</script>

<div class="space-y-2">
    <label for={id} class="text-sm font-medium text-neutral-300">
        {label}
    </label>
    <div class="relative">
        <input
            {id}
            {name}
            {type}
            {step}
            bind:value
            {placeholder}
            class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50"
            class:border-red-500={fieldError}
            class:pr-10={type === 'password'}
        />
        {#if type === 'password'}
            <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-300 focus:outline-none"
                on:click={togglePassword}
            >
                {#if showPassword}
                    <EyeOff class="w-5 h-5" />
                {:else}
                    <Eye class="w-5 h-5" />
                {/if}
            </button>
        {/if}
    </div>
    {#if fieldError}
        <p class="mt-1 text-sm text-red-500">{fieldError}</p>
    {/if}
</div> 