import { PUBLIC_API_URL } from '$env/static/public';

/**
 * @typedef {Object} User
 * @property {string} email
 * @property {string} first_name
 */

/**
 * Fetches the current user's data
 * @param {string} accessToken - Current access token
 * @returns {Promise<User>} User data
 */
export async function getMe(accessToken) {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/auth/me/`, {
            headers: {
                'Authorization': `Token ${accessToken}`
            }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Failed to fetch user data');
        }

        return await response.json();
    } catch (err) {
        if (err instanceof Error) {
            throw err;
        }
        throw new Error('Failed to connect to the server');
    }
} 