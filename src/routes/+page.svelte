<script lang="ts">
    import { ArrowRight, TrendingUp, Percent, X, ArrowLeftRight } from 'lucide-svelte';
    import { fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';
    import { auth } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { getOpportunities } from '$lib/services/exchange';
    import { getMe } from '$lib/services/user';
    import PageHeader from '../components/forms/PageHeader.svelte';
    import Loading from '../components/Loading.svelte';
    import Button from '../components/forms/Button.svelte';

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
        symbol?: string;
    }

    $: t = translations[$language];

    let opportunities: ArbitrageOpportunity[] = [];
    let loading = true;
    let hasActiveSubscription = false;

    onMount(async () => {
        if ($auth.token) {
            try {
                // Primeiro verifica se o usuário tem assinatura ativa
                const userData = await getMe($auth.token);
                hasActiveSubscription = userData.has_active_subscription;

                // Se tiver assinatura, busca as oportunidades
                if (hasActiveSubscription) {
                    opportunities = await getOpportunities($auth.token);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                loading = false;
            }
        }
    });
</script>

<div class="flex flex-col items-center">
    <div class="w-full max-w-5xl space-y-8">
        <PageHeader 
            title={t?.pages?.home?.title || 'Arbitragem de Criptomoedas'}
            description={t?.pages?.home?.subtitle || 'Esta página é atualizada automaticamente.'}
            icon={ArrowLeftRight}
        />

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
            <!-- Opportunities List -->
            <div class="grid gap-6 grid-cols-1 lg:grid-cols-2">
                {#each opportunities as opp, index}
                    <div class="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-colors relative">
                        <div class="p-4 sm:p-6 space-y-4">
                            <!-- Header com Exchanges e Lucro -->
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div class="flex items-center space-x-2">
                                    <span class="text-base sm:text-lg font-bold text-neutral-200">{opp.exchange_a}</span>
                                    <ArrowRight class="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500" />
                                    <span class="text-base sm:text-lg font-bold text-neutral-200">{opp.exchange_b}</span>
                                </div>
                                <div class="flex items-baseline space-x-1">
                                    <span class="text-xl sm:text-2xl font-bold text-emerald-500">{opp.profit}%</span>
                                    <span class="text-sm text-emerald-500/70">{t.pages.home.profit}</span>
                                </div>
                            </div>

                            <!-- Trading Pair, Spread e Profit Fees -->
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {#if opp.symbol}
                                    <div class="col-span-2 sm:col-span-1">
                                        <p class="text-xs sm:text-sm font-medium text-neutral-400">{t.pages.home.tradingPair}</p>
                                        <p class="text-sm sm:text-base text-neutral-200 font-medium">{opp.symbol}</p>
                                    </div>
                                {/if}
                                <div>
                                    <p class="text-xs sm:text-sm font-medium text-neutral-400">{t.pages.home.spread}</p>
                                    <p class="text-sm sm:text-base text-neutral-200">{opp.spread}%</p>
                                </div>
                                <div>
                                    <p class="text-xs sm:text-sm font-medium text-neutral-400">Lucro Taxa</p>
                                    <p class="text-sm sm:text-base" class:text-emerald-500={parseFloat(opp.profit_fee) > 0} class:text-red-500={parseFloat(opp.profit_fee) < 0} class:text-neutral-200={parseFloat(opp.profit_fee) === 0}>{parseFloat(opp.profit_fee).toFixed(6)}%</p>
                                </div>
                            </div>

                            <!-- Preços -->
                            <div class="border-t border-neutral-800 pt-4">
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <p class="text-xs sm:text-sm font-medium text-neutral-400 mb-2">{opp.exchange_a}</p>
                                        <div class="flex justify-between">
                                            <span class="text-xs sm:text-sm text-neutral-400">{t.pages.home.price}</span>
                                            <span class="text-xs sm:text-sm text-neutral-200">{opp.exchange_a_price}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p class="text-xs sm:text-sm font-medium text-neutral-400 mb-2">{opp.exchange_b}</p>
                                        <div class="flex justify-between">
                                            <span class="text-xs sm:text-sm text-neutral-400">{t.pages.home.price}</span>
                                            <span class="text-xs sm:text-sm text-neutral-200">{opp.exchange_b_price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>