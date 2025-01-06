<script lang="ts">
    import { ArrowRight, TrendingUp, Percent, X, ArrowLeftRight } from 'lucide-svelte';
    import { fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';
    import { auth } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { getOpportunities } from '$lib/services/exchange';
    import PageHeader from '../components/forms/PageHeader.svelte';

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
    }

    $: t = translations[$language];

    let opportunities: ArbitrageOpportunity[] = [];

    onMount(async () => {
        if ($auth.token) {
            try {
                opportunities = await getOpportunities($auth.token);
            } catch (error) {
                console.error('Failed to fetch opportunities:', error);
            }
        }
    });

    // Estado da modal
    let showModal = false;
    let cardToRemove: number | null = null;

    // Função para calcular o lucro baseado no valor de entrada
    function calcularLucro(valorEntrada: number, percentualLucro: string): string {
        const lucro = (valorEntrada * parseFloat(percentualLucro)) / 100;
        return lucro.toFixed(2);
    }

    // Objeto para armazenar os valores de entrada para cada oportunidade
    let valoresEntrada: Record<string, number> = {};

    // Inicializar valores padrão
    $: {
        opportunities.forEach(opp => {
            if (valoresEntrada[opp.id] === undefined) {
                valoresEntrada[opp.id] = 100;
            }
        });
    }

    // Função para remover valor de entrada
    function removerValor(id: string): void {
        if (confirm('Deseja realmente remover o valor de entrada?')) {
            delete valoresEntrada[id];
            valoresEntrada = valoresEntrada;
        }
    }

    // Funções para controlar a modal
    function abrirModal(index: number): void {
        cardToRemove = index;
        showModal = true;
    }

    function fecharModal(): void {
        showModal = false;
        cardToRemove = null;
    }

    // Função para remover o card de oportunidade
    function removerCard(): void {
        if (cardToRemove !== null) {
            const oppToRemove = opportunities[cardToRemove];
            opportunities = opportunities.filter((_, i) => i !== cardToRemove);
            // Remove também o valor de entrada associado
            if (valoresEntrada[oppToRemove.id]) {
                delete valoresEntrada[oppToRemove.id];
                valoresEntrada = valoresEntrada;
            }
            fecharModal();
        }
    }
</script>

<!-- Modal de confirmação -->
{#if showModal}
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
         transition:fade={{ duration: 200 }}
         on:click={fecharModal}
         on:keydown={(e) => e.key === 'Escape' && fecharModal()}
         role="button"
         tabindex="0"
    >
        <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-6 max-w-md w-full shadow-xl"
             transition:fade={{ duration: 150, delay: 50 }}
             on:click|stopPropagation
             on:keydown|stopPropagation
             role="button"
             tabindex="0"
        >
            <div class="flex flex-col items-center text-center space-y-4">
                <div class="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                    <X class="w-6 h-6 text-red-500" />
                </div>
                <h3 class="text-xl font-bold text-neutral-200">Remover oportunidade</h3>
                <p class="text-neutral-400">
                    Tem certeza que deseja remover esta oportunidade de arbitragem? Esta ação não pode ser desfeita.
                </p>
                <div class="flex items-center space-x-3 pt-2">
                    <button
                        class="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-colors"
                        on:click={fecharModal}
                    >
                        Cancelar
                    </button>
                    <button
                        class="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                        on:click={removerCard}
                    >
                        Remover
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}

<div class="w-full max-w-7xl mx-auto space-y-8 p-4">
    <PageHeader 
        title={t.pages.home.title}
        description={t.pages.home.subtitle}
        icon={ArrowLeftRight}
    ></PageHeader>

    <!-- Opportunities List -->
    <div class="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {#each opportunities as opp, index}
            <div class="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-colors relative">
                <button
                    on:click={() => abrirModal(index)}
                    class="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800/40 backdrop-blur-sm text-neutral-300 hover:bg-red-500/30 hover:text-red-400 transition-all duration-200"
                    title={t.pages.home.removeOpportunity}
                    aria-label={t.pages.home.removeOpportunity}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 6l12 12M6 18L18 6" />
                    </svg>
                </button>
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-3">
                            <div class="flex items-center space-x-2">
                                <span class="text-lg font-bold text-neutral-200">{opp.id}</span>
                            </div>
                        </div>
                        <div class="flex items-baseline space-x-1">
                            <span class="text-2xl font-bold text-emerald-500">{opp.profit}%</span>
                            <span class="text-sm text-emerald-500/70">{t.pages.home.profit}</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p class="text-sm font-medium text-neutral-400 mb-1">{t.pages.home.spread}</p>
                            <p class="text-neutral-200">{opp.spread}%</p>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-neutral-400 mb-1">Profit after fees</p>
                            <p class="text-neutral-200">{opp.profit_fee}%</p>
                        </div>
                    </div>

                    <div class="border-t border-neutral-800 pt-4">
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <p class="text-sm font-medium text-neutral-400 mb-2">{opp.exchange_a}</p>
                                <div class="space-y-1">
                                    <div class="flex justify-between">
                                        <span class="text-sm text-neutral-300">{t.pages.home.price}</span>
                                        <span class="text-sm text-neutral-300">{opp.exchange_a_price}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-neutral-400 mb-2">{opp.exchange_b}</p>
                                <div class="space-y-1">
                                    <div class="flex justify-between">
                                        <span class="text-sm text-neutral-300">{t.pages.home.price}</span>
                                        <span class="text-sm text-neutral-300">{opp.exchange_b_price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 pt-4 border-t border-neutral-800">
                            <div class="flex items-center space-x-4">
                                <div class="flex-1 relative">
                                    <label for="valor-{opp.id}" class="text-sm font-medium text-neutral-400">{t.pages.home.entryValue}</label>
                                    <div class="relative">
                                        <input
                                            type="number"
                                            id="valor-{opp.id}"
                                            bind:value={valoresEntrada[opp.id]}
                                            placeholder="100.00"
                                            class="mt-1 w-full bg-neutral-800/50 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                        {#if valoresEntrada[opp.id]}
                                            <button
                                                on:click={() => removerValor(opp.id)}
                                                class="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                                            >
                                                <X class="w-4 h-4" />
                                            </button>
                                        {/if}
                                    </div>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-neutral-400">{t.pages.home.estimatedProfit}</p>
                                    <p class="mt-1 text-lg font-bold text-emerald-500">
                                        {valoresEntrada[opp.id] ? calcularLucro(valoresEntrada[opp.id], opp.profit) : '0.00'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>