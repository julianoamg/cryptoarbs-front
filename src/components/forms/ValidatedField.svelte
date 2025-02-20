<script lang="ts">
    import FormField from './FormField.svelte';

    export let type: string = 'text';
    export let label: string;
    export let value: string = '';
    export let name: string;
    export let error: string | undefined = undefined;
    export let required: boolean = true;
    export let minLength: number | undefined = undefined;
    export let placeholder: string | undefined = undefined;
    export let description: string | undefined = undefined;
    export let options: { value: string; label: string; }[] | undefined = undefined;

    // Validação local do campo
    export let validate = (val: string): string | undefined => {
        if (required && !val?.trim()) {
            return `${label} é obrigatório`;
        }
        if (minLength && val?.trim().length < minLength) {
            return `${label} deve ter pelo menos ${minLength} caracteres`;
        }
        return undefined;
    };

    // Função para atualizar o valor e validar
    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement | HTMLSelectElement;
        value = target.value;
        error = validate(value);
    }
</script>

{#if type === 'select'}
    <div class="form-field">
        <label for={name} class="block text-sm font-medium text-neutral-200 mb-1">{label}</label>
        {#if description}
            <p class="text-xs text-neutral-400 mb-2">{description}</p>
        {/if}
        <select 
            {name}
            id={name}
            class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/20"
            bind:value
            on:input={handleInput}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${name}-error` : undefined}
        >
            <option value="">{placeholder || `Selecione ${label.toLowerCase()}`}</option>
            {#each options || [] as option}
                <option value={option.value}>{option.label}</option>
            {/each}
        </select>
        {#if error}
            <p id="{name}-error" class="mt-1 text-xs text-red-500" role="alert">{error}</p>
        {/if}
    </div>
{:else}
    <div class="form-field">
        <label for={name} class="block text-sm font-medium text-neutral-200 mb-1">{label}</label>
        {#if description}
            <p class="text-xs text-neutral-400 mb-2">{description}</p>
        {/if}
        <input
            {type}
            {name}
            id={name}
            class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/20"
            bind:value
            on:input={handleInput}
            {required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${name}-error` : undefined}
        />
        {#if error}
            <p id="{name}-error" class="mt-1 text-xs text-red-500" role="alert">{error}</p>
        {/if}
    </div>
{/if} 