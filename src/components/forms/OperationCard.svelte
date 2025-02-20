<script>
    import { ArrowRight, X } from 'lucide-svelte';
    import { translations } from '$lib/i18n/translations';
    import { language } from '$lib/stores/i18n';

    export let operation;
    export let formatNumber;
    export let formatCurrency;

    let showDetails = false;

    $: t = translations[$language];

    function handleKeydown(event) {
        if (event.key === 'Escape') {
            showDetails = false;
        }
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="bg-neutral-800/50 rounded-lg border border-neutral-700/50 overflow-hidden">
    <div class="p-3">
        <!-- Header -->
        <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-1.5">
                <a href={operation.exchange_a_url} target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-neutral-200 hover:text-emerald-400">{operation.exchange_a}</a>
                <ArrowRight class="w-4 h-4 text-neutral-500" />
                <a href={operation.exchange_b_url} target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-neutral-200 hover:text-emerald-400">{operation.exchange_b}</a>
                <span class="text-xs text-neutral-500">(Futures)</span>
            </div>
            <div class="flex items-baseline gap-1">
                <span class="text-base font-medium text-emerald-500">{operation.profit}%</span>
                <span class="text-xs text-emerald-500/70">Lucro</span>
            </div>
        </div>

        <!-- Basic Info -->
        <div class="space-y-1">
            <div>
                <div class="text-xs text-neutral-400">Par</div>
                <div class="text-xs text-neutral-200">{operation.pair}</div>
            </div>
            <div>
                <div class="text-xs text-neutral-400">Spread</div>
                <div class="text-xs text-neutral-200">1.0000%</div>
            </div>
            <div>
                <div class="text-xs text-neutral-400">Taxa de Financiamento</div>
                <div class="text-xs {parseFloat(operation.funding_fee) >= 0 ? 'text-emerald-400' : 'text-red-400'}">{formatNumber(operation.funding_fee, 6)}%</div>
            </div>
            <div>
                <div class="text-xs text-neutral-400">Total/Stake</div>
                <div class="text-xs text-neutral-200">{formatCurrency(operation.entry_total)} USDT</div>
            </div>
        </div>

        <!-- Toggle Details Button -->
        <button 
            class="w-full mt-3 px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-200 bg-neutral-900/50 hover:bg-neutral-900 rounded transition-colors"
            on:click={() => showDetails = true}
        >
            Ver Detalhes
        </button>
    </div>
</div>

{#if showDetails}
    <div 
        class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 w-full h-full" 
        on:click={() => showDetails = false}
        on:keydown={(e) => e.key === 'Enter' && (showDetails = false)}
        role="presentation"
        tabindex="0"
    >
        <div 
            class="fixed inset-0 overflow-y-auto"
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
        >
            <div class="flex min-h-full items-center justify-center p-4">
                <article 
                    class="w-full max-w-[600px] bg-neutral-900 rounded-lg shadow-xl"
                    on:click|stopPropagation
                    role="document"
                >
                    <header class="flex items-center justify-between p-4 border-b border-neutral-800">
                        <h3 id="modal-title" class="text-lg font-medium text-neutral-200">Detalhes da Operação</h3>
                        <button 
                            type="button"
                            class="text-neutral-400 hover:text-neutral-200"
                            on:click={() => showDetails = false}
                            aria-label="Fechar detalhes"
                        >
                            <X class="w-5 h-5" />
                        </button>
                    </header>

                    <div class="p-4 space-y-4">
                        <section class="bg-neutral-800/50 rounded p-3">
                            <h4 class="text-base font-medium text-neutral-200 mb-3">Entrada</h4>
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr>
                                            <th class="text-right py-2 px-3 text-sm font-medium text-neutral-400">Dados</th>
                                            <th class="text-left py-2 px-3 text-sm font-medium text-neutral-400">KuCoin</th>
                                            <th class="text-left py-2 px-3 text-sm font-medium text-neutral-400">Bitget (Futures)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="py-2 px-3 text-sm text-neutral-400 text-right">Preço</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">65,000.00000000 USDT</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">65,000.00000000 USDT</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 px-3 text-sm text-neutral-400 text-right">Quantidade</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">0.15000000</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">0.15000000</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 px-3 text-sm text-neutral-400 text-right">Total/Stake</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">9,750.00 USDT</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">9,750.00 USDT</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section class="bg-neutral-800/50 rounded p-3">
                            <h4 class="text-base font-medium text-neutral-200 mb-3">Fechamento</h4>
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr>
                                            <th class="text-right py-2 px-3 text-sm font-medium text-neutral-400">Dados</th>
                                            <th class="text-left py-2 px-3 text-sm font-medium text-neutral-400">{operation.exchange_a}</th>
                                            <th class="text-left py-2 px-3 text-sm font-medium text-neutral-400">{operation.exchange_b} (Futures)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="py-2 px-3 text-sm text-neutral-400 text-right">Preço</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">65,500.00000000 USDT</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">65,500.00000000 USDT</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 px-3 text-sm text-neutral-400 text-right">Quantidade</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">0.15000000</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">0.15000000</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 px-3 text-sm text-neutral-400 text-right">Total/Stake</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">9,825.00 USDT</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">9,825.00 USDT</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section class="bg-neutral-800/50 rounded p-3">
                            <h4 class="text-base font-medium text-neutral-200 mb-3">Taxas</h4>
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-neutral-400">{operation.exchange_a}:</span>
                                    <span class="text-sm text-neutral-200">{formatNumber(operation.spot_fee, 4)}%</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-neutral-400">{operation.exchange_b} (Futures):</span>
                                    <span class="text-sm text-neutral-200">{formatNumber(operation.futures_fee, 4)}%</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-neutral-400">Taxa de Financiamento:</span>
                                    <span class="text-sm {parseFloat(operation.funding_fee) >= 0 ? 'text-emerald-400' : 'text-red-400'}">{formatNumber(operation.funding_fee, 6)}%</span>
                                </div>
                            </div>
                        </section>

                        <section class="bg-neutral-800/50 rounded p-3">
                            <h4 class="text-base font-medium text-neutral-200 mb-3">Resultados</h4>
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-neutral-400">Spread:</span>
                                    <span class="text-sm text-neutral-200">1.0000%</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-neutral-400">Lucro Previsto:</span>
                                    <span class="text-sm text-emerald-400">+{formatCurrency(operation.expected_profit, 2)} USDT ({formatNumber(operation.expected_profit_percentage, 2)}%)</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-neutral-400">Lucro Real:</span>
                                    <span class="text-sm text-emerald-400">+75.00 USDT (0.77%)</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </article>
            </div>
        </div>
    </div>
{/if} 