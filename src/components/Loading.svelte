<script>
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';
    import { fade } from 'svelte/transition';

    export let noData = false;

    $: t = translations[$language];
    $: message = noData ? 'Buscando Oportunidades' : t.loading || 'Loading...';
</script>

<style>
    .spinner {
        width: 60px;
        height: 60px;
        border: 3px solid #1f2937;
        border-top-color: #10b981;
        border-radius: 50%;
        animation: spin 0.8s infinite linear;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .gradient-bg {
        background: linear-gradient(90deg, 
            rgba(17, 24, 39, 0.2), 
            rgba(31, 41, 55, 0.15),
            rgba(16, 185, 129, 0.1)
        );
        background-size: 200% 100%;
        animation: gradient 8s ease infinite;
    }
</style>

<div class="gradient-bg rounded-xl p-12 backdrop-blur-[2px]" transition:fade>
    <div class="flex flex-col items-center gap-8">
        <div class="spinner"></div>
        <div class="text-center">
            <p class="text-2xl font-medium text-neutral-100">{message}</p>
            {#if noData}
                <p class="mt-3 text-lg text-neutral-400">{t.pages?.home?.waitingMessage}</p>
            {/if}
        </div>
    </div>
</div> 