<script>
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';
    import { ChevronDown, BookOpen } from 'lucide-svelte';
    import PageHeader from '../../components/forms/PageHeader.svelte';

    $: t = translations[$language];

    let openFaqs = {};

    function toggleFaq(index) {
        openFaqs[index] = !openFaqs[index];
        openFaqs = openFaqs; // Trigger reactivity
    }
</script>

<div class="max-w-4xl mx-auto p-4 space-y-8">
    <PageHeader 
        title={t.pages.gettingStarted.title}
        description={t.pages.gettingStarted.subtitle}
        icon={BookOpen}
    ></PageHeader>

    <div class="space-y-4">
        {#each t.pages.gettingStarted.faqs as faq, index}
            <div class="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/50">
                <button
                    class="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-neutral-800/30 transition-colors"
                    on:click={() => toggleFaq(index)}
                >
                    <span class="text-neutral-200 font-medium">{faq.question}</span>
                    <span class="transform transition-transform duration-200" class:rotate-180={openFaqs[index]}>
                        <ChevronDown class="w-5 h-5 text-neutral-400" />
                    </span>
                </button>
                {#if openFaqs[index]}
                    <div class="px-6 py-4 border-t border-neutral-800 bg-neutral-900/30">
                        <p class="text-neutral-300 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                        </p>
                    </div>
                {/if}
            </div>
        {/each}
    </div>

    <div class="mt-8 p-6 border border-emerald-500/20 rounded-lg bg-emerald-500/5">
        <h2 class="text-xl font-semibold text-emerald-500 mb-2">{t.pages.gettingStarted.importantTip.title}</h2>
        <p class="text-neutral-300">
            {t.pages.gettingStarted.importantTip.content}
        </p>
    </div>
</div> 