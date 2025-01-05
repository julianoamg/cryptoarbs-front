<script lang="ts">
    import PageHeader from '../../components/forms/PageHeader.svelte';
    import { Target, Users, Calendar, MessageCircle, Zap, Award } from 'lucide-svelte';
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';
    import type { Translation, Language } from '$lib/i18n/types';

    interface Benefit {
        icon: any;
        key: keyof Translation['pages']['mentoring']['benefits'];
    }

    const benefits: Benefit[] = [
        {
            icon: Target,
            key: 'advancedStrategies'
        },
        {
            icon: Users,
            key: 'groupMentoring'
        },
        {
            icon: Calendar,
            key: 'flexibleSchedule'
        },
        {
            icon: MessageCircle,
            key: 'dedicatedSupport'
        },
        {
            icon: Zap,
            key: 'updatedContent'
        },
        {
            icon: Award,
            key: 'certificate'
        }
    ];

    const t = $derived(translations[$language as Language].pages.mentoring);
</script>

<div class="flex flex-col items-center py-4">
    <div class="w-full max-w-7xl space-y-12">
        <PageHeader 
            title={t.title}
            description={t.subtitle}
            icon={Target}
        ></PageHeader>

        <!-- Hero Section -->
        <div class="relative rounded-2xl overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-neutral-900/90"></div>
            <div class="relative flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-12">
                <div class="flex-1 space-y-6">
                    <h2 class="text-3xl font-bold text-neutral-200">
                        {t.hero.title}
                    </h2>
                    <p class="text-lg text-neutral-300">
                        {t.hero.description}
                    </p>
                    <button class="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-400 text-neutral-900 font-bold shadow-lg shadow-emerald-500/20">
                        {t.hero.cta}
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
                        {#if benefit.icon}
                            <benefit.icon class="w-6 h-6 text-emerald-500" />
                        {/if}
                    </div>
                    <h3 class="text-xl font-bold text-neutral-200 mb-2">{t.benefits[benefit.key].title}</h3>
                    <p class="text-neutral-400">{t.benefits[benefit.key].description}</p>
                </div>
            {/each}
        </div>

        <!-- CTA Section -->
        <div class="max-w-3xl mx-auto text-center space-y-6">
            <h2 class="text-2xl font-bold text-neutral-200">
                {t.cta.title}
            </h2>
            <p class="text-lg text-neutral-400">
                {t.cta.description}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-400 text-neutral-900 font-bold shadow-lg shadow-emerald-500/20">
                    {t.cta.primary}
                </button>
                <button class="px-6 py-3 rounded-lg bg-neutral-800 text-neutral-200 hover:bg-neutral-700">
                    {t.cta.secondary}
                </button>
            </div>
        </div>
    </div>
</div> 