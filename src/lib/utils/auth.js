import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';

/**
 * Get cookie value by name
 * @param {string} name
 * @returns {string|null}
 */
function getCookie(name) {
    if (!browser) return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift() || null;
    return null;
}

/**
 * Checks if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
    if (!browser) {
        // On server, check cookies from request
        return false; // This will be handled by hooks.server.js
    }
    // On client, check both localStorage and cookies
    return !!(localStorage.getItem('token') || getCookie('token'));
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