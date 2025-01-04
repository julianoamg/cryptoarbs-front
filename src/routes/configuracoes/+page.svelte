<script>
    import { Settings, Check } from 'lucide-svelte';
    import PageHeader from '../../components/forms/PageHeader.svelte';
    import Card from '../../components/forms/Card.svelte';
    import Button from '../../components/forms/Button.svelte';

    const exchanges = [
        {
            name: 'Binance',
            logo: '🟡',
            description: 'Exchange global com alta liquidez',
            enabled: true,
            features: ['Baixas taxas', 'Alta liquidez', 'Múltiplos pares']
        },
        {
            name: 'Mercado Bitcoin',
            logo: '🔵',
            description: 'Maior exchange brasileira',
            enabled: true,
            features: ['Depósito via PIX', 'Suporte local', 'Real (BRL)']
        },
        {
            name: 'KuCoin',
            logo: '🟢',
            description: 'Exchange com foco em altcoins',
            enabled: false,
            features: ['Grande variedade', 'Baixas taxas', 'Staking']
        },
        {
            name: 'Foxbit',
            logo: '🟠',
            description: 'Exchange brasileira tradicional',
            enabled: false,
            features: ['Suporte 24/7', 'Real (BRL)', 'Interface intuitiva']
        },
        {
            name: 'OKX',
            logo: '⚪',
            description: 'Exchange com foco em derivativos',
            enabled: false,
            features: ['Trading com margem', 'Alta liquidez', 'Baixas taxas']
        },
        {
            name: 'NovaDAX',
            logo: '🔴',
            description: 'Exchange brasileira com foco em usabilidade',
            enabled: false,
            features: ['Depósito via PIX', 'Real (BRL)', 'Suporte local']
        }
    ];

    let selectedExchanges = exchanges.map(e => e.enabled);

    function toggleExchange(index) {
        selectedExchanges[index] = !selectedExchanges[index];
        selectedExchanges = [...selectedExchanges]; // Força atualização
    }

    function saveSettings() {
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
            title="Configurações"
            description="Personalize suas preferências de arbitragem selecionando as exchanges desejadas."
        />

        <Card title="Exchanges">
            <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                                <div class="text-2xl">{exchange.logo}</div>
                                <div>
                                    <h3 class="text-lg font-bold text-neutral-200">{exchange.name}</h3>
                                    <p class="text-sm text-neutral-400">{exchange.description}</p>
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

                        <!-- Features -->
                        <div class="mt-auto">
                            <div class="flex flex-wrap gap-2">
                                {#each exchange.features as feature}
                                    <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium {selectedExchanges[i] ? 'bg-emerald-500/20 text-emerald-300' : 'bg-neutral-800 text-neutral-400'}">
                                        {feature}
                                    </span>
                                {/each}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>

            <div class="mt-8 flex justify-end">
                <Button 
                    type="button"
                    label="Salvar configurações"
                    on:click={saveSettings}
                />
            </div>
        </Card>
    </div>
</div> 