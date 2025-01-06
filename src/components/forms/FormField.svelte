<script lang="ts">
    import { Eye, EyeOff } from 'lucide-svelte';
    export let name: string;
    export let label: string;
    export let type = 'text';
    export let value: string;
    export let placeholder = '';
    export let errors: { [key: string]: string[] } = {};

    let showPassword = false;
    $: fieldError = errors[name]?.[0];
    $: inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    function togglePassword() {
        showPassword = !showPassword;
    }
</script>

<div>
    <label for={name} class="block text-sm font-medium text-neutral-400 mb-1">
        {label}
    </label>
    <div class="relative">
        <input
            type={inputType}
            {name}
            id={name}
            bind:value
            {placeholder}
            class="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
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