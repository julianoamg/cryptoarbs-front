<script lang="ts">
    import { onMount } from 'svelte';
    import { Settings, Check } from 'lucide-svelte';
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';
    import { auth } from '$lib/stores/auth';
    import { getExchanges } from '$lib/services/exchange';
    import PageHeader from '../../components/forms/PageHeader.svelte';
    import Card from '../../components/forms/Card.svelte';
    import Button from '../../components/forms/Button.svelte';
    import Loading from '../../components/Loading.svelte';

    interface Exchange {
        id: string;
        name: string;
        is_preferred: boolean;
    }

    $: t = translations[$language];

    let exchanges: Exchange[] = [];
    let loading = true;
    let selectedExchanges: boolean[] = [];

    // Mapeamento de ícones para exchanges
    const exchangeIcons: Record<string, string> = {
        'Binance': '🟡',
        'Mercado Bitcoin': '🔵',
        'KuCoin': '🟢',
        'Foxbit': '🟠',
        'OKX': '⚪',
        'NovaDAX': '🔴'
    };

    // Descrições das exchanges
    const exchangeDescriptions: Record<string, string> = {
        'Binance': t?.pages?.settings?.exchanges?.descriptions?.binance || 'Exchange global com alta liquidez',
        'Mercado Bitcoin': t?.pages?.settings?.exchanges?.descriptions?.mercadoBitcoin || 'Maior exchange brasileira',
        'KuCoin': t?.pages?.settings?.exchanges?.descriptions?.kucoin || 'Exchange com foco em altcoins',
        'Foxbit': t?.pages?.settings?.exchanges?.descriptions?.foxbit || 'Exchange brasileira tradicional',
        'OKX': t?.pages?.settings?.exchanges?.descriptions?.okx || 'Exchange com foco em derivativos',
        'NovaDAX': t?.pages?.settings?.exchanges?.descriptions?.novadax || 'Exchange brasileira com foco em usabilidade'
    };

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

    function toggleExchange(index: number): void {
        selectedExchanges[index] = !selectedExchanges[index];
        selectedExchanges = [...selectedExchanges]; // Força atualização
    }

    function saveSettings(): void {
        // TODO: Implementar salvamento das configurações
        console.log('Exchanges selecionadas:', 
            exchanges
                .filter((_, i) => selectedExchanges[i])
                .map(e => e.name)
        );
    }
</script>

<div class="flex flex-col items-center">
    <div class="w-full max-w-5xl space-y-8">
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
                                    <div class="text-2xl">{exchangeIcons[exchange.name] || '🔵'}</div>
                                    <div>
                                        <h3 class="text-lg font-bold text-neutral-200">{exchange.name}</h3>
                                        <p class="text-sm text-neutral-400">{exchangeDescriptions[exchange.name] || t?.pages?.settings?.exchanges?.defaultDescription || 'Exchange de criptomoedas'}</p>
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

                <div class="mt-8 flex justify-end">
                    <Button 
                        type="button"
                        label={t?.pages?.settings?.saveButton || 'Salvar configurações'}
                        on:click={saveSettings}
                    />
                </div>
            </Card>
        {/if}
    </div>
</div> 