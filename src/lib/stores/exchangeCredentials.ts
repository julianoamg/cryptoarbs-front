import { writable } from 'svelte/store';

interface ExchangeCredentialsStore {
    showModal: boolean;
}

function createExchangeCredentialsStore() {
    const { subscribe, update } = writable<ExchangeCredentialsStore>({
        showModal: false
    });

    return {
        subscribe,
        showModal: () => update(state => ({ ...state, showModal: true })),
        hideModal: () => update(state => ({ ...state, showModal: false }))
    };
}

export const exchangeCredentials = createExchangeCredentialsStore(); 