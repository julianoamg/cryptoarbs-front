<script>
    import Card from '../../components/forms/Card.svelte';
    import Input from '../../components/forms/Input.svelte';
    import PageHeader from '../../components/forms/PageHeader.svelte';
    import Button from '../../components/forms/Button.svelte';
    
    let user = {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    };

    const handleSubmit = () => {
        // TODO: Implementar lógica de atualização
        console.log('Dados atualizados:', user);
    };

    function maskPhone(event) {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length > 9) value = value.slice(0, 9);
        
        // Formato: XXXX-XXXX ou XXXXX-XXXX
        if (value.length > 4) {
            value = value.slice(0, -4) + '-' + value.slice(-4);
        }
        
        event.target.value = value;
        user.phone = value;
    }
</script>

<div class="flex flex-col items-center">
    <div class="w-full max-w-2xl space-y-8">
        <PageHeader 
            title="Meus Dados"
            description="Atualize suas informações pessoais e dados de acesso."
        />

        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <Card title="Informações Pessoais">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        id="name"
                        type="text"
                        label="Nome completo"
                        bind:value={user.name}
                        placeholder="Digite seu nome completo"
                    />

                    <Input
                        id="email"
                        type="email"
                        label="E-mail"
                        bind:value={user.email}
                        placeholder="Digite seu e-mail"
                    />

                    <Input
                        id="phone"
                        type="tel"
                        label="Telefone"
                        value={user.phone}
                        onInput={maskPhone}
                        placeholder="Digite apenas os números"
                        maxlength="10"
                        class="md:col-span-2"
                    />
                </div>
            </Card>

            <Card title="Alterar Senha">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        id="password"
                        type="password"
                        label="Nova senha"
                        bind:value={user.password}
                        placeholder="Digite sua nova senha"
                    />

                    <Input
                        id="confirmPassword"
                        type="password"
                        label="Confirmar nova senha"
                        bind:value={user.confirmPassword}
                        placeholder="Confirme sua nova senha"
                    />
                </div>
            </Card>

            <!-- Botões -->
            <div class="flex justify-end pt-4">
                <Button type="submit" label="Salvar alterações" />
            </div>
        </form>
    </div>
</div> 