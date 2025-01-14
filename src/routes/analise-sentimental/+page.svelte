<script>
    import { onMount } from 'svelte';
    import PageHeader from '../../components/forms/PageHeader.svelte';
    import { Target } from 'lucide-svelte';
    
    let coins = [
        {
            symbol: 'BTC',
            name: 'Bitcoin',
            sentiment: 'Positivo',
            price: '43,250.00',
            change24h: '+2.5%',
            analysis: 'Alta probabilidade de valorização devido ao aumento de adoção institucional e notícias positivas sobre ETFs.',
            sources: ['CoinDesk', 'CoinTelegraph'],
            confidence: '85%'
        },
        {
            symbol: 'ETH',
            name: 'Ethereum',
            sentiment: 'Positivo',
            price: '2,250.00',
            change24h: '+3.2%',
            analysis: 'Perspectiva otimista com o desenvolvimento do ecossistema DeFi e atualizações da rede.',
            sources: ['CoinTelegraph', 'CoinDesk'],
            confidence: '82%'
        },
        {
            symbol: 'SOL',
            name: 'Solana',
            sentiment: 'Muito Positivo',
            price: '98.50',
            change24h: '+5.8%',
            analysis: 'Forte momento positivo devido ao crescimento do ecossistema e adoção por desenvolvedores.',
            sources: ['CoinDesk', 'CoinTelegraph'],
            confidence: '88%'
        }
    ];
</script>

<div class="flex flex-col items-center">
    <div class="w-full max-w-5xl space-y-6">
        <PageHeader 
            title="Análise Sentimental"
            description="Utilizamos inteligência artificial para analisar o sentimento do mercado através de fontes confiáveis como CoinDesk e CoinTelegraph, identificando as criptomoedas com maior potencial de valorização."
            icon={Target}
        />

        <div class="bg-gradient-to-r from-emerald-500/10 to-transparent border-l-4 border-emerald-500/50 p-3">
            <p class="text-sm text-emerald-400/80">
                Nossa análise é atualizada diariamente e considera múltiplas fontes de dados, incluindo notícias, 
                redes sociais e métricas on-chain para fornecer insights precisos sobre o mercado.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each coins as coin}
                <div class="bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-lg border border-neutral-800 p-4 hover:border-emerald-500/30 transition-colors">
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <div class="flex items-center gap-2">
                                <h2 class="text-xl font-bold text-neutral-200">{coin.symbol}</h2>
                                <span class="text-emerald-500 text-sm">{coin.change24h}</span>
                            </div>
                            <p class="text-sm text-neutral-400">{coin.name}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-lg font-semibold text-neutral-200">${coin.price}</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-4 mb-3 text-sm">
                        <div class="flex items-center">
                            <span class="font-medium mr-1 text-neutral-400">Sentimento:</span>
                            <span class="text-emerald-500">{coin.sentiment}</span>
                        </div>
                        <div class="flex items-center">
                            <span class="font-medium mr-1 text-neutral-400">Confiança:</span>
                            <span class="text-emerald-400">{coin.confidence}</span>
                        </div>
                    </div>

                    <p class="text-sm text-neutral-300 mb-3">{coin.analysis}</p>

                    <div class="border-t border-neutral-800 pt-3">
                        <div class="flex gap-2">
                            {#each coin.sources as source}
                                <span class="bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 text-emerald-400/80 px-2 py-0.5 rounded text-xs">{source}</span>
                            {/each}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    :global(body) {
        background-color: #f9fafb;
    }
</style> 