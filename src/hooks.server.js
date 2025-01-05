import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const token = event.cookies.get('token');
    const pathname = event.url.pathname;

    // If has token and trying to access login page, redirect to home
    if (token && pathname === '/login') {
        throw redirect(303, '/');
    }

    // If no token and trying to access protected routes (anything except login), redirect to login
    if (!token && pathname !== '/login') {
        throw redirect(303, '/login');
    }

    return await resolve(event);
} 