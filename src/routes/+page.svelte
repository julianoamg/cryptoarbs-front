<script lang="ts">
    import { ArrowRight, TrendingUp, Percent, X } from 'lucide-svelte';
    import { fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    interface Exchange {
        nome: string;
        preco: string;
    }

    interface Opportunity {
        ativo: string;
        exchangeA: Exchange;
        exchangeB: Exchange;
        lucro: string;
        spread: string;
        volume24h: string;
    }

    let opportunities: Opportunity[] = [
        {
            ativo: 'LL-USDT',
            exchangeA: {
                nome: 'Mexc',
                preco: '0.04529'
            },
            exchangeB: {
                nome: 'Mexc (Futuros)',
                preco: '0.0454'
            },
            lucro: '0.74',
            spread: '0.738',
            volume24h: '2.5M'
        },
        {
            ativo: 'ARCA-USDT',
            exchangeA: {
                nome: 'Kucoin',
                preco: '0.02503'
            },
            exchangeB: {
                nome: 'Mexc (Futuros)',
                preco: '0.02515'
            },
            lucro: '0.71',
            spread: '0.7852',
            volume24h: '1.8M'
        },
        {
            ativo: 'ARCA-USDT',
            exchangeA: {
                nome: 'Bitget',
                preco: '0.02506'
            },
            exchangeB: {
                nome: 'Mexc (Futuros)',
                preco: '0.02515'
            },
            lucro: '0.61',
            spread: '0.6074',
            volume24h: '1.2M'
        },
        {
            ativo: 'HYPE-USDT',
            exchangeA: {
                nome: 'Kucoin',
                preco: '23.541'
            },
            exchangeB: {
                nome: 'Mexc (Futuros)',
                preco: '23.48'
            },
            lucro: '0.6',
            spread: '0.5978',
            volume24h: '4.1M'
        }
    ];

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
            if (valoresEntrada[opp.ativo] === undefined) {
                valoresEntrada[opp.ativo] = 100;
            }
        });
    }

    // Função para remover valor de entrada
    function removerValor(ativo: string): void {
        if (confirm('Deseja realmente remover o valor de entrada?')) {
            delete valoresEntrada[ativo];
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
            const ativoToRemove = opportunities[cardToRemove].ativo;
            opportunities = opportunities.filter((_, i) => i !== cardToRemove);
            // Remove também o valor de entrada associado
            if (valoresEntrada[ativoToRemove]) {
                delete valoresEntrada[ativoToRemove];
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
    >
        <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-6 max-w-md w-full shadow-xl"
             transition:fade={{ duration: 150, delay: 50 }}
             on:click|stopPropagation
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
    <!-- Header -->
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-bold text-neutral-200 tracking-tight">
                Arbitragem de Futuros
            </h1>
            <p class="mt-2 text-neutral-400">
                Esta página é atualizada automaticamente.
            </p>
        </div>
        <div class="flex items-center space-x-2 text-sm">
            <div class="flex items-center space-x-1 text-emerald-500">
                <span class="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span class="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style="animation-delay: 0.2s"></span>
                <span class="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style="animation-delay: 0.4s"></span>
            </div>
        </div>
    </div>

    <!-- Opportunities List -->
    <div class="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {#each opportunities as opp, index}
            <div class="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-colors relative">
                <button
                    on:click={() => abrirModal(index)}
                    class="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800/40 backdrop-blur-sm text-neutral-300 hover:bg-red-500/30 hover:text-red-400 transition-all duration-200"
                    title="Remover oportunidade"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 6l12 12M6 18L18 6" />
                    </svg>
                </button>
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-3">
                            <div class="flex items-center space-x-2">
                                <span class="text-lg font-bold text-neutral-200">{opp.ativo}</span>
                            </div>
                        </div>
                        <div class="flex items-baseline space-x-1">
                            <span class="text-2xl font-bold text-emerald-500">{opp.lucro}%</span>
                            <span class="text-sm text-emerald-500/70">profit</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p class="text-sm font-medium text-neutral-400 mb-1">Volume 24h</p>
                            <p class="text-neutral-200">${opp.volume24h}</p>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-neutral-400 mb-1">Spread</p>
                            <p class="text-neutral-200">{opp.spread}%</p>
                        </div>
                    </div>

                    <div class="border-t border-neutral-800 pt-4">
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <p class="text-sm font-medium text-neutral-400 mb-2">{opp.exchangeA.nome}</p>
                                <div class="space-y-1">
                                    <div class="flex justify-between">
                                        <span class="text-sm text-neutral-300">Preço</span>
                                        <span class="text-sm text-neutral-300">${opp.exchangeA.preco}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-neutral-400 mb-2">{opp.exchangeB.nome}</p>
                                <div class="space-y-1">
                                    <div class="flex justify-between">
                                        <span class="text-sm text-neutral-300">Preço</span>
                                        <span class="text-sm text-neutral-300">${opp.exchangeB.preco}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 pt-4 border-t border-neutral-800">
                            <div class="flex items-center space-x-4">
                                <div class="flex-1 relative">
                                    <label for="valor-{opp.ativo}" class="text-sm font-medium text-neutral-400">Valor de entrada ($)</label>
                                    <div class="relative">
                                        <input
                                            type="number"
                                            id="valor-{opp.ativo}"
                                            bind:value={valoresEntrada[opp.ativo]}
                                            placeholder="100.00"
                                            class="mt-1 w-full bg-neutral-800/50 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                        {#if valoresEntrada[opp.ativo]}
                                            <button
                                                on:click={() => removerValor(opp.ativo)}
                                                class="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                                            >
                                                <X class="w-4 h-4" />
                                            </button>
                                        {/if}
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <p class="text-sm font-medium text-neutral-400">Lucro estimado</p>
                                    <p class="mt-1 text-lg font-bold text-emerald-500">
                                        ${valoresEntrada[opp.ativo] ? calcularLucro(valoresEntrada[opp.ativo], opp.lucro) : '0.00'}
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