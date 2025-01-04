<script>
    import { Target, Users, Calendar, MessageCircle, Zap, Award } from 'lucide-svelte';

    const benefits = [
        {
            icon: Target,
            title: 'Estratégias Avançadas',
            description: 'Aprenda técnicas exclusivas de arbitragem para maximizar seus resultados'
        },
        {
            icon: Users,
            title: 'Mentoria em Grupo',
            description: 'Participe de sessões semanais com outros traders e aprenda com suas experiências'
        },
        {
            icon: Calendar,
            title: 'Horários Flexíveis',
            description: 'Escolha os melhores horários para participar das sessões de mentoria'
        },
        {
            icon: MessageCircle,
            title: 'Suporte Dedicado',
            description: 'Acesso direto aos mentores para tirar dúvidas e receber orientações'
        },
        {
            icon: Zap,
            title: 'Conteúdo Atualizado',
            description: 'Material didático sempre atualizado com as últimas tendências do mercado'
        },
        {
            icon: Award,
            title: 'Certificado',
            description: 'Receba um certificado ao completar o programa de mentoria'
        }
    ];
</script>

<div class="flex flex-col items-center py-4">
    <div class="w-full max-w-7xl space-y-12">
        <!-- Header -->
        <div class="max-w-3xl mx-auto text-center space-y-4">
            <h1 class="text-4xl font-extrabold text-neutral-200 tracking-tight">
                Programa de Mentoria
            </h1>
            <p class="text-xl text-neutral-400 leading-relaxed">
                Acelere sua jornada no mercado de arbitragem com nosso programa exclusivo de mentoria. 
                Aprenda com profissionais experientes e desenvolva as habilidades necessárias para o sucesso.
            </p>
        </div>

        <!-- Hero Section -->
        <div class="relative rounded-2xl overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-neutral-900/90"></div>
            <div class="relative flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-12">
                <div class="flex-1 space-y-6">
                    <h2 class="text-3xl font-bold text-neutral-200">
                        Transforme seu Conhecimento em Resultados
                    </h2>
                    <p class="text-lg text-neutral-300">
                        Nossa mentoria foi desenvolvida para ajudar você a dominar as técnicas de arbitragem 
                        e construir uma operação lucrativa e sustentável no mercado de criptomoedas.
                    </p>
                    <button class="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-400 text-neutral-900 font-bold shadow-lg shadow-emerald-500/20">
                        Começar Agora
                    </button>
                </div>
                <div class="lg:w-1/3">
                    <div class="aspect-square rounded-xl bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 p-6">
                        <div class="h-full flex items-center justify-center">
                            <Target class="w-32 h-32 text-emerald-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Benefits Grid -->
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {#each benefits as benefit}
                <div class="flex flex-col p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
                    <div class="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4">
                        <svelte:component this={benefit.icon} class="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 class="text-xl font-bold text-neutral-200 mb-2">{benefit.title}</h3>
                    <p class="text-neutral-400">{benefit.description}</p>
                </div>
            {/each}
        </div>

        <!-- CTA Section -->
        <div class="max-w-3xl mx-auto text-center space-y-6">
            <h2 class="text-2xl font-bold text-neutral-200">
                Pronto para Começar?
            </h2>
            <p class="text-lg text-neutral-400">
                Junte-se a nossa comunidade de traders de sucesso e comece sua jornada rumo à independência financeira.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-400 text-neutral-900 font-bold shadow-lg shadow-emerald-500/20">
                    Agendar Mentoria
                </button>
                <button class="px-6 py-3 rounded-lg bg-neutral-800 text-neutral-200 hover:bg-neutral-700">
                    Saber Mais
                </button>
            </div>
        </div>
    </div>
</div> 