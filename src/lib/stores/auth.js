import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createAuthStore() {
    const { subscribe, set } = writable({
        token: browser ? localStorage.getItem('token') : null,
        email: browser ? localStorage.getItem('email') : null
    });

    return {
        subscribe,
        setAuth: (authData) => {
            if (browser) {
                localStorage.setItem('token', authData.token);
                localStorage.setItem('email', authData.email);
                document.cookie = `token=${authData.token}; path=/`;
            }
            set({ token: authData.token, email: authData.email });
        },
        clearAuth: () => {
            if (browser) {
                localStorage.removeItem('token');
                localStorage.removeItem('email');
                document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }
            set({ token: null, email: null });
        }
    };
}

export const auth = createAuthStore(); 