import { PUBLIC_API_URL } from '$env/static/public';
import type { PaginatedResponse } from '$lib/types/api';

export interface Exchange {
    id: string;
    name: string;
    logo: string;
    url: string;
    created: string;
    modified: string;
}

export interface ExchangeCredential {
    id: string;
    exchange: Exchange;
    api_key: string;
    api_secret: string;
    created: string;
    modified: string;
}

export interface UserOpportunity {
    id: string;
    symbol: string;
    exchange_a_name: string;
    exchange_b_name: string;
    profit: string;
    profit_fee: string;
    profit_value: string;
    spread: string;
    stake: string;
    status: string;
    created: string;
    modified: string;
    exchange_a_order_id: string;
    exchange_a_close_order_id: string;
    exchange_a_open_price: string;
    exchange_a_open_qty: string;
    exchange_a_close_price: string;
    exchange_a_close_qty: string;
    exchange_a_entrance_fee: string;
    exchange_a_entrance_fee_currency: string;
    exchange_a_close_fee: string;
    exchange_a_close_fee_currency: string;
    exchange_b_order_id: string;
    exchange_b_open_price: string;
    exchange_b_open_qty: string;
    exchange_b_close_price: string;
    exchange_b_close_qty: string;
    exchange_b_close_order_id: string;
    exchange_b_entrance_fee: string;
    exchange_b_entrance_fee_currency: string;
    exchange_b_close_fee: string;
    exchange_b_close_fee_currency: string;
    log: string;
}

export interface ArbitrageOpportunity {
    id: string;
    exchange_a: string;
    exchange_b: string;
    exchange_a_price: string;
    exchange_b_price: string;
    exchange_a_volume: string;
    exchange_b_volume: string;
    spread: string;
    profit_fee: string;
    profit: string;
    created: string;
    modified: string;
    symbol?: string;
    category?: string;
    exchange_a_url?: string;
    exchange_b_url?: string;
}

export async function getExchanges(token: string): Promise<Exchange[]> {
    const response = await fetch(`${PUBLIC_API_URL}/exchanges/`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch exchanges');
    }

    return await response.json();
}

export async function addExchangeCredentials(token: string, data: { exchange: string; api_key: string; api_secret: string }): Promise<ExchangeCredential> {
    const response = await fetch(`${PUBLIC_API_URL}/exchanges/credentials/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to add exchange credentials');
    }

    return await response.json();
}

export async function deleteExchangeCredential(token: string, id: string): Promise<void> {
    const response = await fetch(`${PUBLIC_API_URL}/exchanges/credentials/${id}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to delete exchange credential');
    }
}

export async function getUserOperations(token: string, page: number = 1): Promise<PaginatedResponse<UserOpportunity>> {
    const response = await fetch(`${PUBLIC_API_URL}/exchanges/opportunities/user/?page=${page}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user operations');
    }

    return await response.json();
}

export async function getOpportunities(token: string): Promise<PaginatedResponse<ArbitrageOpportunity>> {
    const response = await fetch(`${PUBLIC_API_URL}/exchanges/opportunities/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch opportunities');
    }

    return await response.json();
} 