<script>
    import { language, languages } from '$lib/stores/i18n';
    import { Globe } from 'lucide-svelte';
    import { clickOutside } from '$lib/actions/clickOutside';

    export let variant = 'default'; // 'default' | 'sidebar'
    let isOpen = false;

    function toggleDropdown() {
        isOpen = !isOpen;
    }

    function closeDropdown() {
        isOpen = false;
    }

    function handleSelect(code) {
        language.set(code);
        closeDropdown();
    }
</script>

<div class="relative" use:clickOutside on:clickoutside={closeDropdown}>
    {#if variant === 'sidebar'}
        <!-- Sidebar Variant -->
        <button
            on:click={toggleDropdown}
            class="w-full flex items-center justify-between px-2 py-2 text-sm text-neutral-300 rounded hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-transparent group border border-neutral-800"
        >
            <div class="flex items-center space-x-2">
                <Globe class="w-5 h-5 text-emerald-500/80 group-hover:text-emerald-400" />
                <span class="font-medium group-hover:text-neutral-200">{languages[$language]}</span>
            </div>
            <svg
                class="w-4 h-4 text-neutral-400 transition-transform {isOpen ? 'rotate-180' : ''}"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    {:else}
        <!-- Default Variant -->
        <button
            on:click={toggleDropdown}
            class="flex items-center space-x-2 px-3 py-1.5 text-sm text-neutral-300 rounded hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-transparent group"
        >
            <Globe class="w-4 h-4 text-emerald-500/80 group-hover:text-emerald-400" />
            <span class="font-medium group-hover:text-neutral-200">{languages[$language]}</span>
            <svg
                class="w-4 h-4 text-neutral-400 transition-transform {isOpen ? 'rotate-180' : ''}"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    {/if}

    {#if isOpen}
        <div 
            class="absolute z-50 {variant === 'sidebar' ? 'left-0 right-0' : 'right-0'} mt-1 py-1 bg-neutral-900 border border-neutral-800 rounded shadow-lg"
            class:w-full={variant === 'sidebar'}
            class:w-40={variant !== 'sidebar'}
        >
            {#each Object.entries(languages) as [code, name]}
                <button
                    class="w-full px-3 py-1.5 text-sm text-left text-neutral-300 hover:bg-neutral-800 {code === $language ? 'text-emerald-500' : ''}"
                    on:click={() => handleSelect(code)}
                >
                    {name}
                </button>
            {/each}
        </div>
    {/if}
</div> 