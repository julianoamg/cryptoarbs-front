<script>
    import Card from '../../components/forms/Card.svelte';
    import FormField from '../../components/forms/FormField.svelte';
    import PageHeader from '../../components/forms/PageHeader.svelte';
    import Button from '../../components/forms/Button.svelte';
    import { UserCircle } from 'lucide-svelte';
    import { language } from '$lib/stores/i18n';
    import { translations } from '$lib/i18n/translations';
    import { auth } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { toast } from '$lib/stores/toast';
    import { PUBLIC_API_URL } from '$env/static/public';
    
    let user = {
        first_name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    };

    let originalUser = {};
    let loading = false;
    let fieldErrors = {
        non_field_errors: [],
        first_name: [],
        email: [],
        phone: [],
        password: []
    };

    $: t = translations[$language];

    onMount(async () => {
        if ($auth.token) {
            try {
                const response = await fetch(`${PUBLIC_API_URL}/auth/me/`, {
                    headers: {
                        'Authorization': `Token ${$auth.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                user = {
                    ...user,
                    first_name: data.first_name,
                    email: data.email,
                    phone: data.phone || ''
                };
                originalUser = { ...user };
            } catch (error) {
                toast.error(t.menu.erro.carregarDados);
            }
        }
    });

    const handleSubmit = async () => {
        if (loading) return;
        
        // Reset errors
        fieldErrors = {
            non_field_errors: [],
            first_name: [],
            email: [],
            phone: [],
            password: []
        };

        // Check if any field was changed
        const hasChanges = Object.keys(user).some(key => user[key] !== originalUser[key]);
        if (!hasChanges) {
            toast.error(t.messages.error.semAlteracoes);
            return;
        }

        // Validate password if it was changed
        if (user.password || user.confirmPassword) {
            if (user.password !== user.confirmPassword) {
                fieldErrors.password = [t.messages.error.senhasNaoCoincidem];
                return;
            }
        }

        loading = true;
        try {
            const response = await fetch(`${PUBLIC_API_URL}/auth/me/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${$auth.token}`
                },
                body: JSON.stringify({
                    first_name: user.first_name,
                    email: user.email,
                    phone: user.phone,
                    ...(user.password ? { password: user.password } : {})
                })
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle API validation errors
                if (response.status === 400) {
                    fieldErrors = {
                        ...fieldErrors,
                        ...data
                    };
                    return;
                }
                throw new Error('Failed to update user data');
            }

            originalUser = { ...user };
            toast.success(t.messages.success.dadosAtualizados);
        } catch (error) {
            toast.error(t.messages.error.atualizarDados);
        } finally {
            loading = false;
        }
    };

    function maskPhone(event) {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        // Format: (XX) XXXXX-XXXX
        if (value.length > 2) {
            value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
        }
        if (value.length > 9) {
            value = value.slice(0, -4) + '-' + value.slice(-4);
        }
        
        event.target.value = value;
        user.phone = value;
    }
</script>

<div class="flex flex-col items-center">
    <div class="w-full max-w-2xl space-y-8">
        <PageHeader 
            title={t.pages.settings.title}
            description={t.pages.settings.subtitle}
            icon={UserCircle}
        ></PageHeader>

        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <Card title={t.menu.meusDados}>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        name="first_name"
                        label={t.auth.cadastro.nome}
                        bind:value={user.first_name}
                        placeholder={t.auth.cadastro.nome}
                        errors={fieldErrors}
                    />

                    <FormField
                        name="email"
                        type="email"
                        label={t.auth.cadastro.email}
                        bind:value={user.email}
                        placeholder="seu@email.com"
                        errors={fieldErrors}
                    />

                    <FormField
                        name="phone"
                        type="tel"
                        label={t.auth.cadastro.whatsapp}
                        value={user.phone}
                        onInput={maskPhone}
                        placeholder="+55 (11) 99999-9999"
                        maxlength="16"
                        errors={fieldErrors}
                        class="md:col-span-2"
                    />
                </div>
            </Card>

            <Card title={t.auth.cadastro.senha}>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        name="password"
                        type="password"
                        label={t.auth.cadastro.senha}
                        bind:value={user.password}
                        placeholder="••••••••"
                        errors={fieldErrors}
                    />

                    <FormField
                        name="confirmPassword"
                        type="password"
                        label={t.auth.cadastro.confirmarSenha}
                        bind:value={user.confirmPassword}
                        placeholder="••••••••"
                        errors={fieldErrors}
                    />
                </div>
            </Card>

            <!-- Botões -->
            <div class="flex justify-end pt-4">
                <Button 
                    type="submit" 
                    label={loading ? t.auth.cadastro.salvando : t.auth.cadastro.salvar}
                    disabled={loading} 
                />
            </div>
        </form>
    </div>
</div> 