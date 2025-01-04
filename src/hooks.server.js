import { redirect } from '@sveltejs/kit';

const unprotectedRoutes = ['/login', '/cadastro', '/recuperar-senha'];

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const token = event.cookies.get('token');
    const refreshToken = event.cookies.get('refreshToken');
    const path = event.url.pathname;

    // Allow unprotected routes without authentication
    if (unprotectedRoutes.includes(path)) {
        // If user is already authenticated, redirect to home
        if (token && refreshToken) {
            throw redirect(303, '/');
        }
        return await resolve(event);
    }

    // Protect all other routes
    if (!token || !refreshToken) {
        throw redirect(303, '/login');
    }

    return await resolve(event);
} 