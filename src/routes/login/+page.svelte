<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';
    let loading = false;
    let error = '';

    async function handleSubmit() {
        loading = true;
        error = '';

        try {
            // TODO: Implementar lógica de autenticação
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulação de delay
            goto('/');
        } catch (err) {
            error = 'Credenciais inválidas. Por favor, tente novamente.';
        } finally {
            loading = false;
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-neutral-950 p-4">
    <div class="w-full max-w-md">
        <!-- Logo ou Título -->
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-neutral-200">CryptoArbs</h1>
            <p class="mt-2 text-neutral-400">Faça login para continuar</p>
        </div>

        <!-- Card do Formulário -->
        <div class="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6">
            <form on:submit|preventDefault={handleSubmit} class="space-y-6">
                <!-- Campo de Email -->
                <div>
                    <label for="email" class="block text-sm font-medium text-neutral-400 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        bind:value={email}
                        required
                        class="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="seu@email.com"
                    />
                </div>

                <!-- Campo de Senha -->
                <div>
                    <label for="password" class="block text-sm font-medium text-neutral-400 mb-1">
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        bind:value={password}
                        required
                        class="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="••••••••"
                    />
                </div>

                <!-- Mensagem de Erro -->
                {#if error}
                    <div class="text-red-500 text-sm">{error}</div>
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
                            <span>Entrando...</span>
                        </div>
                    {:else}
                        Entrar
                    {/if}
                </button>

                <!-- Links Adicionais -->
                <div class="flex items-center justify-between text-sm">
                    <a href="/cadastro" class="text-emerald-500 hover:text-emerald-400 transition-colors">
                        Criar conta
                    </a>
                    <a href="/recuperar-senha" class="text-emerald-500 hover:text-emerald-400 transition-colors">
                        Esqueceu a senha?
                    </a>
                </div>
            </form>
        </div>
    </div>
</div> 