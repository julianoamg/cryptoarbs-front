<script lang="ts">
    import { ArrowRight, TrendingUp, Percent, X, ArrowLeftRight, LayoutGrid, List, Coins, CircleDollarSign, DollarSign, ChevronDown } from 'lucide-svelte';
    import { fade } from 'svelte/transition';
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
        favorited?: boolean;
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
    let pollingTimeout: ReturnType<typeof setTimeout>;
    let isListView = false;
    let showOnlyPositiveFunding = false;
    let showOnlyNegativeFunding = false;
    let selectedCategory: string | null = null;
    let showCategoryDropdown = false;
    let showFundingDropdown = false;
    let fundingFilter: 'all' | 'positive' | 'negative' = 'all';
    let favorites: Record<string, boolean> = {};

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

    // Funções para gerenciar preferências no localStorage
    function loadUserPreferences(): void {
        if (browser) {
            // Carrega preferência de visualização
            const savedView = localStorage.getItem('cryptoarbs:viewPreference');
            if (savedView !== null) {
                isListView = savedView === 'list';
            }

            // Carrega categoria selecionada
            const savedCategory = localStorage.getItem('cryptoarbs:selectedCategory');
            if (savedCategory !== null) {
                selectedCategory = savedCategory;
            }

            // Carrega filtro de taxa
            const savedFundingFilter = localStorage.getItem('cryptoarbs:fundingFilter');
            if (savedFundingFilter !== null) {
                fundingFilter = savedFundingFilter as 'all' | 'positive' | 'negative';
            }
            
            // Carrega favoritos
            const savedFavorites = localStorage.getItem('cryptoarbs:favorites');
            if (savedFavorites !== null) {
                favorites = JSON.parse(savedFavorites);
            }
        }
    }

    function saveUserPreferences(): void {
        if (browser) {
            // Salva preferência de visualização
            localStorage.setItem('cryptoarbs:viewPreference', isListView ? 'list' : 'grid');
            
            // Salva categoria selecionada
            if (selectedCategory !== null) {
                localStorage.setItem('cryptoarbs:selectedCategory', selectedCategory);
            } else {
                localStorage.removeItem('cryptoarbs:selectedCategory');
            }

            // Salva filtro de taxa
            localStorage.setItem('cryptoarbs:fundingFilter', fundingFilter);
            
            // Salva favoritos
            localStorage.setItem('cryptoarbs:favorites', JSON.stringify(favorites));
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

            // Só atualiza se houver dados válidos
            if (data.results.length > 0) {
                opportunities = data.results.map((opp) => ({
                    ...opp,
                    profit: opp.profit?.replace('$', '') ?? '0',
                    profit_fee: opp.profit_fee?.replace('$', '') ?? '0',
                    exchange_a_price: opp.exchange_a_price?.replace('$', '') ?? '0',
                    exchange_b_price: opp.exchange_b_price?.replace('$', '') ?? '0',
                    spread: opp.spread?.replace('$', '') ?? '0',
                    favorited: favorites[getFavoriteKey(opp)] || false
                }));
            }
        } catch (error) {
            console.error('Failed to fetch opportunities:', error);
            // Não reseta as oportunidades em caso de erro
            // opportunities = []; // Removido para manter os dados anteriores
        }
    }

    function handleClickOutside(event: MouseEvent) {
        if (!browser) return;
        
        const categoryDropdown = document.getElementById('category-dropdown');
        const fundingDropdown = document.getElementById('funding-dropdown');
        
        if (categoryDropdown && !categoryDropdown.contains(event.target as Node)) {
            showCategoryDropdown = false;
        }
        
        if (fundingDropdown && !fundingDropdown.contains(event.target as Node)) {
            showFundingDropdown = false;
        }
    }

    async function startPolling() {
        if (!$auth.token || !hasActiveSubscription) return;

        try {
            await fetchOpportunities();
            // Agenda a próxima chamada apenas após a atual terminar
            pollingTimeout = setTimeout(startPolling, 3000);
        } catch (error) {
            console.error('Failed to fetch opportunities:', error);
            // Em caso de erro, tenta novamente após 3 segundos
            pollingTimeout = setTimeout(startPolling, 3000);
        }
    }

    onMount(async () => {
        if (browser) {
            document.addEventListener('click', handleClickOutside);
            loadUserPreferences();
        }

        if ($auth.token) {
            try {
                const userData = await getMe($auth.token);
                hasActiveSubscription = userData.has_active_subscription;

                if (hasActiveSubscription) {
                    // Inicia o polling
                    startPolling();
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                loading = false;
            }
        } else {
            loading = false;
            if (browser) {
                window.location.href = '/login';
            }
        }
    });

    onDestroy(() => {
        if (browser) {
            document.removeEventListener('click', handleClickOutside);
            if (pollingTimeout) {
                clearTimeout(pollingTimeout);
            }
        }
    });

    function toggleView() {
        isListView = !isListView;
        saveUserPreferences();
    }

    $: filteredOpportunities = opportunities
        .filter(opp => {
            if (fundingFilter === 'positive') return parseFloat(opp.profit_fee) > 0;
            if (fundingFilter === 'negative') return parseFloat(opp.profit_fee) < 0;
            return true;
        })
        .filter(opp => !selectedCategory || opp.category === selectedCategory)
        .sort((a, b) => {
            // Ordena favoritos primeiro
            if (a.favorited && !b.favorited) return -1;
            if (!a.favorited && b.favorited) return 1;
            return 0;
        });

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

    // Calcula a diferença percentual entre os volumes dos dois mercados
    function calculateVolumeDifference(volumeA: string | number | null | undefined, volumeB: string | number | null | undefined): { percent: number, higherVolume: 'A' | 'B' | 'equal' } {
        const numA = typeof volumeA === 'string' ? parseFloat(volumeA || '0') : (volumeA || 0);
        const numB = typeof volumeB === 'string' ? parseFloat(volumeB || '0') : (volumeB || 0);
        
        if (numA === numB) return { percent: 0, higherVolume: 'equal' };
        
        if (numA > numB) {
            const diff = numA - numB;
            const percent = (diff / numB) * 100;
            return { percent, higherVolume: 'A' };
        } else {
            const diff = numB - numA;
            const percent = (diff / numA) * 100;
            return { percent, higherVolume: 'B' };
        }
    }

    // Calcula a posição recomendada para futuros (long ou short) com base no peso do volume e condição de contango/backwardation
    function calculateFuturesPosition(spotPrice: string | number, futuresPrice: string | number, spotVolume: string | number, futuresVolume: string | number): { position: 'LONG' | 'SHORT', weight: number } {
        // Converter para números
        const spotPriceNum = typeof spotPrice === 'string' ? parseFloat(spotPrice || '0') : (spotPrice || 0);
        const futuresPriceNum = typeof futuresPrice === 'string' ? parseFloat(futuresPrice || '0') : (futuresPrice || 0);
        const spotVolumeNum = typeof spotVolume === 'string' ? parseFloat(spotVolume || '0') : (spotVolume || 0);
        const futuresVolumeNum = typeof futuresVolume === 'string' ? parseFloat(futuresVolume || '0') : (futuresVolume || 0);
        
        // Calcular o peso do futuro
        const totalVolume = spotVolumeNum + futuresVolumeNum;
        const futuresWeight = totalVolume > 0 ? futuresVolumeNum / totalVolume : 0.5;
        
        // Determinar se é contango ou backwardation
        const priceDiff = futuresPriceNum - spotPriceNum;
        
        // Determinar a posição com base na condição
        let position: 'LONG' | 'SHORT';
        if (priceDiff > 0) {
            // Contango: Preço do futuro > Preço do spot → Tendência de alta → Long
            position = 'LONG';
        } else {
            // Backwardation: Preço do futuro < Preço do spot → Tendência de baixa → Short
            position = 'SHORT';
        }
        
        return { position, weight: futuresWeight * 100 };
    }

    // Observa mudanças nos estados e salva no localStorage
    $: {
        if (browser && !loading) {
            saveUserPreferences();
        }
    }

    // Modifica os handlers de clique dos botões para salvar o estado
    async function handleCategorySelect(category: string | null) {
        selectedCategory = category;
        showCategoryDropdown = false;
        saveUserPreferences();
    }

    async function handleFundingFilterSelect(filter: 'all' | 'positive' | 'negative') {
        fundingFilter = filter;
        showFundingDropdown = false;
        saveUserPreferences();
    }

    // Função para gerar uma chave única para cada oportunidade baseada no par e exchanges
    function getFavoriteKey(opp: ArbitrageOpportunity): string {
        return `${opp.symbol}-${opp.exchange_a}-${opp.exchange_b}`;
    }
    
    // Função para alternar o status de favorito
    function toggleFavorite(opp: ArbitrageOpportunity): void {
        const key = getFavoriteKey(opp);
        
        // Atualiza o estado local
        if (favorites[key]) {
            delete favorites[key];
        } else {
            favorites[key] = true;
        }
        
        // Força a atualização do objeto para que o Svelte detecte a mudança
        favorites = { ...favorites };
        
        // Atualiza o status de favorito na oportunidade
        opp.favorited = favorites[key] || false;
        
        // Reordena as oportunidades para mostrar favoritos primeiro
        opportunities = [...opportunities].sort((a, b) => {
            // Verifica se é favorito usando a chave atualizada
            const aFavorited = favorites[getFavoriteKey(a)] || false;
            const bFavorited = favorites[getFavoriteKey(b)] || false;
            
            // Ordena favoritos primeiro
            if (aFavorited && !bFavorited) return -1;
            if (!aFavorited && bFavorited) return 1;
            return 0;
        });
        
        // Salva as preferências
        saveUserPreferences();
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
                                aria-label="Filtrar por categoria"
                                aria-expanded={showCategoryDropdown}
                                aria-controls="category-dropdown-menu"
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
                                    id="category-dropdown-menu"
                                    class="absolute z-50 w-full sm:w-[200px] mt-2 py-2 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl"
                                    transition:fade={{ duration: 100 }}
                                >
                                    <button
                                        class="w-full px-4 py-2 text-sm transition-colors hover:bg-neutral-800 {selectedCategory === null ? 'text-emerald-500' : 'text-neutral-200'}"
                                        on:click={() => {
                                            selectedCategory = null;
                                            showCategoryDropdown = false;
                                            saveUserPreferences();
                                        }}
                                    >
                                        <div class="text-left">
                                            <div class="font-medium flex items-center gap-2">
                                                <span>Todas Categorias</span>
                                                <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300">Recomendado</span>
                                            </div>
                                            <p class="text-xs text-neutral-400 mt-1.5">Visualize todas as oportunidades disponíveis para maximizar seus ganhos em diferentes tipos de mercado</p>
                                        </div>
                                    </button>

                                    {#each uniqueCategories as category}
                                        {@const color = getCategoryColor(category)}
                                        <button
                                            class="w-full px-4 py-2 text-sm transition-colors hover:bg-neutral-800"
                                            on:click={() => {
                                                selectedCategory = category;
                                                showCategoryDropdown = false;
                                                saveUserPreferences();
                                            }}
                                        >
                                            <div class="text-left">
                                                <div class="flex items-center gap-2">
                                                    <span class="text-xs px-2 py-0.5 rounded-full inline-flex items-center {color.bg} {color.text}">{category}</span>
                                                </div>
                                                <p class="text-xs text-neutral-400 mt-1.5">
                                                    {#if category === 'Spot-Futures'}
                                                        Exemplo de contango: Quando o Bitcoin está em $50.000 no spot e $50.500 no futuro, indicando que o mercado espera alta no preço
                                                    {:else if category === 'Spot-Margin'}
                                                        Aproveite diferenças de preço entre mercados à vista e de margem
                                                    {:else if category === 'Funding'}
                                                        Exemplo de backwardation: Quando o Bitcoin está em $50.000 no spot e $49.500 no futuro, indicando que o mercado espera queda no preço
                                                    {:else if category === 'Cross-Exchange'}
                                                        Compare preços entre exchanges
                                                    {:else if category === 'Triangular'}
                                                        Use 3 moedas para lucrar
                                                    {:else if category === 'Statistical'}
                                                        Lucre com desvios temporários de preço
                                                    {:else if category === 'Index'}
                                                        Compare índices com preços reais
                                                    {:else if category === 'Perpetual-Futures'}
                                                        Compare futuros sem vencimento com futuros com data
                                                    {:else if category === 'Backwardation'}
                                                        Exemplo: Quando o Bitcoin está em $50.000 no spot e $49.500 no futuro, indicando que o mercado espera queda no preço
                                                    {:else if category === 'Contango'}
                                                        Exemplo: Quando o Bitcoin está em $50.000 no spot e $50.500 no futuro, indicando que o mercado espera alta no preço
                                                    {:else}
                                                        Exibe apenas oportunidades da categoria {category}
                                                    {/if}
                                                </p>
                                            </div>
                                        </button>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    {/if}

                    <div class="flex flex-wrap sm:flex-nowrap items-center gap-2">
                        <div class="relative flex-1 sm:flex-none sm:w-[180px]">
                            <button
                                id="funding-dropdown"
                                class="w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded border transition-colors bg-neutral-800/50 border-neutral-800 hover:border-neutral-700"
                                on:click|stopPropagation={() => showFundingDropdown = !showFundingDropdown}
                                aria-label={`Filtrar por ${t.pages.home.fundingRate.toLowerCase()}`}
                                aria-expanded={showFundingDropdown}
                                aria-controls="funding-dropdown-menu"
                            >
                                <div class="flex-1 flex justify-center">
                                    {#if fundingFilter === 'positive'}
                                        <div class="flex items-center gap-2">
                                            <span class="text-xs px-2 py-0.5 rounded-full inline-flex items-center bg-emerald-500/10 text-emerald-400">Taxa Positiva</span>
                                        </div>
                                    {:else if fundingFilter === 'negative'}
                                        <div class="flex items-center gap-2">
                                            <span class="text-xs px-2 py-0.5 rounded-full inline-flex items-center bg-red-500/10 text-red-400">Taxa Negativa</span>
                                        </div>
                                    {:else}
                                        <span class="text-neutral-200">Todas Taxas</span>
                                    {/if}
                                </div>
                                <ChevronDown class="w-4 h-4 text-neutral-400 transition-transform {showFundingDropdown ? 'rotate-180' : ''} ml-2" />
                            </button>

                            {#if showFundingDropdown}
                                <div 
                                    id="funding-dropdown-menu"
                                    class="absolute z-50 w-full mt-2 py-2 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl"
                                    transition:fade={{ duration: 100 }}
                                >
                                    <button
                                        class="w-full px-4 py-2 text-sm transition-colors hover:bg-neutral-800 {fundingFilter === 'all' ? 'text-emerald-500' : 'text-neutral-200'}"
                                        on:click={() => {
                                            fundingFilter = 'all';
                                            showFundingDropdown = false;
                                            saveUserPreferences();
                                        }}
                                    >
                                        <div class="text-left">
                                            <div class="font-medium flex items-center gap-2">
                                                <span>Todas Taxas</span>
                                                <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300">Recomendado</span>
                                            </div>
                                            <p class="text-xs text-neutral-400 mt-1.5">
                                                Visualize todas as oportunidades de arbitragem, independente do tipo de posição (long/short) e suas taxas
                                            </p>
                                        </div>
                                    </button>
                                    <button
                                        class="w-full px-4 py-2 text-sm transition-colors hover:bg-neutral-800 {fundingFilter === 'positive' ? 'text-emerald-500' : 'text-neutral-200'}"
                                        on:click={() => {
                                            fundingFilter = 'positive';
                                            showFundingDropdown = false;
                                            saveUserPreferences();
                                        }}
                                    >
                                        <div class="text-left">
                                            <div class="flex items-center gap-2">
                                                <span class="text-xs px-2 py-0.5 rounded-full inline-flex items-center bg-emerald-500/10 text-emerald-400">Taxa Positiva</span>
                                            </div>
                                            <p class="text-xs text-neutral-400 mt-1.5">
                                                {t.pages.home.fundingRate === 'Taxa de Financiamento' ? 'Apenas oportunidades onde você mantém posição short no futuro e recebe taxa extra a cada 8h' : 'Only opportunities where you maintain a short position in the future and receive an extra fee every 8h'}
                                            </p>
                                        </div>
                                    </button>
                                    <button
                                        class="w-full px-4 py-2 text-sm transition-colors hover:bg-neutral-800 {fundingFilter === 'negative' ? 'text-emerald-500' : 'text-neutral-200'}"
                                        on:click={() => {
                                            fundingFilter = 'negative';
                                            showFundingDropdown = false;
                                            saveUserPreferences();
                                        }}
                                    >
                                        <div class="text-left">
                                            <div class="flex items-center gap-2">
                                                <span class="text-xs px-2 py-0.5 rounded-full inline-flex items-center bg-red-500/10 text-red-400">Taxa Negativa</span>
                                            </div>
                                            <p class="text-xs text-neutral-400 mt-1.5">
                                                {t.pages.home.fundingRate === 'Taxa de Financiamento' ? 'Apenas oportunidades onde você mantém posição short no futuro e paga uma pequena taxa a cada 8h' : 'Only opportunities where you maintain a short position in the future and pay a small fee every 8h'}
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            {/if}
                        </div>

                        <button
                            class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded border transition-colors text-neutral-400 border-neutral-800 hover:border-neutral-700"
                            on:click={toggleView}
                            aria-label={isListView ? "Alternar para visualização em grid" : "Alternar para visualização em lista"}
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
                                                        <div class="flex items-center gap-2">
                                                            <span class="text-base font-medium text-neutral-200">{opp.symbol || '-'}</span>
                                                            <!-- Botão de favorito -->
                                                            <button 
                                                                class="text-neutral-400 hover:text-amber-400 transition-colors focus:outline-none"
                                                                on:click|stopPropagation={() => toggleFavorite(opp)}
                                                                aria-label={opp.favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={opp.favorited ? "currentColor" : "none"} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={opp.favorited ? "text-amber-400" : "text-neutral-400"}>
                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                                </svg>
                                                            </button>
                                                        </div>
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
                                                <div class="flex items-center gap-1 mt-1">
                                                    <span class="text-xs text-neutral-400">Vol:</span>
                                                    <span class="text-xs text-neutral-300">${formatVolume(opp.exchange_a_volume)}</span>
                                                    {#if calculateVolumeDifference(opp.exchange_a_volume, opp.exchange_b_volume).higherVolume === 'A'}
                                                        <span class="text-xs text-blue-400 ml-1">(+{calculateVolumeDifference(opp.exchange_a_volume, opp.exchange_b_volume).percent.toFixed(1)}%)</span>
                                                    {/if}
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
                                                <div class="flex items-center gap-1 mt-1">
                                                    <span class="text-xs text-neutral-400">Vol:</span>
                                                    <span class="text-xs text-neutral-300">${formatVolume(opp.exchange_b_volume)}</span>
                                                    {#if calculateVolumeDifference(opp.exchange_a_volume, opp.exchange_b_volume).higherVolume === 'B'}
                                                        <span class="text-xs text-purple-400 ml-1">(+{calculateVolumeDifference(opp.exchange_a_volume, opp.exchange_b_volume).percent.toFixed(1)}%)</span>
                                                    {/if}
                                                </div>
                                            </div>
                                        </td>
                                        <td class="py-4 px-4">
                                            <div class="flex flex-col items-end gap-2">
                                                <div class="flex items-center gap-2">
                                                    <!-- Botão de favorito -->
                                                    <button 
                                                        class="text-neutral-400 hover:text-amber-400 transition-colors focus:outline-none"
                                                        on:click|stopPropagation={() => toggleFavorite(opp)}
                                                        aria-label={opp.favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={opp.favorited ? "currentColor" : "none"} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={opp.favorited ? "text-amber-400" : "text-neutral-400"}>
                                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                        </svg>
                                                    </button>
                                                    <div class="flex flex-col items-end">
                                                        <div class="flex items-baseline space-x-1">
                                                            <span class="text-xl sm:text-2xl font-bold {parseFloat(opp.profit) >= 0 ? 'text-emerald-500' : 'text-red-500'}">{opp.profit}%</span>
                                                            <span class="text-sm {parseFloat(opp.profit) >= 0 ? 'text-emerald-500/70' : 'text-red-500/70'}">{t.pages.home.profit}</span>
                                                        </div>
                                                        <!-- Posição recomendada para futuros -->
                                                        {#if true}
                                                            {@const futuresPosition = calculateFuturesPosition(opp.exchange_a_price, opp.exchange_b_price, opp.exchange_a_volume, opp.exchange_b_volume)}
                                                            <span class="text-xs px-2 py-0.5 rounded-full inline-flex items-center mt-1 {futuresPosition.position === 'LONG' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'} font-medium">
                                                                {futuresPosition.position} ({futuresPosition.weight.toFixed(1)}%)
                                                            </span>
                                                        {/if}
                                                    </div>
                                                </div>
                                                <div class="flex items-center gap-1 mt-1">
                                                    <span class="text-xs" class:text-emerald-500={parseFloat(opp.profit_fee) > 0} class:text-red-500={parseFloat(opp.profit_fee) < 0} class:text-neutral-400={parseFloat(opp.profit_fee) === 0}>
                                                        {parseFloat(opp.profit_fee).toFixed(6)}%
                                                    </span>
                                                    <span class="text-xs text-neutral-400">{t.pages.home.fundingRate}</span>
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
                                    <div class="flex flex-col items-end">
                                        <div class="flex items-center gap-2">
                                            <!-- Botão de favorito -->
                                            <button 
                                                class="text-neutral-400 hover:text-amber-400 transition-colors focus:outline-none"
                                                on:click|stopPropagation={() => toggleFavorite(opp)}
                                                aria-label={opp.favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={opp.favorited ? "currentColor" : "none"} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={opp.favorited ? "text-amber-400" : "text-neutral-400"}>
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                </svg>
                                            </button>
                                            <div class="flex items-baseline space-x-1">
                                                <span class="text-xl sm:text-2xl font-bold {parseFloat(opp.profit) >= 0 ? 'text-emerald-500' : 'text-red-500'}">{opp.profit}%</span>
                                                <span class="text-sm {parseFloat(opp.profit) >= 0 ? 'text-emerald-500/70' : 'text-red-500/70'}">{t.pages.home.profit}</span>
                                            </div>
                                        </div>
                                        <!-- Posição recomendada para futuros -->
                                        {#if true}
                                            {@const futuresPosition = calculateFuturesPosition(opp.exchange_a_price, opp.exchange_b_price, opp.exchange_a_volume, opp.exchange_b_volume)}
                                            <span class="text-xs px-2 py-0.5 rounded-full inline-flex items-center mt-1 {futuresPosition.position === 'LONG' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'} font-medium">
                                                {futuresPosition.position} ({futuresPosition.weight.toFixed(1)}%)
                                            </span>
                                        {/if}
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
                                        <p class="text-xs sm:text-sm font-medium text-neutral-400">{t.pages.home.fundingRate}</p>
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
                                            <div class="flex items-center gap-1 mt-1">
                                                <span class="text-xs text-neutral-400">Vol:</span>
                                                <span class="text-xs text-neutral-300">${formatVolume(opp.exchange_a_volume)}</span>
                                                {#if calculateVolumeDifference(opp.exchange_a_volume, opp.exchange_b_volume).higherVolume === 'A'}
                                                    <span class="text-xs text-blue-400 ml-1">(+{calculateVolumeDifference(opp.exchange_a_volume, opp.exchange_b_volume).percent.toFixed(1)}%)</span>
                                                {/if}
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
                                            <div class="flex items-center gap-1 mt-1">
                                                <span class="text-xs text-neutral-400">Vol:</span>
                                                <span class="text-xs text-neutral-300">${formatVolume(opp.exchange_b_volume)}</span>
                                                {#if calculateVolumeDifference(opp.exchange_a_volume, opp.exchange_b_volume).higherVolume === 'B'}
                                                    <span class="text-xs text-purple-400 ml-1">(+{calculateVolumeDifference(opp.exchange_a_volume, opp.exchange_b_volume).percent.toFixed(1)}%)</span>
                                                {/if}
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
