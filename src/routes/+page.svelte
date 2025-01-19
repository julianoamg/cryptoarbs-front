<script lang="ts">
    import { ArrowRight, TrendingUp, Percent, X, ArrowLeftRight, LayoutGrid, List, 
        Coins, ArrowLeftRight as Exchange, TrendingUp as SpreadIcon, 
        CircleDollarSign, DollarSign, Scale } from 'lucide-svelte';
    import { fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';
    import { auth } from '$lib/stores/auth';
    import { onMount, onDestroy } from 'svelte';
    import { getOpportunities } from '$lib/services/exchange';
    import { getMe } from '$lib/services/user';
    import PageHeader from '../components/forms/PageHeader.svelte';
    import Loading from '../components/Loading.svelte';
    import Button from '../components/forms/Button.svelte';

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
    let hasActiveSubscription = false;
    let pollingInterval: number;
    let isListView = false;

    // Carrega a preferência do usuário do localStorage
    function loadViewPreference(): void {
        if (typeof window !== 'undefined') {
            const savedView = localStorage.getItem('cryptoarbs:viewPreference');
            isListView = savedView === 'list';
        }
    }

    // Salva a preferência do usuário no localStorage
    function saveViewPreference(isList: boolean): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cryptoarbs:viewPreference', isList ? 'list' : 'grid');
        }
    }

    async function fetchOpportunities() {
        if (!$auth.token || !hasActiveSubscription) return;
        
        try {
            opportunities = await getOpportunities($auth.token);
        } catch (error) {
            console.error('Failed to fetch opportunities:', error);
        }
    }

    onMount(async () => {
        // Carrega a preferência de visualização
        loadViewPreference();

        if ($auth.token) {
            try {
                const userData = await getMe($auth.token);
                hasActiveSubscription = userData.has_active_subscription;

                if (hasActiveSubscription) {
                    await fetchOpportunities();
                    pollingInterval = setInterval(fetchOpportunities, 5000);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                loading = false;
            }
        }
    });

    onDestroy(() => {
        if (pollingInterval) {
            clearInterval(pollingInterval);
        }
    });

    function toggleView() {
        isListView = !isListView;
        saveViewPreference(isListView);
    }
</script>

<div class="flex flex-col items-center">
    <div class="w-full max-w-5xl space-y-6">
        <div class="flex justify-between items-start">
            <PageHeader 
                title={t?.pages?.home?.title || 'Arbitragem de Criptomoedas'}
                description={t?.pages?.home?.subtitle || 'Esta página é atualizada automaticamente.'}
                icon={ArrowLeftRight}
            />
            {#if !loading && hasActiveSubscription && opportunities.length > 0}
                <button
                    class="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors"
                    on:click={toggleView}
                >
                    {#if isListView}
                        <LayoutGrid class="w-4 h-4 text-neutral-400" />
                        <span class="text-sm text-neutral-400">Grid</span>
                    {:else}
                        <List class="w-4 h-4 text-neutral-400" />
                        <span class="text-sm text-neutral-400">Lista</span>
                    {/if}
                </button>
            {/if}
        </div>

        {#if loading}
            <Loading />
        {:else if !hasActiveSubscription}
            <div class="flex flex-col items-center justify-center p-8 text-center space-y-6 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl">
                <div class="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
                    <TrendingUp class="w-8 h-8 text-emerald-500" />
                </div>
                <div class="space-y-2 max-w-lg">
                    <h3 class="text-xl font-bold text-neutral-200">{t?.pages?.home?.subscription?.title}</h3>
                    <p class="text-neutral-400">{t?.pages?.home?.subscription?.description}</p>
                </div>
                <a href="/assinatura">
                    <Button 
                        type="button"
                        label={t?.pages?.home?.subscription?.button}
                    />
                </a>
            </div>
        {:else if opportunities.length === 0}
            <Loading noData={true} />
        {:else}
            {#if isListView}
                <!-- List View -->
                <div class="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full border-collapse min-w-[800px]">
                            <thead>
                                <tr class="border-b border-neutral-800 bg-gradient-to-r from-emerald-500/10 to-transparent">
                                    <th class="py-3 px-4 text-left">
                                        <div class="flex items-center gap-1.5">
                                            <Coins class="w-3.5 h-3.5 text-emerald-500/80" />
                                            <span class="text-xs font-medium text-emerald-500/80 uppercase">{t.pages.home.table.pair}</span>
                                        </div>
                                    </th>
                                    <th class="py-3 px-4 text-center">
                                        <div class="flex items-center justify-center gap-1.5">
                                            <DollarSign class="w-3.5 h-3.5 text-emerald-500/80" />
                                            <span class="text-xs font-medium text-emerald-500/80 uppercase">{t.pages.home.table.buyPrice}</span>
                                        </div>
                                    </th>
                                    <th class="py-3 px-4 text-center">
                                        <div class="flex items-center justify-center gap-1.5">
                                            <DollarSign class="w-3.5 h-3.5 text-emerald-500/80" />
                                            <span class="text-xs font-medium text-emerald-500/80 uppercase">{t.pages.home.table.sellPrice}</span>
                                        </div>
                                    </th>
                                    <th class="py-3 px-4 text-right">
                                        <div class="flex items-center justify-end gap-1.5">
                                            <CircleDollarSign class="w-3.5 h-3.5 text-emerald-500/80" />
                                            <span class="text-xs font-medium text-emerald-500/80 uppercase">{t.pages.home.table.profit}</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-neutral-800/50">
                                {#each opportunities as opp}
                                    <tr class="hover:bg-emerald-500/5 transition-colors group">
                                        <td class="py-4 px-4">
                                            <div class="flex flex-col gap-1">
                                                <div class="flex items-center gap-2">
                                                    <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 flex items-center justify-center">
                                                        <ArrowLeftRight class="w-3.5 h-3.5 text-emerald-500/80" />
                                                    </div>
                                                    <span class="text-base font-medium text-neutral-200">{opp.symbol || '-'}</span>
                                                </div>
                                                <div class="flex items-center gap-1.5 ml-9">
                                                    <span class="text-xs text-neutral-400">{t.pages.home.table.spread}:</span>
                                                    <span class="text-xs font-medium text-emerald-500">{opp.spread}%</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="py-4 px-4">
                                            <div class="flex flex-col items-center">
                                                <span class="text-sm font-medium text-neutral-200">{opp.exchange_a_price}</span>
                                                <div class="flex items-center gap-1 mt-1">
                                                    <span class="text-xs text-neutral-400">em</span>
                                                    <span class="text-xs font-medium text-emerald-500">{opp.exchange_a}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="py-4 px-4">
                                            <div class="flex flex-col items-center">
                                                <span class="text-sm font-medium text-neutral-200">{opp.exchange_b_price}</span>
                                                <div class="flex items-center gap-1 mt-1">
                                                    <span class="text-xs text-neutral-400">em</span>
                                                    <span class="text-xs font-medium text-emerald-500">{opp.exchange_b} (Futures)</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="py-4 px-4">
                                            <div class="flex flex-col items-end gap-2">
                                                <div class="flex flex-col items-end">
                                                    <div class="flex items-baseline gap-1">
                                                        <span class="text-base font-bold text-emerald-500">{opp.profit}%</span>
                                                        <span class="text-xs text-emerald-500/70">{t.pages.home.table.gross}</span>
                                                    </div>
                                                    <div class="flex items-center gap-1">
                                                        <span class="text-xs" class:text-emerald-500={parseFloat(opp.profit_fee) > 0} class:text-red-500={parseFloat(opp.profit_fee) < 0} class:text-neutral-400={parseFloat(opp.profit_fee) === 0}>
                                                            {parseFloat(opp.profit_fee).toFixed(6)}%
                                                        </span>
                                                        <span class="text-xs text-neutral-400">{t.pages.home.table.net}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                    <div class="p-4 border-t border-neutral-800 bg-gradient-to-r from-emerald-500/5 to-transparent">
                        <p class="text-xs text-neutral-400">
                            <span class="text-emerald-500/80">Dica:</span> {t.pages.home.table.mobileHint}
                        </p>
                    </div>
                </div>
            {:else}
                <!-- Grid View -->
                <div class="grid gap-6 grid-cols-1 lg:grid-cols-2">
                    {#each opportunities as opp}
                        <div class="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-colors">
                            <div class="p-4 sm:p-6 space-y-4">
                                <!-- Header com Exchanges e Lucro -->
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div class="flex items-center space-x-2">
                                        <span class="text-base sm:text-lg font-bold text-neutral-200">{opp.exchange_a}</span>
                                        <ArrowRight class="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500" />
                                        <span class="text-base sm:text-lg font-bold text-neutral-200">{opp.exchange_b} (Futures)</span>
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
                                        <p class="text-xs sm:text-sm font-medium text-neutral-400">Lucro Taxa</p>
                                        <p class="text-sm sm:text-base" class:text-emerald-500={parseFloat(opp.profit_fee) > 0} class:text-red-500={parseFloat(opp.profit_fee) < 0} class:text-neutral-200={parseFloat(opp.profit_fee) === 0}>{parseFloat(opp.profit_fee).toFixed(6)}%</p>
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
                                            <p class="text-xs sm:text-sm font-medium text-neutral-400 mb-2">{opp.exchange_b} (Futures)</p>
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
        {/if}
    </div>
</div>