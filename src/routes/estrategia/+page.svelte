<script lang="ts">
    import { language } from '$lib/stores/i18n';
    import type { Translation, Language } from '$lib/i18n/types';
    import { translations } from '$lib/i18n/translations';
    import { toast } from '$lib/stores/toast';
    import { auth } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import PageHeader from '../../components/forms/PageHeader.svelte';
    import ValidatedField from '../../components/forms/ValidatedField.svelte';
    import Button from '../../components/forms/Button.svelte';
    import Card from '../../components/forms/Card.svelte';
    import { LineChart, DollarSign, Percent, AlertTriangle, HelpCircle } from 'lucide-svelte';
    import { PUBLIC_API_URL } from '$env/static/public';

    interface Settings {
        id: string;
        tolerance: string;
        min_profit: string;
        max_profit: string;
        stake: string;
    }

    $: t = translations[$language as Language] as Translation;

    let settings: Settings | null = null;
    let loading = true;
    let saving = false;
    let errors: { [key: string]: string } = {};

    onMount(async () => {
        if ($auth.token) {
            try {
                const response = await fetch(`${PUBLIC_API_URL}/arbify/settings/`, {
                    headers: {
                        'Authorization': `Token ${$auth.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to load settings');
                }

                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    settings = data.results[0];
                }
            } catch (error) {
                console.error('Failed to load settings:', error);
                toast.error('Falha ao carregar configurações');
            } finally {
                loading = false;
            }
        }
    });

    async function handleSubmit() {
        if (!settings || saving) return;

        saving = true;
        errors = {};

        try {
            const response = await fetch(`${PUBLIC_API_URL}/arbify/settings/${settings.id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${$auth.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tolerance: Number(settings.tolerance),
                    min_profit: settings.min_profit,
                    max_profit: settings.max_profit,
                    stake: settings.stake
                })
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 400) {
                    errors = data;
                    return;
                }
                throw new Error('Failed to save settings');
            }

            toast.success('Configurações salvas com sucesso');
        } catch (error) {
            console.error('Failed to save settings:', error);
            toast.error('Erro ao salvar configurações');
        } finally {
            saving = false;
        }
    }

    function validateMinProfit(value: string): string | undefined {
        const num = Number(value);
        if (isNaN(num)) return 'Valor inválido';
        if (num < 0.09) return 'Valor mínimo é 0.09%';
        if (num > 2.0) return 'Valor máximo é 2.0%';
        return undefined;
    }

    function validateMaxProfit(value: string): string | undefined {
        const num = Number(value);
        if (isNaN(num)) return 'Valor inválido';
        if (num < 1.0) return 'Valor mínimo é 1.0%';
        if (num > 5.0) return 'Valor máximo é 5.0%';
        return undefined;
    }

    function validateTolerance(value: string): string | undefined {
        const num = Number(value);
        if (isNaN(num)) return 'Valor inválido';
        if (num < 2) return 'Valor mínimo é 2%';
        if (num > 10) return 'Valor máximo é 10%';
        return undefined;
    }

    function validateStake(value: string): string | undefined {
        const num = Number(value);
        if (isNaN(num)) return 'Valor inválido';
        if (num < 5.0) return 'Valor mínimo é 5.0 USDT';
        if (num > 100.0) return 'Valor máximo é 100.0 USDT';
        return undefined;
    }
</script>

<div class="flex flex-col items-center">
    <div class="w-full max-w-5xl space-y-6">
        <PageHeader 
            title="Estratégia"
            description="Configure os parâmetros da sua estratégia de arbitragem"
            icon={LineChart}
        />

        {#if loading}
            <div class="flex items-center justify-center py-12">
                <div class="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
        {:else if settings}
            <Card>
                <div class="space-y-6">
                    <div>
                        <h2 class="text-lg font-bold text-neutral-200">Configurações da Estratégia</h2>
                        <p class="text-sm text-neutral-400 mt-1">Ajuste os parâmetros para otimizar suas operações</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-6">
                            <ValidatedField
                                type="number"
                                name="min_profit"
                                label="Lucro Mínimo"
                                bind:value={settings.min_profit}
                                error={errors.min_profit}
                                validate={validateMinProfit}
                                description="Porcentagem mínima de lucro para operações (0.09-2.0)"
                            />

                            <ValidatedField
                                type="number"
                                name="max_profit"
                                label="Lucro Máximo"
                                bind:value={settings.max_profit}
                                error={errors.max_profit}
                                validate={validateMaxProfit}
                                description="Porcentagem máxima de lucro para operações (1.0-5.0)"
                            />
                        </div>

                        <div class="space-y-6">
                            <ValidatedField
                                type="number"
                                name="tolerance"
                                label="Tolerância"
                                bind:value={settings.tolerance}
                                error={errors.tolerance}
                                validate={validateTolerance}
                                description="Valor de tolerância para operações de arbitragem (2-10)"
                            />

                            <ValidatedField
                                type="number"
                                name="stake"
                                label="Stake"
                                bind:value={settings.stake}
                                error={errors.stake}
                                validate={validateStake}
                                description="Valor em USDT para operações (5.0-100.0)"
                            />
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
                        <button 
                            type="submit" 
                            class="rounded bg-gradient-to-r from-emerald-500 to-green-400 px-6 py-3 text-sm font-bold text-neutral-900 shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-green-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-neutral-950 disabled:opacity-50 disabled:cursor-not-allowed"
                            on:click={handleSubmit}
                            disabled={saving}
                        >
                            {saving ? 'Salvando...' : 'Salvar Configurações'}
                        </button>
                    </div>
                </div>
            </Card>
        {/if}
    </div>
</div> 