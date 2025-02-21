<script lang="ts">
    import { language } from '$lib/stores/i18n';
    import type { Translation, Language } from '$lib/i18n/types';
    import { translations } from '$lib/i18n/translations';
    import { toast } from '$lib/stores/toast';
    import { auth } from '$lib/stores/auth';
    import { onMount, onDestroy } from 'svelte';
    import PageHeader from '../../../components/forms/PageHeader.svelte';
    import Card from '../../../components/forms/Card.svelte';
    import { Activity } from 'lucide-svelte';
    import OperationCard from '../../../components/forms/OperationCard.svelte';
    import { getUserOperations } from '$lib/services/exchange';
    import type { UserOpportunity } from '$lib/services/exchange';

    $: t = translations[$language as Language] as Translation;

    let operations: UserOpportunity[] = [];
    let loading = true;
    let currentPage = 1;
    let totalOperations = 0;
    let nextPage: string | null = null;
    let previousPage: string | null = null;
    let refreshInterval: ReturnType<typeof setInterval>;

    onMount(async () => {
        if ($auth.token) {
            await fetchOperations();
            
            // Atualiza os dados a cada 5 segundos
            refreshInterval = setInterval(async () => {
                if ($auth.token) {
                    await fetchOperations();
                }
            }, 5000);
        }
    });

    onDestroy(() => {
        if (refreshInterval) {
            clearInterval(refreshInterval);
        }
    });

    async function fetchOperations() {
        try {
            const data = await getUserOperations($auth.token, currentPage);
            operations = data.results;
            totalOperations = data.count;
            nextPage = data.next;
            previousPage = data.previous;
            loading = false;
        } catch (error) {
            console.error('Failed to fetch operations:', error);
            toast.error('Falha ao carregar operações');
            loading = false;
        }
    }

    function formatNumber(value: string | number, decimals = 2): string {
        if (value === null || value === undefined) return '-';
        const num = typeof value === 'string' ? parseFloat(value) : value;
        if (isNaN(num)) return '-';
        return num.toFixed(decimals);
    }

    function formatCurrency(value: string | number, decimals = 2): string {
        if (value === null || value === undefined) return '-';
        const num = typeof value === 'string' ? parseFloat(value) : value;
        if (isNaN(num)) return '-';
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(num);
    }

    function formatDate(dateString: string): string {
        return new Date(dateString).toLocaleString();
    }

    async function handlePageChange(page: number) {
        if (page !== currentPage) {
            currentPage = page;
            loading = true;
            await fetchOperations();
        }
    }
</script>

<div class="flex flex-col items-center">
    <div class="w-full max-w-5xl space-y-6">
        <PageHeader 
            title={t.menu.operacoes}
            description={t.pages.operations.subtitle}
            icon={Activity}
        />

        <Card title={t.pages.operations.cardTitle}>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                <div class="bg-neutral-800/50 rounded p-3 border border-neutral-700/50">
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-neutral-400">{t.pages.operations.cardTitle}</span>
                    </div>
                    <div class="mt-1">
                        <span class="text-lg font-medium text-neutral-200">{totalOperations}</span>
                    </div>
                </div>

                <div class="bg-neutral-800/50 rounded p-3 border border-neutral-700/50">
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-neutral-400">{t.pages.operations.status.open}</span>
                    </div>
                    <div class="mt-1">
                        <span class="text-lg font-medium text-blue-400">{operations.filter(op => op.status === 'STARTED').length}</span>
                    </div>
                </div>

                <div class="bg-neutral-800/50 rounded p-3 border border-neutral-700/50">
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-neutral-400">{t.pages.operations.status.closed}</span>
                    </div>
                    <div class="mt-1">
                        <span class="text-lg font-medium text-emerald-400">{operations.filter(op => op.status === 'FINISHED').length}</span>
                    </div>
                </div>

                <div class="bg-neutral-800/50 rounded p-3 border border-neutral-700/50">
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-neutral-400">{t.pages.operations.profit}</span>
                    </div>
                    <div class="mt-1">
                        {#if operations.some(op => op.profit_value !== null)}
                            {@const totalProfit = operations
                                .filter(op => op.status === 'closed')
                                .reduce((sum, op) => sum + parseFloat(op.profit_value || '0'), 0)}
                            <span class="text-lg font-medium {totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}">
                                {totalProfit >= 0 ? '+' : ''}{formatCurrency(totalProfit)} USDT
                            </span>
                        {:else}
                            <span class="text-lg font-medium text-neutral-300">-</span>
                        {/if}
                    </div>
                </div>
            </div>

            {#if loading}
                <div class="flex items-center justify-center py-12">
                    <div class="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                </div>
            {:else if operations.length === 0}
                <p class="text-center py-4 text-neutral-400">{t.pages.operations.noOperations}</p>
            {:else}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                    {#each operations as operation}
                        <OperationCard {operation} {formatNumber} {formatCurrency} />
                    {/each}
                </div>

                <!-- Paginação -->
                {#if totalOperations > 0}
                    <div class="flex justify-center mt-6 gap-2">
                        <button
                            class="px-4 py-2 text-sm font-medium rounded-lg border transition-colors {previousPage ? 'border-neutral-700 text-neutral-200 hover:border-neutral-600' : 'border-neutral-800 text-neutral-500 cursor-not-allowed'}"
                            disabled={!previousPage}
                            on:click={() => handlePageChange(currentPage - 1)}
                        >
                            Anterior
                        </button>
                        <span class="px-4 py-2 text-sm font-medium text-neutral-400">
                            Página {currentPage}
                        </span>
                        <button
                            class="px-4 py-2 text-sm font-medium rounded-lg border transition-colors {nextPage ? 'border-neutral-700 text-neutral-200 hover:border-neutral-600' : 'border-neutral-800 text-neutral-500 cursor-not-allowed'}"
                            disabled={!nextPage}
                            on:click={() => handlePageChange(currentPage + 1)}
                        >
                            Próxima
                        </button>
                    </div>
                {/if}
            {/if}
        </Card>
    </div>
</div> 