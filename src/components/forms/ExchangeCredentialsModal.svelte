<script lang="ts">
    import { X } from 'lucide-svelte';
    import { language } from '$lib/stores/i18n';
    import type { Translation, Language } from '$lib/i18n/types';
    import { translations } from '$lib/i18n/translations';
    import { toast } from '$lib/stores/toast';
    import { auth } from '$lib/stores/auth';
    import ValidatedField from './ValidatedField.svelte';
    import { PUBLIC_API_URL } from '$env/static/public';

    $: t = translations[$language as Language] as Translation;

    interface Exchange {
        id: string;
        name: string;
        has_passphrase: boolean;
        credentials_video?: string;
        credentials_link?: string;
    }

    export let show = false;
    export let onClose = () => {};
    export let onSuccess = () => {};

    let loading = false;
    let exchanges: Exchange[] = [];
    let selectedExchange = '';
    let apiKey = '';
    let apiSecret = '';
    let passphrase = '';
    let errors: { [key: string]: string } = {};
    let generalError = '';
    let videoUrl: string | undefined = undefined;

    $: selectedExchangeData = exchanges.find(e => e.id === selectedExchange);
    $: showPassphrase = selectedExchangeData?.has_passphrase;
    $: {
        if (selectedExchangeData?.credentials_video) {
            try {
                const url = new URL(selectedExchangeData.credentials_video);
                const videoId = url.searchParams.get('v');
                videoUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
            } catch (error) {
                console.error('Error parsing video URL:', error);
                videoUrl = undefined;
            }
        } else {
            videoUrl = undefined;
        }
    }

    async function fetchExchanges() {
        try {
            const response = await fetch(`${PUBLIC_API_URL}/exchanges/list/`, {
                headers: {
                    'Authorization': `Token ${$auth.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Falha ao carregar lista de exchanges');
            }

            const data = await response.json();
            const allowedExchanges = ['bybit', 'bitget', 'kucoin'];
            exchanges = data.results.filter((exchange: Exchange) => 
                allowedExchanges.includes(exchange.name.toLowerCase())
            );
            console.log('Exchanges loaded:', exchanges);
        } catch (error) {
            console.error('Error fetching exchanges:', error);
            generalError = 'Falha ao carregar lista de exchanges';
        }
    }

    function resetForm() {
        selectedExchange = '';
        apiKey = '';
        apiSecret = '';
        passphrase = '';
        errors = {};
        generalError = '';
    }

    function validateForm(): boolean {
        return !Object.values(errors).some(error => error !== undefined) && 
               Boolean(selectedExchange) && 
               Boolean(apiKey) && 
               Boolean(apiSecret) && 
               (!showPassphrase || Boolean(passphrase));
    }

    async function handleSubmit(event: Event) {
        event.preventDefault();
        
        if (loading) return;

        // Limpa erro geral
        generalError = '';

        // Valida o formulário
        if (!validateForm()) {
            return;
        }

        loading = true;
        try {
            const credentials = {
                exchange: selectedExchange,
                api_key: apiKey.trim(),
                api_secret: apiSecret.trim(),
                ...(showPassphrase ? { passphrase: passphrase.trim() } : {})
            };

            const response = await fetch(`${PUBLIC_API_URL}/exchanges/credentials/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${$auth.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 400) {
                    // Mapeia os erros da API para os campos
                    Object.entries(data).forEach(([key, value]) => {
                        const errorMessage = Array.isArray(value) ? value[0] : value;
                        switch (key) {
                            case 'exchange':
                                errors.exchange = errorMessage;
                                break;
                            case 'api_key':
                                errors.api_key = errorMessage;
                                break;
                            case 'api_secret':
                                errors.api_secret = errorMessage;
                                break;
                            case 'passphrase':
                                errors.passphrase = errorMessage;
                                break;
                            default:
                                generalError = errorMessage;
                        }
                    });
                    return;
                }
                throw new Error(data.detail || 'Erro ao adicionar credenciais');
            }

            toast.success('Credenciais adicionadas com sucesso');
            resetForm();
            await onSuccess();
            onClose();
        } catch (error) {
            console.error('Error adding credentials:', error);
            generalError = error instanceof Error ? error.message : 'Erro ao adicionar credenciais';
        } finally {
            loading = false;
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            onClose();
        }
    }

    // Carrega a lista de exchanges quando o modal é aberto
    $: if (show) {
        fetchExchanges();
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

{#if show}
    <div 
        class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 w-full h-full" 
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
    >
        <!-- Overlay para fechar o modal -->
        <button
            type="button"
            class="fixed inset-0 w-full h-full cursor-default focus:outline-none"
            on:click={onClose}
            aria-label="Fechar modal"
        ></button>

        <!-- Conteúdo do Modal -->
        <div class="fixed inset-0 overflow-y-auto pointer-events-none">
            <div class="flex min-h-full items-center justify-center p-4">
                <div 
                    class="w-full max-w-lg bg-neutral-900 rounded-lg shadow-xl pointer-events-auto focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    tabindex="-1"
                >
                    <header class="flex items-center justify-between p-4 border-b border-neutral-800">
                        <h3 id="modal-title" class="text-lg font-medium text-neutral-200">{t.pages.credentials.modal.title}</h3>
                        <button 
                            type="button"
                            class="text-neutral-400 hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 rounded-lg p-1"
                            on:click={onClose}
                            aria-label="Fechar modal"
                        >
                            <X class="w-5 h-5" />
                        </button>
                    </header>

                    <div class="p-4">
                        <form 
                            on:submit|preventDefault={handleSubmit} 
                            class="space-y-4"
                        >
                            {#if generalError}
                                <div class="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm" role="alert">
                                    {generalError}
                                </div>
                            {/if}

                            <ValidatedField
                                type="select"
                                name="exchange"
                                label={t.pages.credentials.modal.exchange.label}
                                bind:value={selectedExchange}
                                error={errors.exchange}
                                description={t.pages.credentials.modal.exchange.description}
                                options={exchanges.map(e => ({ value: e.id, label: e.name }))}
                                placeholder={t.pages.credentials.modal.exchange.placeholder}
                            />

                            {#if selectedExchange}
                                <div class="mt-4 rounded bg-neutral-800/50 border border-neutral-700">
                                    {#if selectedExchangeData?.credentials_link}
                                        <div class="p-4 border-b border-neutral-700">
                                            <a 
                                                href={selectedExchangeData.credentials_link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                class="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-emerald-500 bg-emerald-500/10 rounded border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                                            >
                                                Gerar Credenciais na {selectedExchangeData.name}
                                            </a>
                                        </div>
                                    {/if}
                                    {#if videoUrl}
                                        <div class="p-4 {selectedExchangeData?.credentials_link ? '' : 'border-b border-neutral-700'}">
                                            <h4 class="text-sm font-medium text-neutral-200">
                                                Tutorial: Como gerar credenciais na {selectedExchangeData?.name}
                                            </h4>
                                        </div>
                                        <div class="relative w-full" style="padding-top: 56.25%;">
                                            <iframe
                                                src={videoUrl}
                                                class="absolute inset-0 w-full h-full"
                                                title="Tutorial de credenciais"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen
                                            ></iframe>
                                        </div>
                                    {:else}
                                        <div class="p-4 text-sm text-neutral-400">
                                            Nenhum vídeo tutorial disponível para esta exchange.
                                        </div>
                                    {/if}
                                </div>
                            {/if}

                            <ValidatedField
                                type="text"
                                name="api_key"
                                label={t.pages.credentials.modal.apiKey.label}
                                bind:value={apiKey}
                                error={errors.api_key}
                                minLength={10}
                                description={t.pages.credentials.modal.apiKey.description}
                            />

                            <ValidatedField
                                type="text"
                                name="api_secret"
                                label={t.pages.credentials.modal.apiSecret.label}
                                bind:value={apiSecret}
                                error={errors.api_secret}
                                minLength={10}
                                description={t.pages.credentials.modal.apiSecret.description}
                            />

                            {#if showPassphrase}
                                <ValidatedField
                                    type="text"
                                    name="passphrase"
                                    label={t.pages.credentials.modal.passphrase.label}
                                    bind:value={passphrase}
                                    error={errors.passphrase}
                                    description={t.pages.credentials.modal.passphrase.description}
                                />
                            {/if}

                            <div class="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    class="flex items-center justify-center gap-2 px-4 py-2 rounded bg-neutral-800 border border-neutral-700 text-neutral-200 hover:bg-neutral-700 transition-colors text-sm font-medium"
                                    on:click={onClose}
                                >
                                    {t.pages.credentials.modal.buttons.cancel}
                                </button>
                                <button
                                    type="submit"
                                    class="flex items-center justify-center gap-2 px-4 py-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    {loading ? t.loading : t.pages.credentials.modal.buttons.save}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if} 