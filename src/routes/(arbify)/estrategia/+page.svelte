<script lang="ts">
    import { language } from '$lib/stores/i18n';
    import type { Translation, Language } from '$lib/i18n/types';
    import { translations } from '$lib/i18n/translations';
    import { toast } from '$lib/stores/toast';
    import { auth } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import PageHeader from '../../../components/forms/PageHeader.svelte';
    import ValidatedField from '../../../components/forms/ValidatedField.svelte';
    import Card from '../../../components/forms/Card.svelte';
    import { LineChart } from 'lucide-svelte';
    import { PUBLIC_API_URL } from '$env/static/public';

    interface Settings {
        id: string;
        min_profit: string;
        max_profit: string;
        stake: string;
        enable_open_robot: boolean;
        enable_close_robot: boolean;
        enable_financial_robot: boolean;
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
                    min_profit: settings.min_profit,
                    max_profit: settings.max_profit,
                    stake: settings.stake,
                    enable_open_robot: settings.enable_open_robot,
                    enable_close_robot: settings.enable_close_robot,
                    enable_financial_robot: settings.enable_financial_robot
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
        if (num < 0.1) return 'Valor mínimo é 0.1%';
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

    function validateStake(value: string): string | undefined {
        const num = Number(value);
        if (isNaN(num)) return 'Valor inválido';
        if (num < 10.0) return 'Valor mínimo é 10.0 USDT';
        if (num > 100.0) return 'Valor máximo é 100.0 USDT';
        return undefined;
    }
</script>

<div class="flex flex-col items-center">
    <div class="w-full max-w-5xl space-y-6">
        <PageHeader 
            title={t.menu.estrategia}
            description={t.pages.strategy.subtitle}
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
                        <h2 class="text-lg font-bold text-neutral-200">{t.pages.strategy.cardTitle}</h2>
                        <p class="text-sm text-neutral-400 mt-1">{t.pages.strategy.subtitle}</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-6">
                            <ValidatedField
                                type="number"
                                name="min_profit"
                                label={t.pages.strategy.minProfit}
                                bind:value={settings.min_profit}
                                error={errors.min_profit}
                                validate={validateMinProfit}
                                description={t.pages.strategy.minProfitDescription}
                            />

                            <ValidatedField
                                type="number"
                                name="max_profit"
                                label={t.pages.strategy.maxProfit}
                                bind:value={settings.max_profit}
                                error={errors.max_profit}
                                validate={validateMaxProfit}
                                description={t.pages.strategy.maxProfitDescription}
                            />
                        </div>

                        <div class="space-y-6">
                            <ValidatedField
                                type="number"
                                name="stake"
                                label={t.pages.strategy.stake}
                                bind:value={settings.stake}
                                error={errors.stake}
                                validate={validateStake}
                                description={t.pages.strategy.stakeDescription}
                            />

                            <!-- Robot Control Switches -->
                            <div class="space-y-4 pt-2">
                                <div class="space-y-2">
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm font-medium text-neutral-200">{t.pages.strategy.robots.open.title}</span>
                                        <label class="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" bind:checked={settings.enable_open_robot} class="sr-only peer">
                                            <div class="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                        </label>
                                    </div>
                                    <p class="text-xs text-neutral-400">{t.pages.strategy.robots.open.description}</p>
                                </div>

                                <div class="space-y-2">
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm font-medium text-neutral-200">{t.pages.strategy.robots.close.title}</span>
                                        <label class="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" bind:checked={settings.enable_close_robot} class="sr-only peer">
                                            <div class="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                        </label>
                                    </div>
                                    <p class="text-xs text-neutral-400">{t.pages.strategy.robots.close.description}</p>
                                </div>

                                <div class="space-y-2">
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm font-medium text-neutral-200">{t.pages.strategy.robots.financial.title}</span>
                                        <label class="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" bind:checked={settings.enable_financial_robot} class="sr-only peer">
                                            <div class="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                        </label>
                                    </div>
                                    <p class="text-xs text-neutral-400">{t.pages.strategy.robots.financial.description}</p>
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
                                <p class="text-sm font-medium text-neutral-200">{t.pages.strategy.tips.title}</p>
                                <ul class="text-sm text-neutral-400 space-y-1.5">
                                    <li class="flex items-start gap-2">
                                        <span class="text-emerald-500">•</span>
                                        <span>{t.pages.strategy.tips.conservative}</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="text-emerald-500">•</span>
                                        <span>{t.pages.strategy.tips.monitor}</span>
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
                            {saving ? t.auth.cadastro.salvando : t.pages.settings.saveButton}
                        </button>
                    </div>
                </div>
            </Card>
        {/if}
    </div>
</div> 