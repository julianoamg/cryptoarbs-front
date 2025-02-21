<script lang="ts">
    import { language } from '$lib/stores/i18n';
    import type { Translation } from '$lib/i18n/types';
    import { translations } from '$lib/i18n/translations';
    import { toast } from '$lib/stores/toast';
    import { auth } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { exchangeCredentials } from '$lib/stores/exchangeCredentials';
    import PageHeader from '../../../components/forms/PageHeader.svelte';
    import Card from '../../../components/forms/Card.svelte';
    import ExchangeCredentialsModal from '../../../components/forms/ExchangeCredentialsModal.svelte';
    import { Key, Plus, Trash2 } from 'lucide-svelte';
    import { getExchanges, getExchangeCredentials, deleteExchangeCredential } from '$lib/services/exchange';

    interface Exchange {
        id: string;
        name: string;
        marked: boolean;
    }

    interface ExchangeCredential {
        id: string;
        exchange: string;
        exchange_name: string;
        api_key_masked: string;
        api_secret_masked: string;
        passphrase_masked?: string;
    }

    $: t = translations[$language] as Translation;

    let exchanges: Exchange[] = [];
    let credentials: ExchangeCredential[] = [];
    let loading = true;

    onMount(async () => {
        if ($auth.token) {
            await Promise.all([
                fetchExchanges(),
                fetchCredentials()
            ]);
            loading = false;
        }
    });

    async function fetchExchanges() {
        try {
            const data = await getExchanges($auth.token);
            exchanges = data;
            loading = false;
        } catch (error) {
            console.error('Failed to fetch exchanges:', error);
            toast.error('Falha ao carregar exchanges');
            loading = false;
        }
    }

    async function fetchCredentials() {
        try {
            const data = await getExchangeCredentials($auth.token);
            credentials = data.results;
        } catch (error) {
            console.error('Failed to fetch credentials:', error);
            toast.error('Falha ao carregar credenciais');
        }
    }

    async function handleDeleteCredential(credential: ExchangeCredential) {
        if (!confirm(`Tem certeza que deseja remover as credenciais da ${credential.exchange_name}?`)) {
            return;
        }

        try {
            await deleteExchangeCredential($auth.token, credential.id);
            
            // Se a credencial removida for da KuCoin, procura e remove também a KuCoin Futures
            if (credential.exchange_name.toLowerCase().replace(/\s+/g, '') === 'kucoin') {
                const kuCoinFutures = credentials.find(cred => 
                    cred.exchange_name.toLowerCase().replace(/\s+/g, '') === 'kucoinfutures'
                );
                
                if (kuCoinFutures) {
                    await deleteExchangeCredential($auth.token, kuCoinFutures.id);
                }
            }

            toast.success('Credencial removida com sucesso');
            await fetchCredentials();
        } catch (error) {
            console.error('Failed to delete credential:', error);
            toast.error('Falha ao remover credencial');
        }
    }
</script>

<div class="flex flex-col items-center">
    <div class="w-full max-w-5xl space-y-6">
        <PageHeader 
            title={t.pages.credentials.title}
            description={t.pages.credentials.subtitle}
            icon={Key}
        />

        <Card>
            <div class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 class="text-lg font-bold text-neutral-200">{t.pages.credentials.cardTitle}</h2>
                        <p class="text-sm text-neutral-400 mt-1">{t.pages.credentials.subtitle}</p>
                    </div>
                    <button
                        class="flex items-center justify-center gap-2 px-4 py-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20 transition-colors w-full sm:w-auto"
                        on:click={() => exchangeCredentials.showModal()}
                    >
                        <Plus class="w-4 h-4" />
                        <span class="text-sm font-medium">{t.pages.credentials.addButton}</span>
                    </button>
                </div>

                {#if loading}
                    <div class="flex items-center justify-center py-12">
                        <div class="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                    </div>
                {:else if credentials.length === 0}
                    <div class="flex flex-col items-center justify-center py-12 text-center">
                        <Key class="w-12 h-12 text-neutral-500 mb-4" />
                        <p class="text-neutral-400">{t.pages.credentials.noCredentials}</p>
                        <p class="text-sm text-neutral-500 mt-1">{t.pages.credentials.addHint}</p>
                    </div>
                {:else}
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {#each credentials.filter(cred => cred.exchange_name.toLowerCase().replace(/\s+/g, '') !== 'kucoinfutures') as credential}
                            <div class="p-4 rounded bg-neutral-900/50 border border-neutral-800">
                                <div class="flex items-start justify-between">
                                    <div class="space-y-2">
                                        <div>
                                            <h3 class="font-medium text-neutral-200">
                                                {exchanges.find(e => e.id === credential.exchange)?.name || credential.exchange_name}
                                            </h3>
                                            <p class="text-xs text-emerald-500 mt-1">{t.pages.credentials.configuredStatus}</p>
                                        </div>
                                        <div class="space-y-1">
                                            <div class="flex items-center gap-2">
                                                <span class="text-xs text-neutral-400">{t.pages.credentials.fields.apiKey}:</span>
                                                <span class="text-xs font-mono text-neutral-300">{credential.api_key_masked}</span>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <span class="text-xs text-neutral-400">{t.pages.credentials.fields.apiSecret}:</span>
                                                <span class="text-xs font-mono text-neutral-300">{credential.api_secret_masked}</span>
                                            </div>
                                            {#if credential.passphrase_masked}
                                                <div class="flex items-center gap-2">
                                                    <span class="text-xs text-neutral-400">{t.pages.credentials.fields.passphrase}:</span>
                                                    <span class="text-xs font-mono text-neutral-300">{credential.passphrase_masked}</span>
                                                </div>
                                            {/if}
                                        </div>
                                    </div>
                                    <button
                                        class="p-2 text-neutral-400 hover:text-red-400 transition-colors"
                                        aria-label={t.pages.credentials.deleteConfirm}
                                        on:click={() => handleDeleteCredential(credential)}
                                    >
                                        <Trash2 class="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </Card>
    </div>
</div>

{#if $exchangeCredentials.showModal}
    <ExchangeCredentialsModal
        show={true}
        onClose={() => exchangeCredentials.hideModal()}
        onSuccess={fetchCredentials}
    />
{/if} 