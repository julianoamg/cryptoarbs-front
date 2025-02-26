<script lang="ts">
    import { ArrowRight, TrendingUp, Percent, X, ArrowLeftRight, LayoutGrid, List, 
        Coins, ArrowLeftRight as Exchange, TrendingUp as SpreadIcon, 
        CircleDollarSign, DollarSign, Scale, ChevronDown } from 'lucide-svelte';
    import { fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';
    import { auth } from '$lib/stores/auth';
    import { onMount, onDestroy } from 'svelte';
    import { getOpportunities } from '$lib/services/exchange';
    import { getMe } from '$lib/services/user';
    import { browser } from '$app/environment';
    import PageHeader from '../components/forms/PageHeader.svelte';
    import Loading from '../components/Loading.svelte';
    import Button from '../components/forms/Button.svelte';

    interface ArbitrageOpportunity {
        id: string;
        exchange_a: string;
        exchange_b: string;
        exchange_a_price: string;
        exchange_b_price: string;
        exchange_a_volume: string;
        exchange_b_volume: string;
        spread: string;
        profit_fee: string;
        profit: string;
        created: string;
        modified: string;
        symbol?: string;
        category?: string;
        exchange_a_url?: string;
        exchange_b_url?: string;
    }

    interface ApiResponse {
        results: Array<{
            id: string;
            exchange_a: string;
            exchange_b: string;
            exchange_a_price: string;
            exchange_b_price: string;
            exchange_a_volume: string;
            exchange_b_volume: string;
            spread: string;
            profit_fee: string;
            profit: string;
            created: string;
            modified: string;
            symbol?: string;
            category?: string;
            exchange_a_url?: string;
            exchange_b_url?: string;
        }>;
    }

    $: t = translations[$language];

    let opportunities: ArbitrageOpportunity[] = [];
    let loading = true;
    let hasActiveSubscription = false;
    let pollingInterval: number;
    let isListView = false;
    let showOnlyPositiveFunding = false;
    let selectedCategory: string | null = null;
    let showCategoryDropdown = false;

    const CATEGORY_COLORS = [
        { bg: 'bg-amber-500/10', text: 'text-amber-300' },
        { bg: 'bg-emerald-500/10', text: 'text-emerald-300' },
        { bg: 'bg-blue-500/10', text: 'text-blue-300' },
        { bg: 'bg-purple-500/10', text: 'text-purple-300' },
        { bg: 'bg-rose-500/10', text: 'text-rose-300' },
        { bg: 'bg-indigo-500/10', text: 'text-indigo-300' },
        { bg: 'bg-cyan-500/10', text: 'text-cyan-300' },
        { bg: 'bg-pink-500/10', text: 'text-pink-300' }
    ];

    function getCategoryColor(category: string) {
        let hash = 0;
        for (let i = 0; i < category.length; i++) {
            hash = category.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % CATEGORY_COLORS.length;
        return CATEGORY_COLORS[index];
    }

    // Carrega a preferência do usuário do localStorage
    function loadViewPreference(): void {
        if (browser) {
            const savedView = localStorage.getItem('cryptoarbs:viewPreference');
            isListView = savedView === 'list';
        }
    }

    // Salva a preferência do usuário no localStorage
    function saveViewPreference(isList: boolean): void {
        if (browser) {
            localStorage.setItem('cryptoarbs:viewPreference', isList ? 'list' : 'grid');
        }
    }

    async function fetchOpportunities() {
        if (!$auth.token || !hasActiveSubscription) return;
        
        try {
            const data = await getOpportunities($auth.token) as ApiResponse;

            if (!data || !Array.isArray(data.results)) {
                console.error('Invalid data structure received:', data);
                return;
            }

            opportunities = data.results.map((opp) => ({
                ...opp,
                profit: opp.profit?.replace('$', '') ?? '0',
                profit_fee: opp.profit_fee?.replace('$', '') ?? '0',
                exchange_a_price: opp.exchange_a_price?.replace('$', '') ?? '0',
                exchange_b_price: opp.exchange_b_price?.replace('$', '') ?? '0',
                spread: opp.spread?.replace('$', '') ?? '0'
            }));
        } catch (error) {
            console.error('Failed to fetch opportunities:', error);
            opportunities = []; // Reset on error
        }
    }

    function handleClickOutside(event: MouseEvent) {
        if (!browser) return;
        
        const dropdown = document.getElementById('category-dropdown');
        if (dropdown && !dropdown.contains(event.target as Node)) {
            showCategoryDropdown = false;
        }
    }

    onMount(async () => {
        if (browser) {
            document.addEventListener('click', handleClickOutside);
            loadViewPreference();
        }

        if ($auth.token) {
            try {
                const userData = await getMe($auth.token);
                hasActiveSubscription = userData.has_active_subscription;

                if (hasActiveSubscription) {
                    await fetchOpportunities();
                    if (browser) {
                        pollingInterval = setInterval(fetchOpportunities, 5000);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                loading = false;
            }
        } else {
            loading = false;
            // Redireciona para login se não houver token
            if (browser) {
                window.location.href = '/login';
            }
        }
    });

    onDestroy(() => {
        if (browser) {
            document.removeEventListener('click', handleClickOutside);
            if (pollingInterval) {
                clearInterval(pollingInterval);
            }
        }
    });

    function toggleView() {
        isListView = !isListView;
        saveViewPreference(isListView);
    }

    $: filteredOpportunities = opportunities
        .filter(opp => !showOnlyPositiveFunding || parseFloat(opp.profit_fee) >= 0)
        .filter(opp => !selectedCategory || opp.category === selectedCategory);

    $: uniqueCategories = [...new Set(opportunities.map(opp => opp.category).filter(Boolean))];

    // Format volume for display (e.g. 1.2M, 450K, etc.)
    function formatVolume(volume: string | number | null | undefined): string {
        if (volume === null || volume === undefined) return '0';
        
        const num = typeof volume === 'string' ? parseFloat(volume) : volume;
        if (isNaN(num)) return '0';
        
        if (num >= 1_000_000_000) {
            return (num / 1_000_000_000).toFixed(1) + 'B';
        } else if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1) + 'M';
        } else if (num >= 1_000) {
            return (num / 1_000).toFixed(1) + 'K';
        } else {
            return num.toFixed(0);
        }
    }
</script>

<div class="flex flex-col items-center">
    <div class="w-full max-w-5xl space-y-8">
        <div class="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6 pt-2 sm:pt-4">
            <div class="w-full sm:w-[75%]">
                <PageHeader 
                    title={t?.pages?.home?.title || 'Arbitragem de Criptomoedas'}
                    description={t?.pages?.home?.subtitle || 'Esta página é atualizada automaticamente.'}
                    icon={ArrowLeftRight}
                />
            </div>
            {#if !loading && hasActiveSubscription && opportunities.length > 0}
                <div class="flex flex-col w-full sm:flex-row sm:items-center sm:justify-end gap-4">
                    <!-- Category Filter -->
                    {#if uniqueCategories.length > 0}
                        <div class="relative sm:w-[200px]">
                            <button
                                id="category-dropdown"
                                class="w-full sm:w-[200px] flex items-center justify-between px-4 py-2 text-sm font-medium rounded border transition-colors bg-neutral-800/50 border-neutral-800 hover:border-neutral-700"
                                on:click|stopPropagation={() => showCategoryDropdown = !showCategoryDropdown}
                            >
                                <div class="flex-1 flex justify-center">
                                    {#if selectedCategory}
                                        {@const color = getCategoryColor(selectedCategory)}
                                        <div class="flex items-center gap-2">
                                            <span class="text-xs px-2 py-0.5 rounded-full inline-flex items-center {color.bg} {color.text}">{selectedCategory}</span>
                                        </div>
                                    {:else}
                                        <span class="text-neutral-200">Todas Categorias</span>
                                    {/if}
                                </div>
                                <ChevronDown class="w-4 h-4 text-neutral-400 transition-transform {showCategoryDropdown ? 'rotate-180' : ''} ml-2" />
                            </button>

                            {#if showCategoryDropdown}
                                <div 
                                    class="absolute z-50 w-full sm:w-[200px] mt-2 py-2 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl"
                                    transition:fade={{ duration: 100 }}
                                >
                                    <button
                                        class="w-full px-4 py-2 text-sm text-center transition-colors hover:bg-neutral-800 {selectedCategory === null ? 'text-emerald-500' : 'text-neutral-200'}"
                                        on:click={() => {
                                            selectedCategory = null;
                                            showCategoryDropdown = false;
                                        }}
                                    >
                                        Todas Categorias
                                    </button>

                                    {#each uniqueCategories as category}
                                        {@const color = getCategoryColor(category)}
                                        <button
                                            class="w-full px-4 py-2 text-sm transition-colors hover:bg-neutral-800 flex items-center justify-center gap-2"
                                            on:click={() => {
                                                selectedCategory = category;
                                                showCategoryDropdown = false;
                                            }}
                                        >
                                            <span class="text-xs px-2 py-0.5 rounded-full inline-flex items-center {color.bg} {color.text}">{category}</span>
                                        </button>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    {/if}

                    <div class="flex flex-wrap sm:flex-nowrap items-center gap-2">
                        <button
                            class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded border transition-colors {showOnlyPositiveFunding ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'text-neutral-400 border-neutral-800 hover:border-neutral-700'}"
                            on:click={() => showOnlyPositiveFunding = !showOnlyPositiveFunding}
                        >
                            <Percent class="w-4 h-4" />
                            <span class="text-sm">Taxa Positiva</span>
                        </button>

                        <button
                            class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded border transition-colors text-neutral-400 border-neutral-800 hover:border-neutral-700"
                            on:click={toggleView}
                        >
                            {#if isListView}
                                <LayoutGrid class="w-4 h-4" />
                                <span class="text-sm">Grid</span>
                            {:else}
                                <List class="w-4 h-4" />
                                <span class="text-sm">Lista</span>
                            {/if}
                        </button>
                    </div>
                </div>
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
                                {#each filteredOpportunities as opp}
                                    <tr class="hover:bg-emerald-500/5 transition-colors group">
                                        <td class="py-4 px-4">
                                            <div class="flex flex-col gap-1">
                                                <div class="flex items-center gap-2">
                                                    <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 flex items-center justify-center">
                                                        <ArrowLeftRight class="w-3.5 h-3.5 text-emerald-500/80" />
                                                    </div>
                                                    <div class="flex flex-col">
                                                        <span class="text-base font-medium text-neutral-200">{opp.symbol || '-'}</span>
                                                        <span class="text-xs px-2 py-0.5 rounded-full bg-neutral-800/80 text-neutral-300 flex items-center gap-1 w-fit mt-1">
                                                            <TrendingUp class="w-3 h-3 text-neutral-400" />
                                                            <span>${formatVolume(Math.max(parseFloat(opp.exchange_a_volume || '0'), parseFloat(opp.exchange_b_volume || '0')))}</span>
                                                        </span>
                                                        <div class="flex items-center gap-2 mt-1">
                                                            {#if opp.category}
                                                                {@const color = getCategoryColor(opp.category)}
                                                                <span class="text-xs px-2 py-0.5 rounded-full inline-flex items-center {color.bg} {color.text}">{opp.category}</span>
                                                            {/if}
                                                            <span class="text-xs text-neutral-400">{t.pages.home.table.spread}: <span class="font-medium text-emerald-500">{opp.spread}%</span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="py-4 px-4">
                                            <div class="flex flex-col items-center">
                                                <span class="text-sm font-medium text-neutral-200">{opp.exchange_a_price}</span>
                                                <div class="flex items-center gap-1 mt-1">
                                                    <span class="text-xs text-neutral-400">em</span>
                                                    <a href={opp.exchange_a_url} target="_blank" rel="noopener noreferrer" class="text-xs font-medium text-emerald-500 hover:text-emerald-400 transition-colors underline decoration-emerald-500/30 hover:decoration-emerald-400">{opp.exchange_a}</a>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="py-4 px-4">
                                            <div class="flex flex-col items-center">
                                                <span class="text-sm font-medium text-neutral-200">{opp.exchange_b_price}</span>
                                                <div class="flex items-center gap-1 mt-1">
                                                    <span class="text-xs text-neutral-400">em</span>
                                                    <a href={opp.exchange_b_url} target="_blank" rel="noopener noreferrer" class="text-xs font-medium text-emerald-500 hover:text-emerald-400 transition-colors underline decoration-emerald-500/30 hover:decoration-emerald-400">{opp.exchange_b} (Futures)</a>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="py-4 px-4">
                                            <div class="flex flex-col items-end gap-2">
                                                <div class="flex flex-col items-end">
                                                    <div class="flex items-baseline gap-1">
                                                        <span class="text-base font-bold {parseFloat(opp.profit) >= 0 ? 'text-emerald-500' : 'text-red-500'}">{opp.profit}%</span>
                                                        <span class="text-xs {parseFloat(opp.profit) >= 0 ? 'text-emerald-500/70' : 'text-red-500/70'}">{t.pages.home.profit}</span>
                                                    </div>
                                                    <div class="flex items-center gap-1">
                                                        <span class="text-xs" class:text-emerald-500={parseFloat(opp.profit_fee) > 0} class:text-red-500={parseFloat(opp.profit_fee) < 0} class:text-neutral-400={parseFloat(opp.profit_fee) === 0}>
                                                            {parseFloat(opp.profit_fee).toFixed(6)}%
                                                        </span>
                                                        <span class="text-xs text-neutral-400">Taxa de Financiamento</span>
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
                    {#each filteredOpportunities as opp}
                        <div class="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-colors">
                            <div class="p-4 sm:p-6 space-y-4">
                                <!-- Header com Exchanges e Lucro -->
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div class="flex items-center space-x-2">
                                        <a href={opp.exchange_a_url} target="_blank" rel="noopener noreferrer" class="text-base sm:text-lg font-bold text-neutral-200 hover:text-emerald-400 transition-colors underline decoration-emerald-500/30 hover:decoration-emerald-400">{opp.exchange_a}</a>
                                        <ArrowRight class="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500" />
                                        <a href={opp.exchange_b_url} target="_blank" rel="noopener noreferrer" class="text-base sm:text-lg font-bold text-neutral-200 hover:text-emerald-400 transition-colors underline decoration-emerald-500/30 hover:decoration-emerald-400">{opp.exchange_b} (Futures)</a>
                                    </div>
                                    <div class="flex items-baseline space-x-1">
                                        <span class="text-xl sm:text-2xl font-bold {parseFloat(opp.profit) >= 0 ? 'text-emerald-500' : 'text-red-500'}">{opp.profit}%</span>
                                        <span class="text-sm {parseFloat(opp.profit) >= 0 ? 'text-emerald-500/70' : 'text-red-500/70'}">{t.pages.home.profit}</span>
                                    </div>
                                </div>

                                <!-- Trading Pair, Spread e Profit Fees -->
                                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    <div class="col-span-2 sm:col-span-1">
                                        <p class="text-xs sm:text-sm font-medium text-neutral-400">{t.pages.home.tradingPair}</p>
                                        <p class="text-sm sm:text-base text-neutral-200 font-medium">{opp.symbol}</p>
                                        <span class="text-xs px-2 py-0.5 rounded-full bg-neutral-800/80 text-neutral-300 flex items-center gap-1 w-fit mt-1 mb-1">
                                            <TrendingUp class="w-3 h-3 text-neutral-400" />
                                            <span>${formatVolume(Math.max(parseFloat(opp.exchange_a_volume || '0'), parseFloat(opp.exchange_b_volume || '0')))}</span>
                                        </span>
                                        {#if opp.category}
                                            {@const color = getCategoryColor(opp.category)}
                                            <span class="text-xs px-2 py-0.5 rounded-full inline-flex items-center w-fit mt-1 {color.bg} {color.text}">{opp.category}</span>
                                        {/if}
                                    </div>
                                    <div>
                                        <p class="text-xs sm:text-sm font-medium text-neutral-400">{t.pages.home.spread}</p>
                                        <p class="text-sm sm:text-base text-neutral-200">{opp.spread}%</p>
                                    </div>
                                    <div>
                                        <p class="text-xs sm:text-sm font-medium text-neutral-400">Taxa de Financiamento</p>
                                        <p class="text-sm sm:text-base" class:text-emerald-500={parseFloat(opp.profit_fee) > 0} class:text-red-500={parseFloat(opp.profit_fee) < 0} class:text-neutral-200={parseFloat(opp.profit_fee) === 0}>{parseFloat(opp.profit_fee).toFixed(6)}%</p>
                                    </div>
                                </div>

                                <!-- Preços -->
                                <div class="border-t border-neutral-800 pt-4">
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <p class="text-xs sm:text-sm font-medium text-neutral-400 mb-2">
                                                <a href={opp.exchange_a_url} target="_blank" rel="noopener noreferrer" class="hover:text-emerald-400 transition-colors underline decoration-emerald-500/30 hover:decoration-emerald-400">{opp.exchange_a}</a>
                                            </p>
                                            <div class="flex justify-between">
                                                <span class="text-xs sm:text-sm text-neutral-400">{t.pages.home.price}</span>
                                                <span class="text-xs sm:text-sm text-neutral-200">{opp.exchange_a_price}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p class="text-xs sm:text-sm font-medium text-neutral-400 mb-2">
                                                <a href={opp.exchange_b_url} target="_blank" rel="noopener noreferrer" class="hover:text-emerald-400 transition-colors underline decoration-emerald-500/30 hover:decoration-emerald-400">{opp.exchange_b} (Futures)</a>
                                            </p>
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