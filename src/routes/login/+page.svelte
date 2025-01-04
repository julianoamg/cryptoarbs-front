<script lang="ts">
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth';
    import { handleApiResponse } from '$lib/utils/api';
    import { PUBLIC_API_URL } from '$env/static/public';
    import FormField from '../../components/forms/FormField.svelte';
    import LanguageSelector from '../../components/LanguageSelector.svelte';
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let email = '';
    let password = '';
    let loading = false;
    let fieldErrors: { [key: string]: string[] } = {};

    $: t = translations[$language];

    onMount(() => {
        if (browser && $auth.isAuthenticated) {
            goto('/');
        }
    });

    async function handleSubmit() {
        loading = true;
        fieldErrors = {};

        try {
            const response = await fetch(`${PUBLIC_API_URL}/auth/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                fieldErrors = handleApiResponse(response, data);
                return;
            }

            auth.setAuth(data);
            goto('/');
        } catch (err) {
            fieldErrors = { non_field_errors: [(err as Error).message] };
        } finally {
            loading = false;
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-neutral-950 p-4">
    <div class="w-full max-w-md">
        <!-- Logo e Título -->
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-neutral-200">CryptoArbs</h1>
            <p class="mt-2 text-neutral-400">{t.auth.login.titulo}</p>
        </div>

        <!-- Card do Formulário -->
        <div class="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6">
            <form on:submit|preventDefault={handleSubmit} class="space-y-6">
                <FormField
                    name="email"
                    type="email"
                    label={t.auth.login.email}
                    bind:value={email}
                    placeholder="seu@email.com"
                    errors={fieldErrors}
                />

                <FormField
                    name="password"
                    type="password"
                    label={t.auth.login.senha}
                    bind:value={password}
                    placeholder="••••••••"
                    errors={fieldErrors}
                />

                <!-- Mensagem de Erro Geral -->
                {#if fieldErrors.non_field_errors}
                    <div class="text-red-500 text-sm">{fieldErrors.non_field_errors[0]}</div>
                {/if}

                <!-- Botão de Login -->
                <button
                    type="submit"
                    disabled={loading}
                    class="w-full bg-emerald-500 text-black font-medium py-2 px-4 rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {#if loading}
                        <div class="flex items-center justify-center space-x-2">
                            <div class="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin"></div>
                            <span>{t.auth.login.entrando}</span>
                        </div>
                    {:else}
                        {t.auth.login.entrar}
                    {/if}
                </button>

                <!-- Links Adicionais -->
                <div class="flex items-center justify-between text-sm">
                    <a href="/cadastro" class="text-emerald-500 hover:text-emerald-400 transition-colors">
                        {t.auth.login.criarConta}
                    </a>
                    <a href="/recuperar-senha" class="text-emerald-500 hover:text-emerald-400 transition-colors">
                        {t.auth.login.esqueceuSenha}
                    </a>
                </div>
            </form>
        </div>

        <!-- Language Selector -->
        <div class="mt-4 flex justify-center">
            <LanguageSelector />
        </div>
    </div>
</div> 