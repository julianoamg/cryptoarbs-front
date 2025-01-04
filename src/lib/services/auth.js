import { PUBLIC_API_URL } from '$env/static/public';

/**
 * Authenticates a user and returns the token
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<{ token: string, user_id: number, email: string }>} Auth data
 * @throws {Error} With field-specific or general error message
 */
export async function login(email, password) {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle field-specific validation errors
            if (data.email || data.password) {
                const errors = [];
                if (data.email) errors.push(data.email[0]);
                if (data.password) errors.push(data.password[0]);
                throw new Error(errors.join(', '));
            }
            // Handle non-field errors
            if (data.non_field_errors) {
                throw new Error(data.non_field_errors[0]);
            }
            throw new Error(data.detail || 'Authentication failed');
        }

        return data;
    } catch (err) {
        if (err instanceof Error) {
            throw err;
        }
        throw new Error('Failed to connect to the server');
    }
}

/**
 * Logs out the user
 * @param {string} token - Auth token
 * @returns {Promise<void>}
 */
export async function logout(token) {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/auth/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Logout failed');
        }
    } catch (err) {
        if (err instanceof Error) {
            throw err;
        }
        throw new Error('Failed to connect to the server');
    }
}

/**
 * Refreshes the access token using a refresh token
 * @param {string} refreshToken - The refresh token
 * @returns {Promise<{ access: string }>} New access token
 */
export async function refreshToken(refreshToken) {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/api/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        const data = await response.json();

        if (!response.ok) {
            if (data.non_field_errors) {
                throw new Error(data.non_field_errors[0]);
            }
            throw new Error(data.detail || 'Token refresh failed');
        }

        return data;
    } catch (err) {
        if (err instanceof Error) {
            throw err;
        }
        throw new Error('Failed to refresh token');
    }
} 