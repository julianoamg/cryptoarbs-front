<script>
    import { goto } from '$app/navigation';
    import { handleApiResponse } from '$lib/utils/api';
    import { PUBLIC_API_URL } from '$env/static/public';
    import FormField from '../../components/forms/FormField.svelte';
    import LanguageSelector from '../../components/LanguageSelector.svelte';
    import PageHeader from '../../components/forms/PageHeader.svelte';
    import { toast } from '$lib/stores/toast';
    import { auth } from '$lib/stores/auth';
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';

    let first_name = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let phone = '';
    let loading = false;
    let fieldErrors = {
        non_field_errors: [],
        password: []
    };

    $: t = translations[$language];

    async function handleSubmit() {
        loading = true;
        fieldErrors = {
            non_field_errors: [],
            password: []
        };

        if (password !== confirmPassword) {
            fieldErrors.password = [t.messages.error.senhasNaoCoincidem];
            loading = false;
            return;
        }

        try {
            // Register user
            const registerResponse = await fetch(`${PUBLIC_API_URL}/auth/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ first_name, email, password, phone }),
            });

            const registerData = await registerResponse.json();
            
            if (!registerResponse.ok) {
                fieldErrors = handleApiResponse(registerResponse, registerData);
                return;
            }

            toast.success(t.messages.success.contaCriada);

            // Automatic login
            const loginResponse = await fetch(`${PUBLIC_API_URL}/auth/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const loginData = await loginResponse.json();

            if (!loginResponse.ok) {
                toast.error(t.messages.error.loginAutomatico);
                goto('/login');
                return;
            }

            auth.setAuth(loginData);
            toast.success(t.messages.success.loginSucesso);
            goto('/');
        } catch (err) {
            fieldErrors.non_field_errors = [err.message];
        } finally {
            loading = false;
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-neutral-950 p-4">
    <div class="w-full max-w-md">
        <div class="mb-8">
            <PageHeader 
                title="CryptoArbs"
                description={t.auth.cadastro.titulo}
            ></PageHeader>
        </div>

        <!-- Card do Formulário -->
        <div class="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6">
            <form on:submit|preventDefault={handleSubmit} class="space-y-6">
                <FormField
                    name="first_name"
                    type="text"
                    label={t.auth.cadastro.nome}
                    bind:value={first_name}
                    placeholder={t.auth.cadastro.nome}
                    errors={fieldErrors}
                />

                <FormField
                    name="email"
                    type="email"
                    label={t.auth.cadastro.email}
                    bind:value={email}
                    placeholder="seu@email.com"
                    errors={fieldErrors}
                />

                <FormField
                    name="phone"
                    type="tel"
                    label={t.auth.cadastro.whatsapp}
                    bind:value={phone}
                    placeholder="+55 (11) 99999-9999"
                    errors={fieldErrors}
                />

                <FormField
                    name="password"
                    type="password"
                    label={t.auth.cadastro.senha}
                    bind:value={password}
                    placeholder="••••••••"
                    errors={fieldErrors}
                />

                <FormField
                    name="confirmPassword"
                    type="password"
                    label={t.auth.cadastro.confirmarSenha}
                    bind:value={confirmPassword}
                    placeholder="••••••••"
                    errors={fieldErrors}
                />

                <!-- Mensagem de Erro Geral -->
                {#if fieldErrors.non_field_errors}
                    <div class="text-red-500 text-sm">{fieldErrors.non_field_errors[0]}</div>
                {/if}

                <!-- Botão de Cadastro -->
                <button
                    type="submit"
                    disabled={loading}
                    class="w-full bg-emerald-500 text-black font-medium py-2 px-4 rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {#if loading}
                        <div class="flex items-center justify-center space-x-2">
                            <div class="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin"></div>
                            <span>{t.auth.cadastro.criando}</span>
                        </div>
                    {:else}
                        {t.auth.cadastro.criar}
                    {/if}
                </button>

                <!-- Links Adicionais -->
                <div class="flex items-center justify-center text-sm">
                    <span class="text-neutral-400">{t.auth.cadastro.jaTemConta}</span>
                    <a href="/login" class="ml-1 text-emerald-500 hover:text-emerald-400 transition-colors">
                        {t.auth.cadastro.entrar}
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