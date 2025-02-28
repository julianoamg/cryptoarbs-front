<script lang="ts">
    /**
     * Componente de paginação responsivo
     * 
     * Exibe uma interface simplificada para navegação entre páginas,
     * adaptada para dispositivos móveis e desktop.
     */
    
    // Propriedades do componente
    export let currentPage: number;
    export let totalPages: number;
    export let onPageChange: (page: number) => void;
    export let showPageNumbers: boolean = false; // Opcional: mostrar números de página no desktop
</script>

<div class="flex flex-wrap justify-center gap-2">
    <!-- Botão Anterior -->
    <button
        class="px-3 py-1.5 rounded text-sm font-medium transition-colors {currentPage > 1 ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200' : 'bg-neutral-800/50 text-neutral-500 cursor-not-allowed'}"
        disabled={currentPage <= 1}
        on:click={() => onPageChange(currentPage - 1)}
    >
        Anterior
    </button>

    <!-- Versão com números de página para desktop (opcional) -->
    {#if showPageNumbers}
        <div class="hidden sm:flex gap-2">
            {#each Array(totalPages) as _, index}
                {#if index + 1 === 1 || index + 1 === totalPages || (index + 1 >= currentPage - 1 && index + 1 <= currentPage + 1)}
                    <button
                        class="px-3 py-1.5 rounded text-sm font-medium transition-colors {currentPage === index + 1 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'}"
                        on:click={() => onPageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                {:else if index + 1 === currentPage - 2 || index + 1 === currentPage + 2}
                    <span class="px-3 py-1.5 text-sm text-neutral-500">...</span>
                {/if}
            {/each}
        </div>
    {/if}

    <!-- Indicador de página atual (sempre visível) -->
    <div class="flex items-center gap-2 {showPageNumbers ? 'sm:hidden' : ''}">
        <span class="px-2 py-1.5 text-sm text-neutral-400">
            {currentPage} / {totalPages}
        </span>
    </div>

    <!-- Botão Próxima -->
    <button
        class="px-3 py-1.5 rounded text-sm font-medium transition-colors {currentPage < totalPages ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200' : 'bg-neutral-800/50 text-neutral-500 cursor-not-allowed'}"
        disabled={currentPage >= totalPages}
        on:click={() => onPageChange(currentPage + 1)}
    >
        Próxima
    </button>
</div> 