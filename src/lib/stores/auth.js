import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * @typedef {Object} AuthState
 * @property {string | null} token
 * @property {number | null} userId
 * @property {string | null} email
 * @property {boolean} isAuthenticated
 */

function createAuthStore() {
    const { subscribe, set, update } = writable({
        token: browser ? sessionStorage.getItem('token') : null,
        userId: browser ? Number(sessionStorage.getItem('userId')) : null,
        email: browser ? sessionStorage.getItem('email') : null,
        isAuthenticated: browser ? !!sessionStorage.getItem('token') : false
    });

    return {
        subscribe,
        /**
         * @param {{ token: string, user_id: number, email: string }} authData
         */
        setAuth: (authData) => {
            if (browser) {
                sessionStorage.setItem('token', authData.token);
                sessionStorage.setItem('userId', String(authData.user_id));
                sessionStorage.setItem('email', authData.email);
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
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('email');
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