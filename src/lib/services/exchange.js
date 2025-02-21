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
 * @typedef {Object} ExchangeCredential
 * @property {string} id - UUID of the credential
 * @property {string} exchange - Exchange UUID
 * @property {string} exchange_name - Exchange name
 * @property {string} api_key_masked - Masked API key
 * @property {string} api_secret_masked - Masked API secret
 * @property {string} [passphrase_masked] - Optional masked passphrase
 */

/**
 * @typedef {Object} UserOpportunity
 * @property {string} id - UUID da operação
 * @property {string} symbol - Par de trading
 * @property {string} exchange_a_name - Nome da exchange A
 * @property {string} exchange_b_name - Nome da exchange B
 * @property {string} profit - Lucro bruto
 * @property {string} profit_fee - Taxa de financiamento
 * @property {string} profit_value - Lucro descontando taxas
 * @property {string} stake - Valor da operação
 * @property {string} status - Status da operação
 * @property {string} created - Data de criação
 * @property {string} modified - Data de modificação
 * @property {string} exchange_a_order_id - ID da ordem na exchange A
 * @property {string} exchange_a_close_order_id - ID da ordem de fechamento na exchange A
 * @property {string} exchange_a_open_price - Preço de abertura na exchange A
 * @property {string} exchange_a_open_qty - Quantidade de abertura na exchange A
 * @property {string} exchange_a_close_price - Preço de fechamento na exchange A
 * @property {string} exchange_a_close_qty - Quantidade de fechamento na exchange A
 * @property {string} exchange_a_entrance_fee - Taxa de entrada na exchange A
 * @property {string} exchange_a_entrance_fee_currency - Moeda da taxa de entrada na exchange A
 * @property {string} exchange_a_close_fee - Taxa de fechamento na exchange A
 * @property {string} exchange_a_close_fee_currency - Moeda da taxa de fechamento na exchange A
 * @property {string} exchange_b_order_id - ID da ordem na exchange B
 * @property {string} exchange_b_open_price - Preço de abertura na exchange B
 * @property {string} exchange_b_open_qty - Quantidade de abertura na exchange B
 * @property {string} exchange_b_close_price - Preço de fechamento na exchange B
 * @property {string} exchange_b_close_qty - Quantidade de fechamento na exchange B
 * @property {string} exchange_b_close_order_id - ID da ordem de fechamento na exchange B
 * @property {string} exchange_b_entrance_fee - Taxa de entrada na exchange B
 * @property {string} exchange_b_entrance_fee_currency - Moeda da taxa de entrada na exchange B
 * @property {string} exchange_b_close_fee - Taxa de fechamento na exchange B
 * @property {string} exchange_b_close_fee_currency - Moeda da taxa de fechamento na exchange B
 * @property {string} log - Log da operação
 */

/**
 * Fetches the list of available exchanges
 * @param {string} accessToken - Current access token
 * @returns {Promise<Exchange[]>} List of exchanges
 */
async function getExchanges(accessToken) {
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
async function getOpportunities(accessToken) {
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
async function addExchangeCredentials(accessToken, credentials) {
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

/**
 * Fetches the list of exchange credentials
 * @param {string} accessToken - Current access token
 * @returns {Promise<{ count: number, results: ExchangeCredential[] }>} List of credentials
 */
async function getExchangeCredentials(accessToken) {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/exchanges/credentials/`, {
            headers: {
                'Authorization': `Token ${accessToken}`
            }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Failed to fetch credentials');
        }

        return await response.json();
    } catch (err) {
        if (err instanceof Error) {
            throw err;
        }
        throw new Error('Failed to connect to the server');
    }
}

/**
 * Deletes an exchange credential
 * @param {string} accessToken - Current access token
 * @param {string} id - Credential ID to delete
 * @returns {Promise<void>}
 */
async function deleteExchangeCredential(accessToken, id) {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/exchanges/credentials/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${accessToken}`
            }
        });

        if (!response.ok) {
            if (response.status !== 204) {
                const data = await response.json();
                throw new Error(data.detail || 'Failed to delete credential');
            }
        }
    } catch (err) {
        if (err instanceof Error) {
            throw err;
        }
        throw new Error('Failed to connect to the server');
    }
}

/**
 * Busca as operações do usuário
 * @param {string} accessToken - Token de acesso
 * @param {number} page - Número da página
 * @returns {Promise<{ count: number, next: string|null, previous: string|null, results: UserOpportunity[] }>}
 */
async function getUserOperations(accessToken, page = 1) {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/exchanges/opportunities/user/?page=${page}`, {
            headers: {
                'Authorization': `Token ${accessToken}`
            }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Failed to fetch user operations');
        }

        return await response.json();
    } catch (err) {
        if (err instanceof Error) {
            throw err;
        }
        throw new Error('Failed to connect to the server');
    }
}

export { 
    getExchanges, 
    getOpportunities, 
    addExchangeCredentials, 
    getExchangeCredentials,
    deleteExchangeCredential,
    getUserOperations
}; 