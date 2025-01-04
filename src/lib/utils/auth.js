import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';

/**
 * Checks if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
    if (!browser) return false;
    return !!localStorage.getItem('token');
}

/**
 * Protected route handler
 * @param {URL} url - Current URL
 */
export function protectRoute(url) {
    if (!isAuthenticated()) {
        throw redirect(303, `/login?redirect=${encodeURIComponent(url.pathname)}`);
    }
}

/**
 * Public route handler - redirects to home if already authenticated
 */
export function handlePublicRoute() {
    if (isAuthenticated()) {
        throw redirect(303, '/');
    }
} 