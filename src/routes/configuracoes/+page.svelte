<script lang="ts">
    import { onMount } from 'svelte';
    import { Settings, Check } from 'lucide-svelte';
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';
    import { auth } from '$lib/stores/auth';
    import { getExchanges } from '$lib/services/exchange';
    import { getMe } from '$lib/services/user';
    import PageHeader from '../../components/forms/PageHeader.svelte';
    import Card from '../../components/forms/Card.svelte';
    import Button from '../../components/forms/Button.svelte';
    import Loading from '../../components/Loading.svelte';
    import FormField from '../../components/forms/FormField.svelte';
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

    $: t = translations[$language];

    let exchanges: Exchange[] = [];
    let loading = true;
    let selectedExchanges: boolean[] = [];
    let loadingPairs = false;
    let tradingPairs: TradingPair[] = [];
    let selectedPairs: boolean[] = [];
    let minSpread = "";
    let maxSpread = "";
    let searchQuery = "";
    let currentPage = 1;
    let spreadUpdateController: AbortController | null = null;
    let spreadUpdateTimeout: number | null = null;

    // Filtra os pares baseado na pesquisa
    $: filteredPairs = tradingPairs.filter(pair => 
        pair.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pair.asset.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
        try {
            const response = await fetch(`${PUBLIC_API_URL}/exchanges/cryptoassets/?page=${currentPage}`, {
                headers: {
                    'Authorization': `Token ${$auth.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch trading pairs');
            }

            const data = await response.json();
            tradingPairs = data.results;
            selectedPairs = tradingPairs.map(p => p.marked);
        } catch (error) {
            console.error('Failed to fetch trading pairs:', error);
        } finally {
            loadingPairs = false;
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

    function handleSpreadChange() {
        if (spreadUpdateTimeout) {
            clearTimeout(spreadUpdateTimeout);
        }
        
        spreadUpdateTimeout = setTimeout(() => {
            if (minSpread !== undefined && maxSpread !== undefined && minSpread !== "" && maxSpread !== "") {
                updateSpreadPreferences();
            }
        }, 300);
    }

    async function updateSpreadPreferences() {
        if (!$auth.token || !minSpread || !maxSpread) return;

        try {
            const min = Math.max(0, parseFloat(minSpread));
            const max = Math.max(0, parseFloat(maxSpread));

            if (isNaN(min) || isNaN(max)) return;

            const response = await fetch(`${PUBLIC_API_URL}/exchanges/preferences/spread/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${$auth.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    min_spread: min,
                    max_spread: max
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
            <Card title={t?.pages?.settings?.exchanges?.title || 'Selecione suas exchanges favoritas'}>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {#each exchanges as exchange, i}
                        <div 
                            class="relative flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer {selectedExchanges[i] ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent' : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'}"
                            on:click={() => toggleExchange(i)}
                            on:keydown={(e) => e.key === 'Enter' && toggleExchange(i)}
                            role="button"
                            tabindex="0"
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
                        </div>
                    {/each}
                </div>
            </Card>

            <Card title="Moedas">
                <div class="space-y-3">
                    <!-- Search and Select All -->
                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <input
                            type="text"
                            bind:value={searchQuery}
                            placeholder="Pesquisar por símbolo ou nome..."
                            class="flex-1 px-4 py-2 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 placeholder-neutral-400 focus:outline-none focus:border-emerald-500/50"
                        />
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
                                    Desmarcar todas
                                {:else if somePairsSelected}
                                    Marcar todas
                                {:else}
                                    Marcar todas
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
                            {#each filteredPairs as pair, i}
                                <div 
                                    class="relative flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer {selectedPairs[tradingPairs.indexOf(pair)] ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent' : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'}"
                                    on:click={() => togglePair(tradingPairs.indexOf(pair))}
                                    on:keydown={(e) => e.key === 'Enter' && togglePair(tradingPairs.indexOf(pair))}
                                    role="button"
                                    tabindex="0"
                                >
                                    <div class="flex flex-col gap-0.5 min-w-0">
                                        <div class="flex items-center gap-2 overflow-hidden">
                                            <h3 class="font-medium text-neutral-200 truncate">{pair.symbol}</h3>
                                            <span class="text-sm font-medium text-neutral-300 whitespace-nowrap">$ {formatPrice(pair.price_current)}</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <span class="text-sm text-neutral-300 truncate">{pair.asset}</span>
                                            <span class="text-xs text-neutral-400 whitespace-nowrap">Vol: ${formatVolume(pair.real_volume_24h)}</span>
                                        </div>
                                    </div>
                                    <div class="w-4 h-4 ml-2 rounded-full border transition-colors flex-shrink-0 flex items-center justify-center {selectedPairs[tradingPairs.indexOf(pair)] ? 'border-emerald-500 bg-emerald-500' : 'border-neutral-700'}">
                                        {#if selectedPairs[tradingPairs.indexOf(pair)]}
                                            <Check class="w-2 h-2 text-neutral-900" />
                                        {/if}
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <div class="py-8 text-center text-neutral-400">
                            {searchQuery ? 'Nenhuma moeda encontrada para sua pesquisa.' : 'Nenhuma moeda disponível.'}
                        </div>
                    {/if}
                </div>
            </Card>

            <Card title="Filtro de Spread">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        type="number"
                        name="minSpread"
                        label="Spread Mínimo (%)"
                        bind:value={minSpread}
                        min="0"
                        max="100"
                        step="0.1"
                        onkeypress="return event.charCode >= 48"
                        on:change={updateSpreadPreferences}
                    />
                    <FormField
                        type="number"
                        name="maxSpread"
                        label="Spread Máximo (%)"
                        bind:value={maxSpread}
                        min="0"
                        max="100"
                        step="0.1"
                        onkeypress="return event.charCode >= 48"
                        on:change={updateSpreadPreferences}
                    />
                </div>
                <p class="mt-2 text-sm text-neutral-300">
                    Apenas oportunidades com spread entre {minSpread}% e {maxSpread}% serão exibidas.
                </p>
            </Card>
        {/if}
    </div>
</div> 