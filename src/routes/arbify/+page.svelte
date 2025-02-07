# src/routes/arbify/+page.svelte
<script lang="ts">
    import { onMount } from 'svelte';
    import { Robot, Settings } from 'lucide-svelte';
    import type { RobotConfig, Exchange, TradingPair, Strategy } from './types';
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';
    import { auth } from '$lib/stores/auth';
    import { toast } from '$lib/stores/toast';
    import { PUBLIC_API_URL } from '$env/static/public';
    import PageHeader from '../../components/forms/PageHeader.svelte';
    import Card from '../../components/Card.svelte';
    import Select from '../../components/Select.svelte';
    import FormField from '../../components/forms/FormField.svelte';
    import Button from '../../components/forms/Button.svelte';
    import Toggle from '../../components/forms/Toggle.svelte';

    let loading = false;
    let saving = false;
    let exchanges: Exchange[] = [];
    let pairs: TradingPair[] = [];
    let strategies: Strategy[] = [];
    let config: RobotConfig = {
        name: '',
        enabled: false,
        exchanges: [],
        pairs: [],
        minSpread: 0.1,
        maxSpread: 5,
        minVolume: 1000,
        maxVolume: 1000000,
        minProfit: 0.1,
        maxLoss: 1,
        stopLoss: 1,
        takeProfit: 2,
        trailingStop: false,
        trailingStopDistance: 0.5,
        timeframe: '1m',
        strategy: '',
        riskManagement: {
            maxPositions: 3,
            maxDailyTrades: 10,
            maxDailyLoss: 3,
            maxDrawdown: 10,
            positionSize: 100,
            leverageLevel: 1
        }
    };

    $: t = translations[$language];

    onMount(async () => {
        if ($auth.token) {
            await loadData();
        }
    });

    async function loadData() {
        loading = true;
        try {
            // Load exchanges
            const exchangesResponse = await fetch(`${PUBLIC_API_URL}/exchanges/list/`, {
                headers: {
                    'Authorization': `Token ${$auth.token}`
                }
            });
            if (!exchangesResponse.ok) throw new Error('Failed to load exchanges');
            const exchangesData = await exchangesResponse.json();
            exchanges = exchangesData.results;

            // Load trading pairs
            const pairsResponse = await fetch(`${PUBLIC_API_URL}/exchanges/pairs/`, {
                headers: {
                    'Authorization': `Token ${$auth.token}`
                }
            });
            if (!pairsResponse.ok) throw new Error('Failed to load pairs');
            const pairsData = await pairsResponse.json();
            pairs = pairsData.results;

            // Load strategies
            const strategiesResponse = await fetch(`${PUBLIC_API_URL}/robot/strategies/`, {
                headers: {
                    'Authorization': `Token ${$auth.token}`
                }
            });
            if (!strategiesResponse.ok) throw new Error('Failed to load strategies');
            const strategiesData = await strategiesResponse.json();
            strategies = strategiesData.results;

            // Load current config
            const configResponse = await fetch(`${PUBLIC_API_URL}/robot/config/`, {
                headers: {
                    'Authorization': `Token ${$auth.token}`
                }
            });
            if (configResponse.ok) {
                const configData = await configResponse.json();
                config = { ...config, ...configData };
            }
        } catch (error) {
            console.error('Failed to load data:', error);
            toast.error('Failed to load configuration data');
        } finally {
            loading = false;
        }
    }

    async function handleSubmit() {
        saving = true;
        try {
            const response = await fetch(`${PUBLIC_API_URL}/robot/config/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${$auth.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(config)
            });

            if (!response.ok) throw new Error('Failed to save configuration');
            
            toast.success('Configuration saved successfully');
        } catch (error) {
            console.error('Failed to save config:', error);
            toast.error('Failed to save configuration');
        } finally {
            saving = false;
        }
    }
</script>

<div class="space-y-6">
    <PageHeader
        title={t.pages.arbify.title}
        description={t.pages.arbify.subtitle}
        icon={Robot}
    />

    {#if loading}
        <div class="flex items-center justify-center h-64">
            <div class="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
    {:else}
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <!-- Basic Settings -->
            <Card title={t.pages.arbify.basicSettings} icon={Settings}>
                <div class="space-y-4">
                    <FormField
                        name="name"
                        label={t.pages.arbify.robotName}
                        bind:value={config.name}
                    />
                    
                    <div class="flex items-center justify-between">
                        <label class="text-sm font-medium text-neutral-300">
                            {t.pages.arbify.enabled}
                        </label>
                        <Toggle bind:checked={config.enabled} />
                    </div>

                    <Select
                        label={t.pages.arbify.exchanges}
                        options={exchanges}
                        bind:selected={config.exchanges}
                        multiple={true}
                    />

                    <Select
                        label={t.pages.arbify.pairs}
                        options={pairs}
                        bind:selected={config.pairs}
                        multiple={true}
                    />

                    <Select
                        label={t.pages.arbify.strategy}
                        options={strategies}
                        bind:selected={config.strategy}
                    />
                </div>
            </Card>

            <!-- Trading Parameters -->
            <Card title={t.pages.arbify.tradingParameters}>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        type="number"
                        name="minSpread"
                        label={t.pages.arbify.minSpread}
                        bind:value={config.minSpread}
                        step="0.1"
                    />
                    
                    <FormField
                        type="number"
                        name="maxSpread"
                        label={t.pages.arbify.maxSpread}
                        bind:value={config.maxSpread}
                        step="0.1"
                    />

                    <FormField
                        type="number"
                        name="minVolume"
                        label={t.pages.arbify.minVolume}
                        bind:value={config.minVolume}
                    />

                    <FormField
                        type="number"
                        name="maxVolume"
                        label={t.pages.arbify.maxVolume}
                        bind:value={config.maxVolume}
                    />

                    <FormField
                        type="number"
                        name="minProfit"
                        label={t.pages.arbify.minProfit}
                        bind:value={config.minProfit}
                        step="0.1"
                    />

                    <FormField
                        type="number"
                        name="maxLoss"
                        label={t.pages.arbify.maxLoss}
                        bind:value={config.maxLoss}
                        step="0.1"
                    />
                </div>
            </Card>

            <!-- Risk Management -->
            <Card title={t.pages.arbify.riskManagement}>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        type="number"
                        name="stopLoss"
                        label={t.pages.arbify.stopLoss}
                        bind:value={config.stopLoss}
                        step="0.1"
                    />

                    <FormField
                        type="number"
                        name="takeProfit"
                        label={t.pages.arbify.takeProfit}
                        bind:value={config.takeProfit}
                        step="0.1"
                    />

                    <div class="flex items-center justify-between md:col-span-2">
                        <label class="text-sm font-medium text-neutral-300">
                            {t.pages.arbify.trailingStop}
                        </label>
                        <Toggle bind:checked={config.trailingStop} />
                    </div>

                    {#if config.trailingStop}
                        <FormField
                            type="number"
                            name="trailingStopDistance"
                            label={t.pages.arbify.trailingStopDistance}
                            bind:value={config.trailingStopDistance}
                            step="0.1"
                        />
                    {/if}

                    <FormField
                        type="number"
                        name="maxPositions"
                        label={t.pages.arbify.maxPositions}
                        bind:value={config.riskManagement.maxPositions}
                    />

                    <FormField
                        type="number"
                        name="maxDailyTrades"
                        label={t.pages.arbify.maxDailyTrades}
                        bind:value={config.riskManagement.maxDailyTrades}
                    />

                    <FormField
                        type="number"
                        name="maxDailyLoss"
                        label={t.pages.arbify.maxDailyLoss}
                        bind:value={config.riskManagement.maxDailyLoss}
                        step="0.1"
                    />

                    <FormField
                        type="number"
                        name="maxDrawdown"
                        label={t.pages.arbify.maxDrawdown}
                        bind:value={config.riskManagement.maxDrawdown}
                        step="0.1"
                    />

                    <FormField
                        type="number"
                        name="positionSize"
                        label={t.pages.arbify.positionSize}
                        bind:value={config.riskManagement.positionSize}
                        step="0.1"
                    />

                    <FormField
                        type="number"
                        name="leverageLevel"
                        label={t.pages.arbify.leverageLevel}
                        bind:value={config.riskManagement.leverageLevel}
                    />
                </div>
            </Card>

            <div class="flex justify-end">
                <Button type="submit" loading={saving}>
                    {saving ? t.pages.arbify.saving : t.pages.arbify.save}
                </Button>
            </div>
        </form>
    {/if}
</div> 