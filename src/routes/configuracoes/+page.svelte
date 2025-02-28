<script lang="ts">
    import { onMount } from 'svelte';
    import { Settings, Check } from 'lucide-svelte';
    import { language } from '$lib/stores/i18n';
    import type { Translation, Language } from '$lib/i18n/types';
    import { translations } from '$lib/i18n/translations';
    import { auth } from '$lib/stores/auth';
    import { getExchanges } from '$lib/services/exchange';
    import { getMe } from '$lib/services/user';
    import PageHeader from '../../components/forms/PageHeader.svelte';
    import Card from '../../components/forms/Card.svelte';
    import Button from '../../components/forms/Button.svelte';
    import Loading from '../../components/Loading.svelte';
    import FormField from '../../components/forms/FormField.svelte';
    import Pagination from '../../components/forms/Pagination.svelte';
    import { PUBLIC_API_URL } from '$env/static/public';

    interface Exchange {
        id: string;
        name: string;
        marked: boolean;
    }

    interface TradingPair {
        id: string;
        symbol: string;
        asset: string;
        price_current: string;
        price_24h_change: string;
        real_volume_24h: string;
        marked: boolean;
    }

    interface UserData {
        min_spread?: number;
        max_spread?: number;
        email: string;
        has_active_subscription: boolean;
    }

    $: t = translations[$language as Language] as Translation;

    let exchanges: Exchange[] = [];
    let loading = true;
    let selectedExchanges: boolean[] = [];
    let loadingPairs = false;
    let tradingPairs: TradingPair[] = [];
    let selectedPairs: boolean[] = [];
    let minSpread = "";
    let maxSpread = "";
    let searchQuery = "";
    let prevSearchQuery = ""; // Para rastrear mudanças no campo de busca
    let currentPage = 1;
    let totalPages = 1;
    let pageSize = 20; // Tamanho padrão da página
    let totalItems = 0;
    let spreadUpdateController: AbortController | null = null;
    let spreadUpdateTimeout: number | null = null;
    let searchTimeout: ReturnType<typeof setTimeout> | null = null;
    let isSearching = false;

    // Filtra os pares baseado na pesquisa
    $: filteredPairs = tradingPairs;

    // Observa mudanças na busca e atualiza os resultados
    $: {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        // Verifica se o valor da busca realmente mudou
        if (searchQuery !== prevSearchQuery) {
            isSearching = true;
            searchTimeout = setTimeout(() => {
                prevSearchQuery = searchQuery; // Atualiza o valor anterior
                currentPage = 1; // Resetar para a primeira página ao buscar
                fetchTradingPairs();
            }, 500); // Debounce de 500ms para evitar muitas requisições
        }
    }

    // Gera um emoji colorido baseado no nome da exchange
    function getExchangeIcon(name: string): string {
        const colorEmojis = ['🔵', '🟢', '🟡', '🔴', '🟣', '⚪', '🟤', '🟠'];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % colorEmojis.length;
        return colorEmojis[index];
    }

    function formatPrice(price: string | number): string {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return numPrice.toFixed(6);
    }

    function formatVolume(volume: string | number): string {
        const numVolume = typeof volume === 'string' ? parseFloat(volume) : volume;
        
        if (numVolume >= 1e9) {
            return (numVolume / 1e9).toFixed(2) + 'B';
        } else if (numVolume >= 1e6) {
            return (numVolume / 1e6).toFixed(2) + 'M';
        } else {
            return numVolume.toFixed(2);
        }
    }

    async function fetchExchanges() {
        if (!$auth.token) return;
        
        try {
            const response = await fetch(`${PUBLIC_API_URL}/exchanges/marked/?page=${currentPage}`, {
                headers: {
                    'Authorization': `Token ${$auth.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch exchanges');
            }

            const data = await response.json();
            exchanges = data.results;
            selectedExchanges = exchanges.map(e => e.marked);
            loading = false;
        } catch (error) {
            console.error('Failed to fetch exchanges:', error);
            loading = false;
        }
    }

    async function fetchTradingPairs() {
        if (!$auth.token) return;
        
        loadingPairs = true;
        isSearching = true;
        try {
            // Construir a URL com os parâmetros de paginação e busca
            let url = `${PUBLIC_API_URL}/exchanges/cryptoassets/?page=${currentPage}&page_size=${pageSize}`;
            
            // Adicionar parâmetro de busca se houver um termo
            if (searchQuery.trim() !== '') {
                url += `&search=${encodeURIComponent(searchQuery.trim())}`;
            }
            
            console.log('Fetching trading pairs with URL:', url);
            
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Token ${$auth.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch trading pairs');
            }

            const data = await response.json();
            tradingPairs = data.results || [];
            totalItems = data.count;
            totalPages = Math.ceil(data.count / pageSize);
            selectedPairs = tradingPairs.map(p => p.marked);
        } catch (error) {
            console.error('Failed to fetch trading pairs:', error);
        } finally {
            loadingPairs = false;
            isSearching = false;
        }
    }

    async function handlePageChange(newPage: number) {
        if (newPage >= 1 && newPage <= totalPages) {
            currentPage = newPage;
            await fetchTradingPairs();
        }
    }

    onMount(async () => {
        if ($auth.token) {
            try {
                // Busca dados do usuário incluindo preferências de spread
                const userData = await getMe($auth.token);
                minSpread = userData.min_spread?.toString() || "";
                maxSpread = userData.max_spread?.toString() || "";

                await fetchExchanges();
                await fetchTradingPairs();
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                loading = false;
            }
        }
    });

    async function toggleExchange(index: number): Promise<void> {
        if (!$auth.token) return;

        const exchange = exchanges[index];
        try {
            const response = await fetch(`${PUBLIC_API_URL}/exchanges/list/toggle-mark/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${$auth.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    exchange_id: exchange.id
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update exchange preference');
            }

            selectedExchanges[index] = !selectedExchanges[index];
            selectedExchanges = [...selectedExchanges];
        } catch (error) {
            console.error('Failed to toggle exchange:', error);
        }
    }

    async function togglePair(index: number): Promise<void> {
        if (!$auth.token) return;

        const pair = tradingPairs[index];
        try {
            const response = await fetch(`${PUBLIC_API_URL}/exchanges/cryptoassets/toggle-mark/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${$auth.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    asset_id: pair.id
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update pair preference');
            }

            const data = await response.json();
            selectedPairs[index] = data.marked;
            selectedPairs = [...selectedPairs];
        } catch (error) {
            console.error('Failed to toggle pair:', error);
        }
    }

    // Computa o estado dos pares selecionados
    $: allPairsSelected = selectedPairs.length > 0 && selectedPairs.every(Boolean);
    $: somePairsSelected = selectedPairs.some(Boolean);
    $: noPairsSelected = selectedPairs.length > 0 && !selectedPairs.some(Boolean);

    async function toggleAllPairs(): Promise<void> {
        if (!$auth.token) return;

        try {
            const response = await fetch(`${PUBLIC_API_URL}/exchanges/cryptoassets/mark-all/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${$auth.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to mark all pairs');
            }

            // Recarrega a lista para refletir o novo estado
            await fetchTradingPairs();
        } catch (error) {
            console.error('Failed to toggle all pairs:', error);
        }
    }

    $: {
        if (minSpread !== undefined && maxSpread !== undefined) {
            const min = parseFloat(minSpread);
            const max = parseFloat(maxSpread);
            
            if (!isNaN(min) && !isNaN(max)) {
                updateSpreadPreferences();
            }
        }
    }

    async function updateSpreadPreferences() {
        if (!$auth.token) return;

        try {
            const response = await fetch(`${PUBLIC_API_URL}/exchanges/preferences/spread/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${$auth.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    min_spread: parseFloat(minSpread),
                    max_spread: parseFloat(maxSpread)
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update spread preferences');
            }

            const data = await response.json();
            minSpread = data.min_spread.toString();
            maxSpread = data.max_spread.toString();
        } catch (error) {
            console.error('Failed to update spread preferences:', error);
        }
    }
</script>

<div class="flex flex-col items-center">
    <div class="w-full max-w-5xl space-y-6">
        <PageHeader 
            title={t?.pages?.settings?.title || 'Configurações'}
            description={t?.pages?.settings?.subtitle || 'Gerencie suas preferências'}
            icon={Settings}
        />

        {#if loading}
            <Loading />
        {:else}
            <Card title={t?.pages?.settings?.exchanges?.title}>
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                        <p class="text-sm text-neutral-400">{t?.pages?.settings?.exchanges?.description}</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {#each exchanges as exchange, i}
                        <button 
                            class="relative flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer {selectedExchanges[i] ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent' : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'}"
                            on:click={() => toggleExchange(i)}
                            type="button"
                        >
                            <div class="flex items-center min-w-0">
                                <div class="text-xl">{getExchangeIcon(exchange.name)}</div>
                                <span class="ml-2 font-medium text-neutral-200 truncate">{exchange.name}</span>
                            </div>
                            <div class="w-4 h-4 ml-2 rounded-full border transition-colors flex-shrink-0 flex items-center justify-center {selectedExchanges[i] ? 'border-emerald-500 bg-emerald-500' : 'border-neutral-700'}">
                                {#if selectedExchanges[i]}
                                    <Check class="w-2 h-2 text-neutral-900" />
                                {/if}
                            </div>
                        </button>
                    {/each}
                </div>
            </Card>

            <Card title={t?.pages?.settings?.spread?.title}>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        type="number"
                        name="minSpread"
                        label={t?.pages?.settings?.spread?.minSpread}
                        bind:value={minSpread}
                        min="0"
                        max="100"
                        step="0.1"
                        onkeypress="return event.charCode >= 48"
                    />
                    <FormField
                        type="number"
                        name="maxSpread"
                        label={t?.pages?.settings?.spread?.maxSpread}
                        bind:value={maxSpread}
                        min="0"
                        max="100"
                        step="0.1"
                        onkeypress="return event.charCode >= 48"
                    />
                </div>
                <p class="mt-2 text-sm text-neutral-300">
                    {t?.pages?.settings?.spread?.description.replace('{min}', minSpread).replace('{max}', maxSpread)}
                </p>
            </Card>

            <Card title={t?.pages?.settings?.coins?.title}>
                <div class="space-y-3">
                    <!-- Search and Select All -->
                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <div class="relative flex-1">
                            <input
                                type="text"
                                bind:value={searchQuery}
                                placeholder={t?.pages?.settings?.coins?.search}
                                class="w-full px-4 py-2 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 placeholder-neutral-400 focus:outline-none focus:border-emerald-500/50"
                            />
                            {#if isSearching}
                                <div class="absolute right-2 top-1/2 -translate-y-1/2">
                                    <div class="w-5 h-5 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                                </div>
                            {:else if searchQuery.trim() !== ''}
                                <button 
                                    class="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 p-1"
                                    on:click={() => {
                                        searchQuery = '';
                                        prevSearchQuery = '';
                                        currentPage = 1;
                                        fetchTradingPairs();
                                    }}
                                    aria-label="Limpar busca"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            {/if}
                        </div>
                        <button
                            class="flex-shrink-0 px-4 py-2 rounded-lg border transition-colors text-neutral-200 flex items-center gap-2 {allPairsSelected ? 'border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20' : noPairsSelected ? 'border-neutral-800 bg-neutral-900 hover:border-neutral-700' : 'border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20'}"
                            on:click={toggleAllPairs}
                        >
                            <div class="relative w-4 h-4">
                                {#if allPairsSelected}
                                    <Check class="w-4 h-4 text-emerald-500" />
                                {:else if somePairsSelected}
                                    <div class="absolute inset-1 bg-emerald-500 rounded-sm"></div>
                                {:else}
                                    <div class="w-4 h-4 border-2 border-neutral-400 rounded-sm"></div>
                                {/if}
                            </div>
                            <span class="font-medium">
                                {#if allPairsSelected}
                                    {t?.pages?.settings?.coins?.unmarkAll}
                                {:else}
                                    {t?.pages?.settings?.coins?.markAll}
                                {/if}
                            </span>
                        </button>
                    </div>

                    <!-- Trading Pairs Grid -->
                    {#if loadingPairs}
                        <div class="py-8">
                            <Loading />
                        </div>
                    {:else if filteredPairs.length > 0}
                        <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                            {#each filteredPairs as pair, i (pair.id)}
                                <button 
                                    class="relative flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer {selectedPairs[tradingPairs.indexOf(pair)] ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent' : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'}"
                                    on:click={() => togglePair(tradingPairs.indexOf(pair))}
                                    type="button"
                                >
                                    <div class="flex flex-col gap-0.5 min-w-0">
                                        <div class="flex items-center gap-2 overflow-hidden">
                                            <h3 class="font-medium text-neutral-200 truncate">{pair.symbol}</h3>
                                            <span class="text-sm font-medium text-neutral-300 whitespace-nowrap">$ {formatPrice(pair.price_current)}</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <span class="text-sm text-neutral-300 truncate">{pair.asset}</span>
                                            <span class="text-xs text-neutral-400 whitespace-nowrap">{t?.pages?.settings?.coins?.volume.replace('${value}', formatVolume(pair.real_volume_24h))}</span>
                                        </div>
                                    </div>
                                    <div class="w-4 h-4 ml-2 rounded-full border transition-colors flex-shrink-0 flex items-center justify-center {selectedPairs[tradingPairs.indexOf(pair)] ? 'border-emerald-500 bg-emerald-500' : 'border-neutral-700'}">
                                        {#if selectedPairs[tradingPairs.indexOf(pair)]}
                                            <Check class="w-2 h-2 text-neutral-900" />
                                        {/if}
                                    </div>
                                </button>
                            {/each}
                        </div>

                        <!-- Informações sobre a busca -->
                        {#if searchQuery.trim() !== ''}
                            <div class="mt-4 p-3 bg-neutral-800/30 rounded-lg border border-neutral-800">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                        <span class="text-sm text-neutral-300">
                                            Resultados para "<span class="text-emerald-400">{searchQuery}</span>"
                                        </span>
                                    </div>
                                    <span class="text-xs text-neutral-400">
                                        {totalItems} {totalItems === 1 ? 'resultado' : 'resultados'} encontrados
                                    </span>
                                </div>
                            </div>
                        {/if}

                        <!-- Paginação -->
                        {#if totalPages > 1}
                            <Pagination 
                                {currentPage} 
                                {totalPages} 
                                onPageChange={handlePageChange} 
                            />
                        {/if}
                    {:else}
                        <div class="py-8 text-center">
                            {#if searchQuery.trim() !== ''}
                                <div class="flex flex-col items-center gap-3">
                                    <div class="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-neutral-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                    </div>
                                    <div class="text-neutral-300 font-medium">Nenhum resultado encontrado para "{searchQuery}"</div>
                                    <p class="text-sm text-neutral-400">Tente buscar por outro símbolo ou nome de criptomoeda</p>
                                    <button 
                                        class="mt-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-sm transition-colors"
                                        on:click={() => {
                                            searchQuery = '';
                                            prevSearchQuery = '';
                                            currentPage = 1;
                                            fetchTradingPairs();
                                        }}
                                    >
                                        Limpar busca
                                    </button>
                                </div>
                            {:else}
                                <div class="text-neutral-400">
                                    {t?.pages?.settings?.coins?.noCoins}
                                </div>
                            {/if}
                        </div>
                    {/if}
                </div>
            </Card>
        {/if}
    </div>
</div> 