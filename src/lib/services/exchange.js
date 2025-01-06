import { PUBLIC_API_URL } from '$env/static/public';

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
 */

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
        
        // Round profit fields to 2 decimal places
        const opportunities = data.results.map(opportunity => ({
            ...opportunity,
            profit: Number(opportunity.profit).toFixed(2),
            profit_fee: Number(opportunity.profit_fee).toFixed(2)
        }));
        
        return opportunities;
    } catch (err) {
        if (err instanceof Error) {
            throw err;
        }
        throw new Error('Failed to connect to the server');
    }
} 