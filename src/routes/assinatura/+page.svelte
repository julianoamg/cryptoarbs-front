<script>
    import { Check, CreditCard } from 'lucide-svelte';
    import PageHeader from '../../components/forms/PageHeader.svelte';
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';

    const plans = [
        {
            name: 'Básico',
            price: 'R$ 97/mês',
            description: 'Ideal para iniciantes no mercado de arbitragem',
            features: [
                'Acesso às oportunidades básicas',
                'Alertas de arbitragem',
                'Suporte via WhatsApp',
                'Guia de primeiros passos',
            ]
        },
        {
            name: 'Profissional',
            price: 'R$ 197/mês',
            description: 'Para traders que buscam resultados consistentes',
            popular: true,
            features: [
                'Todas as features do plano Básico',
                'Oportunidades avançadas',
                'Mentoria em grupo',
                'Análises detalhadas',
                'Prioridade no suporte',
                'Acesso a comunidade VIP'
            ]
        },
        {
            name: 'Enterprise',
            price: 'R$ 497/mês',
            description: 'Solução completa para arbitradores profissionais',
            features: [
                'Todas as features do plano Profissional',
                'Mentoria individual',
                'Estratégias exclusivas',
                'Suporte 24/7',
                'Acesso antecipado a novos recursos',
                'Configurações personalizadas'
            ]
        }
    ];

    $: t = translations[$language];
</script>

<div class="flex flex-col items-center py-4">
    <div class="w-full max-w-7xl space-y-8">
        <PageHeader
            title="Planos de Assinatura"
            description="Escolha o plano ideal para suas necessidades de arbitragem de criptomoedas. Comece hoje mesmo a maximizar seus lucros com nossas ferramentas profissionais."
            icon={CreditCard}
        ></PageHeader>

        <!-- Pricing Cards -->
        <div class="grid gap-6 lg:grid-cols-3">
            {#each plans as plan}
                <div class="relative flex flex-col p-8 rounded-xl border {plan.popular ? 'border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-neutral-900/90' : 'border-neutral-800 bg-neutral-900/50'} backdrop-blur-sm">
                    {#if plan.popular}
                        <div class="absolute -top-4 left-1/2 -translate-x-1/2">
                            <span class="inline-flex items-center px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-500 to-green-400 text-neutral-900">
                                Mais Popular
                            </span>
                        </div>
                    {/if}
                    
                    <div class="mb-6">
                        <h3 class="text-2xl font-bold text-neutral-200 mb-2">{plan.name}</h3>
                        <p class="text-neutral-400">{plan.description}</p>
                    </div>

                    <div class="mb-8">
                        <div class="flex items-baseline justify-center">
                            <span class="text-3xl font-bold text-emerald-500">R$</span>
                            <span class="text-5xl font-extrabold tracking-tight text-emerald-500">{plan.price.split('/')[0].replace('R$ ', '')}</span>
                            <span class="ml-1 text-xl font-semibold text-emerald-500">/mês</span>
                        </div>
                    </div>

                    <ul class="space-y-4 mb-8 flex-1">
                        {#each plan.features as feature}
                            <li class="flex items-center space-x-3">
                                <div class="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <Check class="w-3.5 h-3.5 text-emerald-500" />
                                </div>
                                <span class="text-neutral-300">{feature}</span>
                            </li>
                        {/each}
                    </ul>

                    <button class="w-full rounded-lg {plan.popular ? 'bg-gradient-to-r from-emerald-500 to-green-400 text-neutral-900 font-bold shadow-lg shadow-emerald-500/20' : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'} px-6 py-3 text-sm">
                        Começar agora
                    </button>
                </div>
            {/each}
        </div>

        <!-- FAQ Section -->
        <div class="max-w-3xl mx-auto space-y-6">
            <h2 class="text-2xl font-bold text-center text-neutral-200 mb-8">
                Perguntas Frequentes
            </h2>
            <div class="space-y-4">
                <div class="rounded-lg border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm overflow-hidden">
                    <details class="group">
                        <summary class="flex items-center justify-between p-6 cursor-pointer">
                            <span class="text-lg font-medium text-neutral-200">Como funciona o período de teste?</span>
                            <div class="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center group-open:rotate-180 transition-transform">
                                <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </summary>
                        <div class="px-6 pb-6 text-neutral-400">
                            Oferecemos 7 dias de teste gratuito em todos os planos. Você pode cancelar a qualquer momento durante este período sem custo algum.
                        </div>
                    </details>
                </div>

                <div class="rounded-lg border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm overflow-hidden">
                    <details class="group">
                        <summary class="flex items-center justify-between p-6 cursor-pointer">
                            <span class="text-lg font-medium text-neutral-200">Posso mudar de plano depois?</span>
                            <div class="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center group-open:rotate-180 transition-transform">
                                <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </summary>
                        <div class="px-6 pb-6 text-neutral-400">
                            Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. A diferença será calculada proporcionalmente.
                        </div>
                    </details>
                </div>

                <div class="rounded-lg border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm overflow-hidden">
                    <details class="group">
                        <summary class="flex items-center justify-between p-6 cursor-pointer">
                            <span class="text-lg font-medium text-neutral-200">Qual a política de reembolso?</span>
                            <div class="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center group-open:rotate-180 transition-transform">
                                <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </summary>
                        <div class="px-6 pb-6 text-neutral-400">
                            Oferecemos garantia de reembolso de 30 dias. Se você não estiver satisfeito, devolvemos 100% do seu investimento.
                        </div>
                    </details>
                </div>
            </div>
        </div>
    </div>
</div> 