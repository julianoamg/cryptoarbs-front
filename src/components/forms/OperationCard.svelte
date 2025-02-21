<script lang="ts">
    import { ArrowRight, X } from 'lucide-svelte';
    import { language } from '$lib/stores/i18n';
    import type { Translation, Language } from '$lib/i18n/types';
    import { translations } from '$lib/i18n/translations';
    import type { UserOpportunity } from '$lib/services/exchange';

    export let operation: UserOpportunity;
    export let formatNumber: (value: string | number, decimals?: number) => string;
    export let formatCurrency: (value: string | number, decimals?: number) => string;

    let showDetails = false;

    $: t = translations[$language as Language] as Translation;

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            showDetails = false;
        }
    }

    function formatDate(dateString: string): string {
        return new Date(dateString).toLocaleString();
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="bg-neutral-800/50 rounded p-3 border border-neutral-700/50">
    <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-neutral-200">{operation.symbol}</span>
            <span class="text-xs text-neutral-400">{formatDate(operation.created)}</span>
        </div>
        <div class="flex items-center gap-2">
            <span class="text-xs px-2 py-1 rounded-full {operation.status === 'STARTED' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}">
                {operation.status === 'STARTED' ? 'Aberta' : 'Fechada'}
            </span>
        </div>
    </div>

    <div class="mt-2 space-y-1">
        <div class="flex items-center justify-between">
            <span class="text-xs text-neutral-400">Exchanges</span>
            <span class="text-xs text-neutral-200">{operation.exchange_a_name} → {operation.exchange_b_name} Futuros</span>
        </div>

        <div class="flex items-center justify-between">
            <span class="text-xs text-neutral-400">Stake</span>
            <span class="text-xs text-neutral-200">
                {formatCurrency(
                    (parseFloat(operation.exchange_a_open_price) * parseFloat(operation.exchange_a_open_qty)) +
                    (parseFloat(operation.exchange_b_open_price) * parseFloat(operation.exchange_b_open_qty)) +
                    (parseFloat(operation.exchange_a_entrance_fee || '0')) +
                    (parseFloat(operation.exchange_b_entrance_fee || '0'))
                )} USDT
            </span>
        </div>

        <div class="flex items-center justify-between">
            <span class="text-xs text-neutral-400">Lucro</span>
            <span class="text-xs {parseFloat(operation.profit_value) >= 0 ? 'text-emerald-400' : 'text-red-400'}">
                {parseFloat(operation.profit_value) >= 0 ? '+' : ''}{formatCurrency(operation.profit_value)} USDT
            </span>
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
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
    >
        <!-- Overlay para fechar o modal -->
        <button
            type="button"
            class="fixed inset-0 w-full h-full cursor-default focus:outline-none"
            on:click={() => showDetails = false}
            on:keydown={e => e.key === 'Escape' && (showDetails = false)}
            aria-label="Fechar modal"
        ></button>

        <div class="fixed inset-0 overflow-y-auto pointer-events-none">
            <div class="flex min-h-full items-center justify-center p-4">
                <div 
                    class="relative w-full max-w-[600px] bg-neutral-900 rounded-lg shadow-xl pointer-events-auto"
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
                                            <th class="text-left py-2 px-3 text-sm font-medium text-neutral-400">{operation.exchange_a_name}</th>
                                            <th class="text-left py-2 px-3 text-sm font-medium text-neutral-400">{operation.exchange_b_name} Futuros</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="py-2 px-3 text-sm text-neutral-400 text-right">ID da Ordem</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">{operation.exchange_a_order_id}</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">{operation.exchange_b_order_id}</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 px-3 text-sm text-neutral-400 text-right">Preço</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">{formatNumber(operation.exchange_a_open_price, 8)} USDT</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">{formatNumber(operation.exchange_b_open_price, 8)} USDT</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 px-3 text-sm text-neutral-400 text-right">Quantidade</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">{formatNumber(operation.exchange_a_open_qty, 8)}</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">{formatNumber(operation.exchange_b_open_qty, 8)}</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 px-3 text-sm text-neutral-400 text-right">Total</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">
                                                {formatNumber(parseFloat(operation.exchange_a_open_price) * parseFloat(operation.exchange_a_open_qty), 8)} USDT
                                            </td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">
                                                {formatNumber(parseFloat(operation.exchange_b_open_price) * parseFloat(operation.exchange_b_open_qty), 8)} USDT
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 px-3 text-sm text-neutral-400 text-right">Taxa de Entrada</td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">
                                                {formatNumber(parseFloat(operation.exchange_a_entrance_fee || '0'), 8)} USDT
                                            </td>
                                            <td class="py-2 px-3 text-sm text-neutral-200">
                                                {formatNumber(parseFloat(operation.exchange_b_entrance_fee || '0'), 8)} USDT
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <!-- Seção de Fechamento -->
                        {#if operation.status === 'FINISHED' || operation.exchange_a_close_order_id || operation.exchange_b_close_order_id}
                            <section class="bg-neutral-800/50 rounded p-3">
                                <h4 class="text-base font-medium text-neutral-200 mb-3">Fechamento</h4>
                                <div class="overflow-x-auto">
                                    <table class="w-full">
                                        <thead>
                                            <tr>
                                                <th class="text-right py-2 px-3 text-sm font-medium text-neutral-400">Dados</th>
                                                <th class="text-left py-2 px-3 text-sm font-medium text-neutral-400">{operation.exchange_a_name}</th>
                                                <th class="text-left py-2 px-3 text-sm font-medium text-neutral-400">{operation.exchange_b_name} Futuros</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="py-2 px-3 text-sm text-neutral-400 text-right">ID da Ordem</td>
                                                <td class="py-2 px-3 text-sm text-neutral-200">{operation.exchange_a_close_order_id || '-'}</td>
                                                <td class="py-2 px-3 text-sm text-neutral-200">{operation.exchange_b_close_order_id || '-'}</td>
                                            </tr>
                                            <tr>
                                                <td class="py-2 px-3 text-sm text-neutral-400 text-right">Preço</td>
                                                <td class="py-2 px-3 text-sm text-neutral-200">{operation.exchange_a_close_price ? formatNumber(operation.exchange_a_close_price, 8) + ' USDT' : '-'}</td>
                                                <td class="py-2 px-3 text-sm text-neutral-200">{operation.exchange_b_close_price ? formatNumber(operation.exchange_b_close_price, 8) + ' USDT' : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td class="py-2 px-3 text-sm text-neutral-400 text-right">Quantidade</td>
                                                <td class="py-2 px-3 text-sm text-neutral-200">{operation.exchange_a_close_qty ? formatNumber(operation.exchange_a_close_qty, 8) : '-'}</td>
                                                <td class="py-2 px-3 text-sm text-neutral-200">{operation.exchange_b_close_qty ? formatNumber(operation.exchange_b_close_qty, 8) : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td class="py-2 px-3 text-sm text-neutral-400 text-right">Total</td>
                                                <td class="py-2 px-3 text-sm text-neutral-200">
                                                    {operation.exchange_a_close_price && operation.exchange_a_close_qty ? 
                                                        formatNumber(parseFloat(operation.exchange_a_close_price) * parseFloat(operation.exchange_a_close_qty), 8) + ' USDT' : 
                                                        '-'}
                                                </td>
                                                <td class="py-2 px-3 text-sm text-neutral-200">
                                                    {operation.exchange_b_close_price && operation.exchange_b_close_qty ? 
                                                        formatNumber(parseFloat(operation.exchange_b_close_price) * parseFloat(operation.exchange_b_close_qty), 8) + ' USDT' : 
                                                        '-'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="py-2 px-3 text-sm text-neutral-400 text-right">Taxa de Fechamento</td>
                                                <td class="py-2 px-3 text-sm text-neutral-200">
                                                    {formatNumber(parseFloat(operation.exchange_a_close_fee || '0'), 8)} USDT
                                                </td>
                                                <td class="py-2 px-3 text-sm text-neutral-200">
                                                    {formatNumber(parseFloat(operation.exchange_b_close_fee || '0'), 8)} USDT
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        {/if}

                        <section class="bg-neutral-800/50 rounded p-3">
                            <h4 class="text-base font-medium text-neutral-200 mb-3">Resultados</h4>
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-neutral-400">Stake:</span>
                                    <span class="text-sm text-neutral-200">
                                        {formatCurrency(
                                            (parseFloat(operation.exchange_a_open_price) * parseFloat(operation.exchange_a_open_qty)) +
                                            (parseFloat(operation.exchange_b_open_price) * parseFloat(operation.exchange_b_open_qty)) +
                                            (parseFloat(operation.exchange_a_entrance_fee || '0')) +
                                            (parseFloat(operation.exchange_b_entrance_fee || '0'))
                                        )} USDT
                                    </span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-neutral-400">Lucro:</span>
                                    <span class="text-sm {parseFloat(operation.profit_value) >= 0 ? 'text-emerald-400' : 'text-red-400'}">
                                        {parseFloat(operation.profit_value) >= 0 ? '+' : ''}{formatCurrency(operation.profit_value)} USDT
                                    </span>
                                </div>
                            </div>
                        </section>

                        {#if operation.log}
                            <section class="bg-neutral-800/50 rounded p-3">
                                <h4 class="text-base font-medium text-neutral-200 mb-3">Log da Operação</h4>
                                <pre class="text-xs text-neutral-300 whitespace-pre-wrap">{operation.log}</pre>
                            </section>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if} 