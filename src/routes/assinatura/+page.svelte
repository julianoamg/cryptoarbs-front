<script>
  import { CreditCard, Check } from 'lucide-svelte';
  import PageHeader from '../../components/forms/PageHeader.svelte';
  
  let selectedPeriod = $state('monthly');
  let isOpen = $state(false);
  
  const periods = {
    monthly: {
      name: 'Mensal',
      price: '997',
      interval: 'por mês',
      description: 'Ideal para quem está começando no mercado de arbitragem e quer validar os resultados mês a mês.'
    },
    quarterly: {
      name: 'Trimestral',
      price: '2.797',
      interval: 'por trimestre',
      description: 'Perfeito para traders que já conhecem o mercado e buscam consistência nos resultados com economia.'
    },
    semiannual: {
      name: 'Semestral',
      price: '4.297',
      interval: 'por semestre',
      description: 'Excelente para profissionais que desejam maximizar seus ganhos com estratégias exclusivas de arbitragem.'
    },
    annual: {
      name: 'Anual',
      price: '7.997',
      interval: 'por ano',
      description: 'A escolha dos traders profissionais que buscam as melhores oportunidades com o maior custo-benefício.'
    }
  };

  const faqs = [
    {
      question: 'Como funciona o período de teste?',
      answer: 'Oferecemos 7 dias de teste gratuito em todos os planos. Você pode cancelar a qualquer momento durante este período sem custo algum.'
    },
    {
      question: 'Posso mudar de plano depois?',
      answer: 'Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. A diferença será calculada proporcionalmente.'
    },
    {
      question: 'Qual a política de reembolso?',
      answer: 'Oferecemos garantia de reembolso de 7 dias. Se você não estiver satisfeito, devolvemos 100% do seu investimento.'
    },
    {
      question: 'Quais formas de pagamento são aceitas?',
      answer: 'Aceitamos cartões de crédito, PIX e transferência bancária. Todas as transações são processadas de forma segura.'
    },
    {
      question: 'Preciso fornecer dados pessoais?',
      answer: 'Sim, precisamos de algumas informações básicas para criar sua conta e emitir a nota fiscal, mas todos os dados são protegidos conforme a LGPD.'
    }
  ];
</script>

{#snippet periodDisplay(data)}
  <div class="flex flex-col h-full">
    <div class="flex flex-col items-center">
      <div class="text-lg font-semibold mb-2 text-neutral-200">{data.name}</div>
      <div class="text-3xl font-bold mb-1 text-emerald-500">{data.price}</div>
      <div class="text-sm text-neutral-400 mb-3">{data.interval}</div>
      <p class="text-sm text-neutral-300 text-left w-full mb-4">{data.description}</p>
    </div>
    <div class="mt-auto pt-4 space-y-2">
      <button class="w-full py-2 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-neutral-900 font-semibold transition-colors">
        Assinar
      </button>
      <div class="text-sm text-neutral-400 text-center">
        {#if data.interval === 'por mês'}
          997 por mês
        {:else if data.interval === 'por trimestre'}
          932 por mês
        {:else if data.interval === 'por semestre'}
          716 por mês
        {:else}
          666 por mês
        {/if}
      </div>
    </div>
  </div>
{/snippet}

<div class="max-w-4xl mx-auto p-4 pb-32 space-y-12">
  <PageHeader
    title="Planos de Assinatura"
    description="Maximize seus lucros com nossas ferramentas profissionais de arbitragem"
    icon={CreditCard}
  />

  <!-- Planos -->
  <div class="space-y-4">
    <!-- Desktop e tablet view -->
    <div class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each Object.entries(periods) as [key, value]}
        <button 
          class="p-4 rounded-lg border transition-all duration-200 text-center hover:shadow-lg backdrop-blur-sm
            {selectedPeriod === key ? 
              'border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-neutral-900/90' : 
              'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'}"
          onclick={() => selectedPeriod = key}
        >
          {@render periodDisplay(value)}
        </button>
      {/each}
    </div>

    <!-- Mobile view -->
    <div class="sm:hidden relative">
      <button 
        class="w-full p-4 rounded-lg border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-neutral-900/90 backdrop-blur-sm text-center"
        onclick={() => isOpen = !isOpen}
      >
        {@render periodDisplay(periods[selectedPeriod])}
        <div class="absolute right-4 top-1/2 -translate-y-1/2">
          <svg class="w-5 h-5 transform transition-transform text-emerald-500 {isOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {#if isOpen}
        <div class="absolute z-10 w-full mt-2 rounded-lg border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm shadow-lg">
          {#each Object.entries(periods) as [key, value]}
            {#if key !== selectedPeriod}
              <button 
                class="w-full p-4 text-center hover:bg-neutral-800/50 transition-colors duration-200"
                onclick={() => {
                  selectedPeriod = key;
                  isOpen = false;
                }}
              >
                {@render periodDisplay(value)}
              </button>
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- FAQ -->
  <div class="space-y-6 max-w-3xl mx-auto">
    <h2 class="text-xl font-bold text-center text-neutral-200 mb-4">Perguntas Frequentes</h2>
    
    <div class="space-y-2">
      {#each faqs as faq}
        <div class="rounded-lg border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm overflow-hidden">
          <details class="group">
            <summary class="flex items-center justify-between p-4 cursor-pointer">
              <span class="text-base font-medium text-neutral-200">{faq.question}</span>
              <div class="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center group-open:rotate-180 transition-transform">
                <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </summary>
            <div class="px-4 pb-4 text-sm text-neutral-400">
              {faq.answer}
            </div>
          </details>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Compra Segura -->
<div class="fixed bottom-0 lg:left-[240px] left-0 right-0 bg-neutral-900 border-t border-neutral-800">
  <div class="p-4 relative overflow-hidden">
    <!-- Conteúdo principal -->
    <div class="relative z-10 flex items-center justify-between max-w-7xl mx-auto">
      <div class="flex items-center gap-3">
        <!-- Ícones apenas para desktop -->
        <div class="hidden md:flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div class="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div class="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <!-- Ícone único para mobile -->
        <div class="md:hidden w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div class="space-y-1">
          <h2 class="text-lg font-bold text-neutral-200">Compra 100% Segura</h2>
          <!-- Textos completos apenas para desktop -->
          <div class="hidden md:flex gap-4">
            <p class="text-sm text-neutral-400">Ambiente seguro com criptografia SSL</p>
            <p class="text-sm text-neutral-400">Pagamento processado por gateway homologado</p>
            <p class="text-sm text-neutral-400">Dados protegidos conforme LGPD</p>
          </div>
          <!-- Texto único para mobile -->
          <p class="md:hidden text-sm text-neutral-400">Dados protegidos conforme LGPD</p>
        </div>
      </div>

      <!-- Ícone de digital - apenas desktop -->
      <div class="relative hidden md:block">
        <svg class="w-20 h-20 text-emerald-500 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        </svg>
      </div>
    </div>

    <!-- Ícone de digital no background para mobile -->
    <div class="absolute right-0 top-1/2 -translate-y-1/2 md:hidden">
      <svg class="w-32 h-32 text-emerald-500 opacity-10 transform rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
      </svg>
    </div>

    <!-- Efeito de gradiente -->
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-neutral-900/90"></div>
  </div>
</div> 