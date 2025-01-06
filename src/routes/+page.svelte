<script lang="ts">
    import { ArrowRight, TrendingUp, Percent, X, ArrowLeftRight } from 'lucide-svelte';
    import { fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';
    import { auth } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { getOpportunities } from '$lib/services/exchange';
    import PageHeader from '../components/forms/PageHeader.svelte';
    import Loading from '../components/Loading.svelte';

    interface ArbitrageOpportunity {
        id: string;
        exchange_a: string;
        exchange_b: string;
        exchange_a_price: string;
        exchange_b_price: string;
        spread: string;
        profit_fee: string;
        profit: string;
        created: string;
        modified: string;
        symbol?: string;
    }

    $: t = translations[$language];

    let opportunities: ArbitrageOpportunity[] = [];
    let loading = true;

    onMount(async () => {
        if ($auth.token) {
            try {
                opportunities = await getOpportunities($auth.token);
            } catch (error) {
                console.error('Failed to fetch opportunities:', error);
            } finally {
                loading = false;
            }
        }
    });

    // Estado da modal
    let showModal = false;
    let cardToRemove: number | null = null;

    // Funções para controlar a modal
    function abrirModal(index: number): void {
        cardToRemove = index;
        showModal = true;
    }

    function fecharModal(): void {
        showModal = false;
        cardToRemove = null;
    }

    // Função para remover o card de oportunidade
    function removerCard(): void {
        if (cardToRemove !== null) {
            opportunities = opportunities.filter((_, i) => i !== cardToRemove);
            fecharModal();
        }
    }
</script>

<!-- Modal de confirmação -->
{#if showModal}
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
         transition:fade={{ duration: 200 }}
         on:click={fecharModal}
         on:keydown={(e) => e.key === 'Escape' && fecharModal()}
         role="button"
         tabindex="0"
    >
        <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-6 max-w-md w-full shadow-xl"
             transition:fade={{ duration: 150, delay: 50 }}
             on:click|stopPropagation
             on:keydown|stopPropagation
             role="button"
             tabindex="0"
        >
            <div class="flex flex-col items-center text-center space-y-4">
                <div class="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                    <X class="w-6 h-6 text-red-500" />
                </div>
                <h3 class="text-xl font-bold text-neutral-200">Remover oportunidade</h3>
                <p class="text-neutral-400">
                    Tem certeza que deseja remover esta oportunidade de arbitragem? Esta ação não pode ser desfeita.
                </p>
                <div class="flex items-center space-x-3 pt-2">
                    <button
                        class="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-colors"
                        on:click={fecharModal}
                    >
                        Cancelar
                    </button>
                    <button
                        class="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                        on:click={removerCard}
                    >
                        Remover
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}

<div class="w-full max-w-7xl mx-auto space-y-8 p-4">
    <PageHeader 
        title={t.pages.home.title}
        description={t.pages.home.subtitle}
        icon={ArrowLeftRight}
    ></PageHeader>

    {#if loading || opportunities.length === 0}
        <Loading noData={!loading} />
    {:else}
        <!-- Opportunities List -->
        <div class="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {#each opportunities as opp, index}
                <div class="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-colors relative">
                    <div class="p-4 sm:p-6 space-y-4">
                        <!-- Header com Exchanges e Lucro -->
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div class="flex items-center space-x-2">
                                <span class="text-base sm:text-lg font-bold text-neutral-200">{opp.exchange_a}</span>
                                <ArrowRight class="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500" />
                                <span class="text-base sm:text-lg font-bold text-neutral-200">{opp.exchange_b}</span>
                            </div>
                            <div class="flex items-baseline space-x-1">
                                <span class="text-xl sm:text-2xl font-bold text-emerald-500">{opp.profit}%</span>
                                <span class="text-sm text-emerald-500/70">{t.pages.home.profit}</span>
                            </div>
                        </div>

                        <!-- Trading Pair, Spread e Profit Fees -->
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {#if opp.symbol}
                                <div class="col-span-2 sm:col-span-1">
                                    <p class="text-xs sm:text-sm font-medium text-neutral-400">{t.pages.home.tradingPair}</p>
                                    <p class="text-sm sm:text-base text-neutral-200 font-medium">{opp.symbol}</p>
                                </div>
                            {/if}
                            <div>
                                <p class="text-xs sm:text-sm font-medium text-neutral-400">{t.pages.home.spread}</p>
                                <p class="text-sm sm:text-base text-neutral-200">{opp.spread}%</p>
                            </div>
                            <div>
                                <p class="text-xs sm:text-sm font-medium text-neutral-400">{t.pages.home.profitAfterFees}</p>
                                <p class="text-sm sm:text-base text-neutral-200">{opp.profit_fee}%</p>
                            </div>
                        </div>

                        <!-- Preços -->
                        <div class="border-t border-neutral-800 pt-4">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <p class="text-xs sm:text-sm font-medium text-neutral-400 mb-2">{opp.exchange_a}</p>
                                    <div class="flex justify-between">
                                        <span class="text-xs sm:text-sm text-neutral-400">{t.pages.home.price}</span>
                                        <span class="text-xs sm:text-sm text-neutral-200">{opp.exchange_a_price}</span>
                                    </div>
                                </div>
                                <div>
                                    <p class="text-xs sm:text-sm font-medium text-neutral-400 mb-2">{opp.exchange_b}</p>
                                    <div class="flex justify-between">
                                        <span class="text-xs sm:text-sm text-neutral-400">{t.pages.home.price}</span>
                                        <span class="text-xs sm:text-sm text-neutral-200">{opp.exchange_b_price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>