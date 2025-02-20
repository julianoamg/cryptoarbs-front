<script>
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';
    import PageHeader from '../../components/forms/PageHeader.svelte';
    import Card from '../../components/forms/Card.svelte';
    import FormField from '../../components/forms/FormField.svelte';
    import { Activity, Calendar } from 'lucide-svelte';
    import OperationCard from '../../components/forms/OperationCard.svelte';

    $: t = translations[$language];

    let startDate = '';
    let endDate = '';
    let selectedRange = 'all';

    $: dateRanges = [
        { id: 'today', label: t.pages.operations.dateRanges.today },
        { id: 'yesterday', label: t.pages.operations.dateRanges.yesterday },
        { id: 'week', label: t.pages.operations.dateRanges.week },
        { id: '15days', label: t.pages.operations.dateRanges.fifteenDays },
        { id: '30days', label: t.pages.operations.dateRanges.thirtyDays },
        { id: '60days', label: t.pages.operations.dateRanges.sixtyDays },
        { id: '90days', label: t.pages.operations.dateRanges.ninetyDays },
        { id: '6months', label: t.pages.operations.dateRanges.sixMonths },
        { id: '1year', label: t.pages.operations.dateRanges.oneYear },
        { id: 'all', label: t.pages.operations.dateRanges.allPeriod }
    ];

    function setDateRange(range) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        switch (range) {
            case 'today':
                startDate = today.toISOString().slice(0, 16);
                endDate = now.toISOString().slice(0, 16);
                break;
            case 'yesterday':
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                startDate = yesterday.toISOString().slice(0, 16);
                endDate = today.toISOString().slice(0, 16);
                break;
            case 'week':
                const weekAgo = new Date(today);
                weekAgo.setDate(weekAgo.getDate() - 7);
                startDate = weekAgo.toISOString().slice(0, 16);
                endDate = now.toISOString().slice(0, 16);
                break;
            case '15days':
                const fifteenDaysAgo = new Date(today);
                fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
                startDate = fifteenDaysAgo.toISOString().slice(0, 16);
                endDate = now.toISOString().slice(0, 16);
                break;
            case '30days':
                const thirtyDaysAgo = new Date(today);
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                startDate = thirtyDaysAgo.toISOString().slice(0, 16);
                endDate = now.toISOString().slice(0, 16);
                break;
            case '60days':
                const sixtyDaysAgo = new Date(today);
                sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
                startDate = sixtyDaysAgo.toISOString().slice(0, 16);
                endDate = now.toISOString().slice(0, 16);
                break;
            case '90days':
                const ninetyDaysAgo = new Date(today);
                ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
                startDate = ninetyDaysAgo.toISOString().slice(0, 16);
                endDate = now.toISOString().slice(0, 16);
                break;
            case '6months':
                const sixMonthsAgo = new Date(today);
                sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                startDate = sixMonthsAgo.toISOString().slice(0, 16);
                endDate = now.toISOString().slice(0, 16);
                break;
            case '1year':
                const yearAgo = new Date(today);
                yearAgo.setFullYear(yearAgo.getFullYear() - 1);
                startDate = yearAgo.toISOString().slice(0, 16);
                endDate = now.toISOString().slice(0, 16);
                break;
            case 'all':
                startDate = '';
                endDate = '';
                break;
        }
        selectedRange = range;
    }

    const mockOperation = {
        date: '2024-03-20 14:30:00',
        pair: 'BTC/USDT',
        type: 'Spot-Futures',
        exchange_a: 'KuCoin',
        exchange_b: 'Bitget',
        exchange_a_url: 'https://www.kucoin.com',
        exchange_b_url: 'https://www.bitget.com',
        entry_price: 65000.00,
        entry_amount: 0.15,
        entry_total: 9750.00,
        exit_price: 65500.00,
        exit_amount: 0.15,
        exit_total: 9825.00,
        spread: 0.3431,
        spot_fee: 0.1000,
        futures_fee: 0.0500,
        funding_fee: 0.0100,
        expected_profit: 75.00,
        expected_profit_percentage: 0.77,
        real_profit: 72.50,
        real_profit_percentage: 0.74,
        profit: 0.77,
        status: 'closed'
    };

    const allOperations = [
        mockOperation,
        {
            ...mockOperation,
            date: '2024-03-20 14:35:00',
            pair: 'ETH/USDT',
            entry_price: 3500.00,
            entry_amount: 1.5,
            entry_total: 5250.00,
            exit_price: 3520.00,
            exit_amount: 1.5,
            exit_total: 5280.00,
            spread: 0.2845,
            funding_fee: -0.0025,
            expected_profit: 30.00,
            expected_profit_percentage: 0.57,
            real_profit: null,
            real_profit_percentage: null,
            status: 'open'
        }
    ];

    $: operations = allOperations.filter(operation => {
        const operationDate = new Date(operation.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (start && end) {
            return operationDate >= start && operationDate <= end;
        } else if (start) {
            return operationDate >= start;
        } else if (end) {
            return operationDate <= end;
        }
        return true;
    });

    function formatDate(dateString) {
        return new Date(dateString).toLocaleString();
    }

    function formatNumber(value, decimals = 2) {
        if (value === null || value === undefined) return '-';
        const num = typeof value === 'string' ? parseFloat(value) : value;
        if (isNaN(num)) return '-';
        return num.toFixed(decimals);
    }

    function formatCurrency(value, decimals = 2) {
        if (value === null || value === undefined) return '-';
        const num = typeof value === 'string' ? parseFloat(value) : value;
        if (isNaN(num)) return '-';
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(num);
    }
</script>

<PageHeader
    title={t.pages.operations.title}
    description={t.pages.operations.subtitle}
    icon={Activity}
/>

<div class="mt-6">
    <Card title={t.pages.operations.cardTitle}>
        <div class="flex items-center gap-4">
            <div class="flex-1 max-w-xs">
                <div class="relative flex items-center">
                    <Calendar class="absolute left-3 w-4 h-4 text-neutral-400" />
                    <select
                        class="w-full bg-neutral-800/50 border border-neutral-700/50 rounded p-3 pl-9 pr-3 py-2 text-sm text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/20"
                        bind:value={selectedRange}
                        on:change={() => setDateRange(selectedRange)}
                    >
                        {#each dateRanges as range}
                            <option value={range.id} class="bg-neutral-800 text-neutral-200">{range.label}</option>
                        {/each}
                    </select>
                </div>
            </div>
            {#if selectedRange !== 'all'}
                <div class="text-xs text-neutral-500">
                    {formatDate(startDate)} - {formatDate(endDate)}
                </div>
            {/if}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
            <div class="bg-neutral-800/50 rounded p-3 border border-neutral-700/50">
                <div class="flex items-center justify-between">
                    <span class="text-xs text-neutral-400">Total de Operações</span>
                </div>
                <div class="mt-1">
                    <span class="text-lg font-medium text-neutral-200">{operations.length}</span>
                </div>
            </div>

            <div class="bg-neutral-800/50 rounded p-3 border border-neutral-700/50">
                <div class="flex items-center justify-between">
                    <span class="text-xs text-neutral-400">Operações Abertas</span>
                </div>
                <div class="mt-1">
                    <span class="text-lg font-medium text-blue-400">{operations.filter(op => op.status === 'open').length}</span>
                </div>
            </div>

            <div class="bg-neutral-800/50 rounded p-3 border border-neutral-700/50">
                <div class="flex items-center justify-between">
                    <span class="text-xs text-neutral-400">Operações Fechadas</span>
                </div>
                <div class="mt-1">
                    <span class="text-lg font-medium text-emerald-400">{operations.filter(op => op.status === 'closed').length}</span>
                </div>
            </div>

            <div class="bg-neutral-800/50 rounded p-3 border border-neutral-700/50">
                <div class="flex items-center justify-between">
                    <span class="text-xs text-neutral-400">Lucro Total (%)</span>
                </div>
                <div class="mt-1">
                    {#if operations.some(op => op.real_profit !== null)}
                        {@const totalProfit = operations
                            .filter(op => op.status === 'closed')
                            .reduce((sum, op) => sum + (op.real_profit_percentage || 0), 0)}
                        <span class="text-lg font-medium {totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}">
                            {totalProfit >= 0 ? '+' : ''}{formatNumber(totalProfit)}%
                        </span>
                    {:else}
                        <span class="text-lg font-medium text-neutral-300">-</span>
                    {/if}
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
            <div class="bg-neutral-800/50 rounded p-3 border border-neutral-700/50">
                <div class="flex items-center justify-between">
                    <span class="text-xs text-neutral-400">Volume Total</span>
                </div>
                <div class="mt-1">
                    {#if operations.length > 0}
                        {@const totalVolume = operations.reduce((sum, op) => sum + op.entry_total, 0)}
                        <span class="text-lg font-medium text-neutral-200">{formatCurrency(totalVolume)} USDT</span>
                    {:else}
                        <span class="text-lg font-medium text-neutral-200">0.00 USDT</span>
                    {/if}
                </div>
            </div>

            <div class="bg-neutral-800/50 rounded p-3 border border-neutral-700/50">
                <div class="flex items-center justify-between">
                    <span class="text-xs text-neutral-400">Volume em Aberto</span>
                </div>
                <div class="mt-1">
                    {#if operations.length > 0}
                        {@const openVolume = operations.filter(op => op.status === 'open').reduce((sum, op) => sum + op.entry_total, 0)}
                        <span class="text-lg font-medium text-blue-400">{formatCurrency(openVolume)} USDT</span>
                    {:else}
                        <span class="text-lg font-medium text-blue-400">0.00 USDT</span>
                    {/if}
                </div>
            </div>

            <div class="bg-neutral-800/50 rounded p-3 border border-neutral-700/50">
                <div class="flex items-center justify-between">
                    <span class="text-xs text-neutral-400">Lucro Realizado</span>
                </div>
                <div class="mt-1">
                    {#if operations.some(op => op.status === 'closed')}
                        {@const realizedProfit = operations
                            .filter(op => op.status === 'closed')
                            .reduce((sum, op) => sum + (op.real_profit || 0), 0)}
                        <span class="text-lg font-medium {realizedProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}">
                            {realizedProfit >= 0 ? '+' : ''}{formatCurrency(realizedProfit)} USDT
                        </span>
                    {:else}
                        <span class="text-lg font-medium text-neutral-300">0.00 USDT</span>
                    {/if}
                </div>
            </div>

            <div class="bg-neutral-800/50 rounded p-3 border border-neutral-700/50">
                <div class="flex items-center justify-between">
                    <span class="text-xs text-neutral-400">Média por Operação</span>
                </div>
                <div class="mt-1">
                    {#if operations.some(op => op.status === 'closed')}
                        {@const avgProfit = operations
                            .filter(op => op.status === 'closed')
                            .reduce((sum, op) => sum + (op.real_profit || 0), 0) / operations.filter(op => op.status === 'closed').length}
                        <span class="text-lg font-medium {avgProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}">
                            {avgProfit >= 0 ? '+' : ''}{formatCurrency(avgProfit)} USDT
                        </span>
                    {:else}
                        <span class="text-lg font-medium text-neutral-300">0.00 USDT</span>
                    {/if}
                </div>
            </div>
        </div>

        {#if operations.length === 0}
            <p class="text-center py-4 text-neutral-400">{t.pages.operations.noOperations}</p>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                {#each operations as operation}
                    <OperationCard {operation} {formatNumber} {formatCurrency} />
                {/each}
            </div>
        {/if}
    </Card>
</div> 