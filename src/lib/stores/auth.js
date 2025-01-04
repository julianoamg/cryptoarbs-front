import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * @typedef {Object} AuthState
 * @property {string|null} token
 * @property {number|null} userId
 * @property {string|null} email
 * @property {boolean} isAuthenticated
 */

function createAuthStore() {
    /** @type {AuthState} */
    const initialState = {
        token: browser ? localStorage.getItem('token') : null,
        userId: browser ? Number(localStorage.getItem('userId')) : null,
        email: browser ? localStorage.getItem('email') : null,
        isAuthenticated: browser ? !!localStorage.getItem('token') : false
    };

    const { subscribe, set, update } = writable(initialState);

    return {
        subscribe,
        /**
         * @param {{ token: string, refresh_token?: string, user_id: number, email: string }} authData
         */
        setAuth: (authData) => {
            if (browser) {
                localStorage.setItem('token', authData.token);
                localStorage.setItem('userId', String(authData.user_id));
                localStorage.setItem('email', authData.email);
                if (authData.refresh_token) {
                    localStorage.setItem('refreshToken', authData.refresh_token);
                }
            }
            set({ 
                token: authData.token,
                userId: authData.user_id,
                email: authData.email,
                isAuthenticated: true 
            });
        },
        clearAuth: () => {
            if (browser) {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('email');
                localStorage.removeItem('refreshToken');
            }
            set({ 
                token: null,
                userId: null,
                email: null,
                isAuthenticated: false 
            });
        }
    };
}

export const auth = createAuthStore(); 