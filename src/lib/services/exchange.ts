import { api } from '$lib/utils/api';

export async function getExchanges(token: string) {
    const response = await api.get('/exchanges', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export async function getOpportunities(token: string) {
    const response = await api.get('/opportunities', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export async function getTradingPairs(token: string, exchangeId: string) {
    const response = await api.get(`/exchanges/${exchangeId}/pairs`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export async function saveExchangeSettings(token: string, settings: any) {
    const response = await api.post('/settings/exchanges', settings, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
} 