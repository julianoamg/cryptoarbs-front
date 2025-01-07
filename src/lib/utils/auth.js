import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/stores/auth';

/**
 * Get cookie value by name
 * @param {string} name
 * @returns {string|null}
 */
function getCookie(name) {
    if (!browser) return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const popped = parts.pop();
        return popped ? popped.split(';').shift() || null : null;
    }
    return null;
}

/**
 * Checks if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
    if (!browser) {
        return false; // This will be handled by hooks.server.js
    }
    return !!(localStorage.getItem('token') || getCookie('token'));
}

/**
 * Clear all auth data (cookies, localStorage, store)
 */
export function clearAuthData() {
    if (browser) {
        auth.clearAuth();
    }
}

/**
 * Protected route handler - defers to server hooks
 * @param {URL} url - Current URL
 */
export function protectRoute(url) {
    if (!isAuthenticated()) {
        throw redirect(303, `/login?redirect=${encodeURIComponent(url.pathname)}`);
    }
}

/**
 * Public route handler - defers to server hooks
 */
export function handlePublicRoute() {
    // Let server hooks handle the redirection
    return {};
} 