<script>
  import { CreditCard, Check } from 'lucide-svelte';
  import PageHeader from '../../components/forms/PageHeader.svelte';
  
  let selectedPeriod = $state('monthly');
  
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
      <!-- Ícone do plano -->
      <div class="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3">
        {#if data.interval === 'por mês'}
          <svg class="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        {:else if data.interval === 'por trimestre'}
          <svg class="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        {:else if data.interval === 'por semestre'}
          <svg class="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        {:else}
          <svg class="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        {/if}
      </div>
      <div class="text-lg font-semibold mb-2 text-neutral-200">{data.name}</div>
      <!-- Preço com ícone -->
      <div class="flex items-center gap-2 mb-1">
        <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div class="text-3xl font-bold text-emerald-500">{data.price}</div>
      </div>
      <!-- Intervalo com ícone -->
      <div class="flex items-center gap-1 mb-3">
        <svg class="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <div class="text-sm text-neutral-400">{data.interval}</div>
      </div>
      <!-- Descrição sem ícone -->
      <p class="text-sm text-neutral-300 text-left w-full mb-4">{data.description}</p>
    </div>
    <div class="mt-auto space-y-3">
      {#if data.interval !== 'por mês'}
        <div class="flex justify-center items-center gap-1.5">
          <svg class="w-4 h-4 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <div class="text-sm font-medium text-cyan-300">
            {#if data.interval === 'por trimestre'}
              Economia de 7%
            {:else if data.interval === 'por semestre'}
              Economia de 28%
            {:else}
              Economia de 33%
            {/if}
          </div>
        </div>
      {/if}
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
    <!-- Desktop view -->
    <div class="hidden lg:grid lg:grid-cols-4 gap-4">
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

    <!-- Tablet view -->
    <div class="hidden sm:grid lg:hidden sm:grid-cols-2 gap-4">
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
    <div class="sm:hidden space-y-4">
      {#each Object.entries(periods) as [key, value]}
        <button 
          class="w-full p-4 rounded-lg border transition-all duration-200 text-center hover:shadow-lg backdrop-blur-sm
            {selectedPeriod === key ? 
              'border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-neutral-900/90' : 
              'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'}"
          onclick={() => selectedPeriod = key}
        >
          {@render periodDisplay(value)}
        </button>
      {/each}
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