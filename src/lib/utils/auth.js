import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';

/**
 * Checks if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
    if (!browser) return false;
    return !!localStorage.getItem('accessToken');
}

/**
 * Requires authentication or redirects to login
 * @param {string} url - Current URL to redirect back after login
 */
export function requireAuth(url) {
    if (!isAuthenticated()) {
        throw redirect(302, `/login?redirect=${encodeURIComponent(url)}`);
    }
}

/**
 * Redirects to home if authenticated
 */
export function redirectIfAuthenticated() {
    if (isAuthenticated()) {
        throw redirect(302, '/');
    }
} 