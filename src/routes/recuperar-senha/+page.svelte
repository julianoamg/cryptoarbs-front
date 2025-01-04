<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    let email = '';
    let loading = false;
    let error = '';
    let success = false;

    async function handleSubmit() {
        loading = true;
        error = '';
        success = false;

        try {
            // TODO: Implementar lógica de recuperação de senha
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulação de delay
            success = true;
        } catch (err) {
            error = 'Erro ao enviar email de recuperação. Por favor, tente novamente.';
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
            <p class="mt-2 text-neutral-400">Recupere sua senha</p>
        </div>

        <!-- Card do Formulário -->
        <div class="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6">
            {#if success}
                <div class="text-center space-y-4">
                    <div class="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-neutral-200">Email enviado</h3>
                    <p class="text-neutral-400">
                        Enviamos as instruções de recuperação de senha para o seu email.
                    </p>
                    <div class="pt-4">
                        <a
                            href="/login"
                            class="inline-block w-full bg-emerald-500 text-black font-medium py-2 px-4 rounded-lg hover:bg-emerald-400 transition-colors text-center"
                        >
                            Voltar para o login
                        </a>
                    </div>
                </div>
            {:else}
                <div class="space-y-4">
                    <p class="text-neutral-400">
                        Digite seu email e enviaremos as instruções para recuperar sua senha.
                    </p>
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

                        <!-- Mensagem de Erro -->
                        {#if error}
                            <div class="text-red-500 text-sm">{error}</div>
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
                                    <span>Enviando...</span>
                                </div>
                            {:else}
                                Enviar instruções
                            {/if}
                        </button>

                        <!-- Link para Login -->
                        <div class="text-center text-sm">
                            <a href="/login" class="text-emerald-500 hover:text-emerald-400 transition-colors">
                                Voltar para o login
                            </a>
                        </div>
                    </form>
                </div>
            {/if}
        </div>
    </div>
</div> 