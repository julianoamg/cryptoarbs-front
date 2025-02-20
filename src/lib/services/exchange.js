import { PUBLIC_API_URL } from '$env/static/public';

/**
 * @typedef {Object} Exchange
 * @property {string} id - UUID of the exchange
 * @property {string} name - Name of the exchange
 * @property {boolean} is_preferred - Whether the exchange is preferred
 */

/**
 * @typedef {Object} ArbitrageOpportunity
 * @property {string} id - UUID of the opportunity
 * @property {string} exchange_a - Name of exchange A
 * @property {string} exchange_b - Name of exchange B
 * @property {string} exchange_a_price - Price in exchange A
 * @property {string} exchange_b_price - Price in exchange B
 * @property {string} spread - Price spread percentage
 * @property {string} profit_fee - Profit after fees
 * @property {string} profit - Total profit percentage
 * @property {string} created - Creation timestamp
 * @property {string} modified - Last modification timestamp
 * @property {string} symbol - Trading pair symbol (e.g. BTC/USDT)
 */

/**
 * Fetches the list of available exchanges
 * @param {string} accessToken - Current access token
 * @returns {Promise<Exchange[]>} List of exchanges
 */
export async function getExchanges(accessToken) {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/exchanges/list/`, {
            headers: {
                'Authorization': `Token ${accessToken}`
            }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Failed to fetch exchanges');
        }

        const data = await response.json();
        return data.results;
    } catch (err) {
        if (err instanceof Error) {
            throw err;
        }
        throw new Error('Failed to connect to the server');
    }
}

/**
 * Fetches arbitrage opportunities from the API
 * @param {string} accessToken - Current access token
 * @returns {Promise<ArbitrageOpportunity[]>} List of arbitrage opportunities
 */
export async function getOpportunities(accessToken) {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/exchanges/opportunities/`, {
            headers: {
                'Authorization': `Token ${accessToken}`
            }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Failed to fetch opportunities');
        }
        const data = await response.json();
        
        // Round profit fields to 2 decimal places and format prices with 6 decimal places
        const opportunities = data.results.map(opportunity => ({
            ...opportunity,
            profit: opportunity.profit ? Number(opportunity.profit.replace('$', '')).toFixed(2) : '0.00',
            profit_fee: opportunity.profit_fee ? Number(opportunity.profit_fee.replace('$', '')).toFixed(2) : '0.00',
            exchange_a_price: opportunity.exchange_a_price ? Number(opportunity.exchange_a_price.replace('$', '')).toFixed(6) : '0.000000',
            exchange_b_price: opportunity.exchange_b_price ? Number(opportunity.exchange_b_price.replace('$', '')).toFixed(6) : '0.000000',
            spread: opportunity.spread ? opportunity.spread.replace('$', '') : '0'
        }));
        
        return { results: opportunities };
    } catch (err) {
        if (err instanceof Error) {
            throw err;
        }
        throw new Error('Failed to connect to the server');
    }
}

/**
 * Adds new exchange credentials
 * @param {string} accessToken - Current access token
 * @param {Object} credentials - Exchange credentials
 * @param {string} credentials.exchange - Exchange UUID
 * @param {string} credentials.api_key - API Key
 * @param {string} credentials.api_secret - API Secret
 * @param {string} [credentials.passphrase] - Optional passphrase for some exchanges
 * @returns {Promise<Object>} Response from the server
 */
export async function addExchangeCredentials(accessToken, credentials) {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/exchanges/credentials/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Failed to add exchange credentials');
        }

        return await response.json();
    } catch (err) {
        if (err instanceof Error) {
            throw err;
        }
        throw new Error('Failed to connect to the server');
    }
} 