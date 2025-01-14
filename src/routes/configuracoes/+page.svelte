<script lang="ts">
    import { onMount } from 'svelte';
    import { Settings, Check, ChevronDown } from 'lucide-svelte';
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';
    import { auth } from '$lib/stores/auth';
    import { getExchanges } from '$lib/services/exchange';
    import PageHeader from '../../components/forms/PageHeader.svelte';
    import Card from '../../components/forms/Card.svelte';
    import Button from '../../components/forms/Button.svelte';
    import Loading from '../../components/Loading.svelte';
    import FormField from '../../components/forms/FormField.svelte';
    import Portal from '../../components/Portal.svelte';

    interface Exchange {
        id: string;
        name: string;
        is_preferred: boolean;
        description?: string;
    }

    interface TradingPair {
        symbol: string;
        price: string;
        change24h: string;
        is_selected: boolean;
        exchange: string;
    }

    $: t = translations[$language];

    let exchanges: Exchange[] = [];
    let loading = true;
    let selectedExchanges: boolean[] = [];
    let loadingPairs = false;
    let selectedExchangeForPairs: Exchange | null = null;
    let showExchangeDropdown = false;
    let tradingPairs: TradingPair[] = [];
    let selectedPairs: boolean[] = [];
    let minSpread = "0.5";
    let maxSpread = "5.0";
    let dropdownTrigger: HTMLElement;
    let searchQuery = "";

    // Filtra os pares baseado na pesquisa
    $: filteredPairs = tradingPairs.filter(pair => 
        pair.symbol.toLowerCase().includes(searchQuery.toLowerCase())
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

    onMount(async () => {
        if ($auth.token) {
            try {
                exchanges = await getExchanges($auth.token);
                selectedExchanges = exchanges.map(e => e.is_preferred);
            } catch (error) {
                console.error('Failed to fetch exchanges:', error);
            } finally {
                loading = false;
            }
        }
    });

    async function loadTradingPairs(exchange: Exchange) {
        if (!$auth.token || !exchange) return;
        
        loadingPairs = true;
        selectedExchangeForPairs = exchange;
        
        try {
            // Dados mockados diferentes para cada exchange
            switch (exchange.name.toLowerCase()) {
                case 'binance':
                    tradingPairs = [
                        { symbol: 'BTC/USDT', price: '43,250.00', change24h: '+2.5%', is_selected: true, exchange: exchange.name },
                        { symbol: 'ETH/USDT', price: '2,250.00', change24h: '+3.2%', is_selected: true, exchange: exchange.name },
                        { symbol: 'SOL/USDT', price: '98.50', change24h: '+5.8%', is_selected: true, exchange: exchange.name },
                        { symbol: 'BNB/USDT', price: '315.20', change24h: '+1.2%', is_selected: false, exchange: exchange.name }
                    ];
                    break;
                case 'kucoin':
                    tradingPairs = [
                        { symbol: 'BTC/USDC', price: '43,180.00', change24h: '+2.3%', is_selected: true, exchange: exchange.name },
                        { symbol: 'ETH/USDC', price: '2,248.00', change24h: '+3.0%', is_selected: true, exchange: exchange.name },
                        { symbol: 'KCS/USDC', price: '8.75', change24h: '-1.2%', is_selected: false, exchange: exchange.name },
                        { symbol: 'MATIC/USDC', price: '0.8950', change24h: '+4.2%', is_selected: false, exchange: exchange.name }
                    ];
                    break;
                case 'kraken':
                    tradingPairs = [
                        { symbol: 'BTC/EUR', price: '39,850.00', change24h: '+2.1%', is_selected: true, exchange: exchange.name },
                        { symbol: 'ETH/EUR', price: '2,075.00', change24h: '+2.8%', is_selected: true, exchange: exchange.name },
                        { symbol: 'DOT/EUR', price: '6.32', change24h: '-0.5%', is_selected: false, exchange: exchange.name },
                        { symbol: 'ADA/EUR', price: '0.4520', change24h: '+0.8%', is_selected: false, exchange: exchange.name }
                    ];
                    break;
                case 'okx':
                    tradingPairs = [
                        { symbol: 'BTC/USDT', price: '43,220.00', change24h: '+2.4%', is_selected: true, exchange: exchange.name },
                        { symbol: 'ETH/USDT', price: '2,252.00', change24h: '+3.1%', is_selected: true, exchange: exchange.name },
                        { symbol: 'OKB/USDT', price: '45.80', change24h: '+0.9%', is_selected: false, exchange: exchange.name },
                        { symbol: 'DOGE/USDT', price: '0.0828', change24h: '+1.8%', is_selected: false, exchange: exchange.name }
                    ];
                    break;
                case 'bybit':
                    tradingPairs = [
                        { symbol: 'BTC/USDT', price: '43,210.00', change24h: '+2.4%', is_selected: true, exchange: exchange.name },
                        { symbol: 'ETH/USDT', price: '2,251.00', change24h: '+3.1%', is_selected: true, exchange: exchange.name },
                        { symbol: 'XRP/USDT', price: '0.5425', change24h: '-0.6%', is_selected: false, exchange: exchange.name },
                        { symbol: 'ARB/USDT', price: '1.45', change24h: '+2.8%', is_selected: false, exchange: exchange.name }
                    ];
                    break;
                default:
                    tradingPairs = [
                        { symbol: 'BTC/USDT', price: '43,200.00', change24h: '+2.4%', is_selected: true, exchange: exchange.name },
                        { symbol: 'ETH/USDT', price: '2,249.00', change24h: '+3.1%', is_selected: true, exchange: exchange.name }
                    ];
            }
            selectedPairs = tradingPairs.map(p => p.is_selected);
        } catch (error) {
            console.error('Failed to fetch trading pairs:', error);
            tradingPairs = [];
            selectedPairs = [];
        } finally {
            loadingPairs = false;
        }
    }

    function toggleExchange(index: number): void {
        selectedExchanges[index] = !selectedExchanges[index];
        selectedExchanges = [...selectedExchanges];
    }

    function togglePair(index: number): void {
        selectedPairs[index] = !selectedPairs[index];
        selectedPairs = [...selectedPairs];
    }

    // Computa o estado dos pares selecionados
    $: allPairsSelected = selectedPairs.length > 0 && selectedPairs.every(Boolean);
    $: somePairsSelected = selectedPairs.some(Boolean);
    $: noPairsSelected = selectedPairs.length > 0 && !selectedPairs.some(Boolean);

    function toggleAllPairs(): void {
        selectedPairs = tradingPairs.map(() => !allPairsSelected);
    }

    function saveSettings(): void {
        const settings = {
            exchanges: exchanges
                .filter((_, i) => selectedExchanges[i])
                .map(e => e.name),
            tradingPairs: tradingPairs
                .filter((_, i) => selectedPairs[i])
                .map(p => p.symbol),
            spread: {
                min: parseFloat(minSpread),
                max: parseFloat(maxSpread)
            }
        };
        console.log('Configurações salvas:', settings);
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
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {#each exchanges as exchange, i}
                        <div 
                            class="relative flex flex-col p-4 rounded-xl border transition-colors cursor-pointer {selectedExchanges[i] ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent' : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'}"
                            on:click={() => toggleExchange(i)}
                            on:keydown={(e) => e.key === 'Enter' && toggleExchange(i)}
                            role="button"
                            tabindex="0"
                        >
                            <!-- Header -->
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex items-center space-x-3">
                                    <div class="text-2xl">{getExchangeIcon(exchange.name)}</div>
                                    <div>
                                        <h3 class="text-lg font-bold text-neutral-200">{exchange.name}</h3>
                                        <p class="text-sm text-neutral-400">{exchange.description || t?.pages?.settings?.exchanges?.defaultDescription || 'Exchange de criptomoedas'}</p>
                                    </div>
                                </div>
                                <div class="flex-shrink-0">
                                    <div class="w-5 h-5 rounded-full border transition-colors flex items-center justify-center {selectedExchanges[i] ? 'border-emerald-500 bg-emerald-500' : 'border-neutral-700'}">
                                        {#if selectedExchanges[i]}
                                            <Check class="w-3 h-3 text-neutral-900" />
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </Card>

            <Card title="Pares de Trading">
                <div class="space-y-4">
                    <!-- Exchange Selector Button -->
                    <div class="relative">
                        <button
                            bind:this={dropdownTrigger}
                            class="w-full sm:w-auto px-4 py-2 rounded-lg border border-neutral-800 bg-neutral-900 hover:border-neutral-700 transition-colors flex items-center justify-between gap-2"
                            on:click={() => showExchangeDropdown = !showExchangeDropdown}
                        >
                            <div class="flex items-center gap-2">
                                {#if selectedExchangeForPairs}
                                    <div class="text-xl">{getExchangeIcon(selectedExchangeForPairs.name)}</div>
                                    <span class="font-medium text-neutral-200">{selectedExchangeForPairs.name}</span>
                                {:else}
                                    <span class="text-neutral-400">Selecione uma exchange</span>
                                {/if}
                            </div>
                            <ChevronDown class="w-4 h-4 text-neutral-400" />
                        </button>

                        {#if showExchangeDropdown}
                            <Portal>
                                <div 
                                    class="fixed inset-0" 
                                    role="button" 
                                    tabindex="0" 
                                    on:click={() => showExchangeDropdown = false}
                                    on:keydown={(e) => e.key === 'Enter' && (showExchangeDropdown = false)}
                                ></div>
                                {#if dropdownTrigger}
                                    <div 
                                        class="fixed sm:absolute py-1 rounded-lg border border-neutral-800 bg-neutral-900 shadow-2xl shadow-black/50"
                                        style="
                                            z-index: 9999;
                                            min-width: {dropdownTrigger.offsetWidth}px;
                                            top: {dropdownTrigger.getBoundingClientRect().bottom + 4}px;
                                            left: {dropdownTrigger.getBoundingClientRect().left}px;
                                        "
                                    >
                                        {#each exchanges as exchange}
                                            <button
                                                class="w-full px-4 py-2 flex items-center gap-2 hover:bg-neutral-800 transition-colors"
                                                on:click={() => {
                                                    selectedExchangeForPairs = exchange;
                                                    showExchangeDropdown = false;
                                                    loadTradingPairs(exchange);
                                                    searchQuery = ""; // Limpa a pesquisa ao trocar de exchange
                                                }}
                                            >
                                                <div class="text-xl">{getExchangeIcon(exchange.name)}</div>
                                                <span class="font-medium text-neutral-200">{exchange.name}</span>
                                            </button>
                                        {/each}
                                    </div>
                                {/if}
                            </Portal>
                        {/if}
                    </div>

                    {#if selectedExchangeForPairs}
                        <!-- Search and Select All -->
                        <div class="flex flex-col sm:flex-row gap-2 sm:items-center">
                            <input
                                type="text"
                                bind:value={searchQuery}
                                placeholder="Pesquisar par..."
                                class="flex-1 px-4 py-2 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 placeholder-neutral-400 focus:outline-none focus:border-emerald-500/50"
                            />
                            <button
                                class="px-4 py-2 rounded-lg border transition-colors text-neutral-200 flex items-center gap-2 {allPairsSelected ? 'border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20' : noPairsSelected ? 'border-neutral-800 bg-neutral-900 hover:border-neutral-700' : 'border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20'}"
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
                                        Desmarcar todos
                                    {:else if somePairsSelected}
                                        Marcar todos
                                    {:else}
                                        Marcar todos
                                    {/if}
                                </span>
                            </button>
                        </div>
                    {/if}

                    <!-- Trading Pairs Grid -->
                    {#if loadingPairs}
                        <div class="py-8">
                            <Loading />
                        </div>
                    {:else if selectedExchangeForPairs && filteredPairs.length > 0}
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {#each filteredPairs as pair, i}
                                <div 
                                    class="relative flex flex-col p-3 rounded-lg border transition-colors cursor-pointer {selectedPairs[tradingPairs.indexOf(pair)] ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent' : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'}"
                                    on:click={() => togglePair(tradingPairs.indexOf(pair))}
                                    on:keydown={(e) => e.key === 'Enter' && togglePair(tradingPairs.indexOf(pair))}
                                    role="button"
                                    tabindex="0"
                                >
                                    <div class="flex items-center justify-between mb-2">
                                        <h3 class="font-medium text-neutral-200">{pair.symbol}</h3>
                                        <div class="w-4 h-4 rounded-full border transition-colors flex items-center justify-center {selectedPairs[tradingPairs.indexOf(pair)] ? 'border-emerald-500 bg-emerald-500' : 'border-neutral-700'}">
                                            {#if selectedPairs[tradingPairs.indexOf(pair)]}
                                                <Check class="w-2 h-2 text-neutral-900" />
                                            {/if}
                                        </div>
                                    </div>
                                    <div class="flex items-baseline justify-between">
                                        <span class="text-sm text-neutral-400">${pair.price}</span>
                                        <span class="text-xs {pair.change24h.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}">{pair.change24h}</span>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {:else if selectedExchangeForPairs}
                        <div class="py-8 text-center text-neutral-400">
                            {searchQuery ? 'Nenhum par encontrado para sua pesquisa.' : 'Nenhum par de trading disponível para esta exchange.'}
                        </div>
                    {:else}
                        <div class="py-8 text-center text-neutral-400">
                            Selecione uma exchange para configurar seus pares de trading.
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
                        step="0.1"
                    />
                    <FormField
                        type="number"
                        name="maxSpread"
                        label="Spread Máximo (%)"
                        bind:value={maxSpread}
                        min="0"
                        step="0.1"
                    />
                </div>
                <p class="mt-2 text-sm text-neutral-400">
                    Apenas oportunidades com spread entre {minSpread}% e {maxSpread}% serão exibidas.
                </p>
            </Card>

            <div class="flex justify-end">
                <Button 
                    type="button"
                    label={t?.pages?.settings?.saveButton || 'Salvar configurações'}
                    on:click={saveSettings}
                />
            </div>
        {/if}
    </div>
</div> 