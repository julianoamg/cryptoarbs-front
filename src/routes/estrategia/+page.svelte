<script lang="ts">
    import { language } from '$lib/stores/i18n';
    import type { Translation } from '$lib/i18n/types';
    import { translations } from '$lib/i18n/translations';
    import { toast } from '$lib/stores/toast';
    import { auth } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { exchangeCredentials } from '$lib/stores/exchangeCredentials';
    import PageHeader from '../../components/forms/PageHeader.svelte';
    import FormField from '../../components/forms/FormField.svelte';
    import Button from '../../components/forms/Button.svelte';
    import Card from '../../components/forms/Card.svelte';
    import ExchangeCredentialsModal from '../../components/forms/ExchangeCredentialsModal.svelte';
    import { LineChart, DollarSign, Percent, AlertTriangle, TrendingUp, ArrowLeftRight, HelpCircle, Key, Plus } from 'lucide-svelte';
    import Tooltip from '../../components/Tooltip.svelte';

    interface Exchange {
        id: string;
        name: string;
        marked: boolean;
        has_credentials?: boolean;
    }

    $: t = translations[$language] as Translation;

    // Settings
    let minProfit: number = 0.5;
    let maxProfit: number = 5;
    let tolerance: number = 0.1;
    let stake: number = 100;

    // Exchange credentials
    let exchanges: Exchange[] = [];
    let loading = true;

    onMount(async () => {
        if ($auth.token) {
            await fetchExchanges();
        }
    });

    async function fetchExchanges() {
        try {
            const response = await fetch(`/api/exchanges/list/`, {
                headers: {
                    'Authorization': `Token ${$auth.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch exchanges');
            }

            const data = await response.json();
            exchanges = data.results;
            loading = false;
        } catch (error) {
            console.error('Failed to fetch exchanges:', error);
            loading = false;
        }
    }

    async function handleSubmit() {
        try {
            // TODO: Implement API call to save strategy settings
            toast.success('Configurações salvas com sucesso');
        } catch (error) {
            toast.error('Erro ao salvar configurações');
        }
    }
</script>

<div class="flex flex-col items-center">
    <div class="w-full max-w-5xl space-y-6">
        <!-- Strategy Settings -->
        <Card>
            <div class="space-y-6">
                <div>
                    <h2 class="text-lg font-bold text-neutral-200">Configurações da Estratégia</h2>
                    <p class="text-sm text-neutral-400 mt-1">Ajuste os parâmetros para otimizar suas operações</p>
                </div>

                <!-- Profit Settings -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-6">
                        <div class="form-field">
                            <FormField
                                type="number"
                                step="0.1"
                                label="Lucro Mínimo"
                                bind:value={minProfit}
                            >
                                <div slot="icon">
                                    <Percent class="w-4 h-4" />
                                </div>
                                <div slot="description">
                                    <div class="space-y-1">
                                        <p>Lucro mínimo necessário para executar uma operação</p>
                                        <ul class="text-xs text-neutral-400 space-y-1">
                                            <li class="flex items-start gap-1">
                                                <span class="text-emerald-500">•</span>
                                                <span>Valores muito baixos podem resultar em operações pouco lucrativas</span>
                                            </li>
                                            <li class="flex items-start gap-1">
                                                <span class="text-emerald-500">•</span>
                                                <span>Recomendado: entre 0.5% e 1%</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div slot="suffix">%</div>
                            </FormField>
                            <div class="flex items-center gap-1.5 mt-1.5">
                                <HelpCircle class="w-3.5 h-3.5 text-neutral-500" />
                                <p class="text-xs text-neutral-500">Defina um valor mínimo que cubra as taxas das exchanges e gere lucro</p>
                            </div>
                        </div>
                        
                        <div class="form-field">
                            <FormField
                                type="number"
                                step="0.1"
                                label="Lucro Máximo"
                                bind:value={maxProfit}
                            >
                                <div slot="icon">
                                    <ArrowLeftRight class="w-4 h-4" />
                                </div>
                                <div slot="description">
                                    <div class="space-y-1">
                                        <p>Limite máximo de lucro para considerar uma operação válida</p>
                                        <ul class="text-xs text-neutral-400 space-y-1">
                                            <li class="flex items-start gap-1">
                                                <span class="text-emerald-500">•</span>
                                                <span>Oportunidades com lucro muito alto podem indicar riscos</span>
                                            </li>
                                            <li class="flex items-start gap-1">
                                                <span class="text-emerald-500">•</span>
                                                <span>Recomendado: entre 3% e 5%</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div slot="suffix">%</div>
                            </FormField>
                            <div class="flex items-center gap-1.5 mt-1.5">
                                <HelpCircle class="w-3.5 h-3.5 text-neutral-500" />
                                <p class="text-xs text-neutral-500">Evite oportunidades com spreads muito altos, pois podem ser armadilhas</p>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div class="form-field">
                            <FormField
                                type="number"
                                step="0.01"
                                label="Tolerância"
                                bind:value={tolerance}
                            >
                                <div slot="icon">
                                    <AlertTriangle class="w-4 h-4" />
                                </div>
                                <div slot="description">
                                    <div class="space-y-1">
                                        <p>Margem de tolerância para variações de preço durante a execução</p>
                                        <ul class="text-xs text-neutral-400 space-y-1">
                                            <li class="flex items-start gap-1">
                                                <span class="text-emerald-500">•</span>
                                                <span>Ajuda a compensar pequenas variações de preço entre exchanges</span>
                                            </li>
                                            <li class="flex items-start gap-1">
                                                <span class="text-emerald-500">•</span>
                                                <span>Recomendado: entre 0.1% e 0.3%</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div slot="suffix">%</div>
                            </FormField>
                            <div class="flex items-center gap-1.5 mt-1.5">
                                <HelpCircle class="w-3.5 h-3.5 text-neutral-500" />
                                <p class="text-xs text-neutral-500">Uma margem adequada evita falhas na execução por pequenas oscilações</p>
                            </div>
                        </div>
                        
                        <div class="form-field">
                            <FormField
                                type="number"
                                step="1"
                                label={t.pages.strategy.stake}
                                bind:value={stake}
                            >
                                <div slot="icon">
                                    <DollarSign class="w-4 h-4" />
                                </div>
                                <div slot="description">
                                    <div class="space-y-1">
                                        <p>Valor base a ser utilizado em cada operação de arbitragem</p>
                                        <ul class="text-xs text-neutral-400 space-y-1">
                                            <li class="flex items-start gap-1">
                                                <span class="text-emerald-500">•</span>
                                                <span>Considere as taxas das exchanges ao definir este valor</span>
                                            </li>
                                            <li class="flex items-start gap-1">
                                                <span class="text-emerald-500">•</span>
                                                <span>Recomendado: mínimo de 100 USDT</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div slot="suffix">USDT</div>
                            </FormField>
                            <div class="flex items-center gap-1.5 mt-1.5">
                                <HelpCircle class="w-3.5 h-3.5 text-neutral-500" />
                                <p class="text-xs text-neutral-500">Valores maiores diluem o impacto das taxas fixas das exchanges</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tips -->
                <div class="p-3 bg-neutral-900/50 border border-neutral-800 rounded">
                    <div class="flex items-start gap-3">
                        <div class="w-5 h-5 rounded-lg bg-emerald-500/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                            <span class="text-sm font-medium text-emerald-500">!</span>
                        </div>
                        <div class="space-y-2">
                            <p class="text-sm font-medium text-neutral-200">Dicas para Configuração</p>
                            <ul class="text-sm text-neutral-400 space-y-1.5">
                                <li class="flex items-start gap-2">
                                    <span class="text-emerald-500">•</span>
                                    <span>Comece com valores conservadores e ajuste conforme sua experiência</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-emerald-500">•</span>
                                    <span>Monitore o desempenho da estratégia e faça ajustes graduais</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end mt-6">
                    <Button type="submit" label="Salvar Configurações" on:click={handleSubmit} />
                </div>
            </div>
        </Card>

        <!-- Exchange Credentials -->
        <Card>
            <div class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 class="text-lg font-bold text-neutral-200">Credenciais das Corretoras</h2>
                        <p class="text-sm text-neutral-400 mt-1">Gerencie as chaves de API das suas corretoras</p>
                    </div>
                    <button
                        class="flex items-center justify-center gap-2 px-4 py-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20 transition-colors w-full sm:w-auto"
                        on:click={() => exchangeCredentials.showModal()}
                    >
                        <Plus class="w-4 h-4" />
                        <span class="text-sm font-medium">Adicionar Credencial</span>
                    </button>
                </div>

                {#if loading}
                    <div class="flex items-center justify-center py-12">
                        <div class="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                    </div>
                {:else if exchanges.length === 0}
                    <div class="flex flex-col items-center justify-center py-12 text-center">
                        <Key class="w-12 h-12 text-neutral-500 mb-4" />
                        <p class="text-neutral-400">Nenhuma credencial configurada</p>
                        <p class="text-sm text-neutral-500 mt-1">Clique no botão acima para adicionar</p>
                    </div>
                {:else}
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {#each exchanges as exchange}
                            <div class="p-4 rounded bg-neutral-900/50 border border-neutral-800">
                                <div class="flex items-start justify-between">
                                    <div>
                                        <h3 class="font-medium text-neutral-200">{exchange.name}</h3>
                                        {#if exchange.has_credentials}
                                            <p class="text-xs text-emerald-500 mt-1">Credenciais configuradas</p>
                                        {:else}
                                            <p class="text-xs text-neutral-500 mt-1">Sem credenciais</p>
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </Card>
    </div>
</div>

{#if $exchangeCredentials.showModal}
    <ExchangeCredentialsModal
        show={true}
        onClose={() => exchangeCredentials.hideModal()}
        onSuccess={fetchExchanges}
    />
{/if} 