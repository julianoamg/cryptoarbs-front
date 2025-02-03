<script>
    import { goto } from '$app/navigation';
    import { handleApiResponse } from '$lib/utils/api';
    import { PUBLIC_API_URL } from '$env/static/public';
    import FormField from '../../components/forms/FormField.svelte';
    import LanguageSelector from '../../components/LanguageSelector.svelte';
    import PageHeader from '../../components/forms/PageHeader.svelte';
    import { toast } from '$lib/stores/toast';
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';
    import Logo from '$lib/components/Logo.svelte';

    let email = '';
    let loading = false;
    let success = false;
    let fieldErrors = {
        non_field_errors: [],
        email: []
    };

    $: t = translations[$language];

    async function handleSubmit() {
        loading = true;
        fieldErrors = {
            non_field_errors: [],
            email: []
        };
        success = false;

        try {
            const response = await fetch(`${PUBLIC_API_URL}/auth/reset-password/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                fieldErrors = handleApiResponse(response, data);
                return;
            }

            success = true;
            toast.success(t.messages.success.emailRecuperacaoEnviado);
        } catch (err) {
            fieldErrors.non_field_errors = [err.message];
        } finally {
            loading = false;
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-neutral-950 p-4">
    <div class="w-full max-w-md">
        <div class="text-center mb-8">
            <Logo size="large" className="mb-4" />
            <p class="mt-2 text-neutral-400">{t.auth.recuperarSenha.titulo}</p>
        </div>

        <!-- Card do Formulário -->
        <div class="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6">
            {#if success}
                <div class="text-center">
                    <p class="text-emerald-500 mb-4">{t.messages.success.emailRecuperacaoEnviado}</p>
                    <p class="text-neutral-400 text-sm">{t.messages.error.verificarEmail}</p>
                </div>
            {:else}
                <form on:submit|preventDefault={handleSubmit} class="space-y-6">
                    <FormField
                        name="email"
                        type="email"
                        label={t.auth.recuperarSenha.email}
                        bind:value={email}
                        placeholder="seu@email.com"
                        errors={fieldErrors}
                    />

                    <!-- Mensagem de Erro Geral -->
                    {#if fieldErrors.non_field_errors}
                        <div class="text-red-500 text-sm">{fieldErrors.non_field_errors[0]}</div>
                    {/if}

                    <!-- Botão de Enviar -->
                    <button
                        type="submit"
                        disabled={loading}
                        class="w-full bg-emerald-500 text-black font-medium py-2 px-4 rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {#if loading}
                            <div class="flex items-center justify-center space-x-2">
                                <div class="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin"></div>
                                <span>{t.auth.recuperarSenha.enviando}</span>
                            </div>
                        {:else}
                            {t.auth.recuperarSenha.enviar}
                        {/if}
                    </button>

                    <!-- Link para Login -->
                    <div class="text-center">
                        <a href="/login" class="text-emerald-500 hover:text-emerald-400 transition-colors text-sm">
                            {t.auth.recuperarSenha.voltar}
                        </a>
                    </div>
                </form>
            {/if}
        </div>

        <!-- Language Selector -->
        <div class="mt-4 flex justify-center">
            <LanguageSelector />
        </div>
    </div>
</div> 