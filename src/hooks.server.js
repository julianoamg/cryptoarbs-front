import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const token = event.cookies.get('token');
    const pathname = event.url.pathname;

    // Clear token and redirect to login for any unauthorized access
    if (!token && pathname !== '/login' && pathname !== '/cadastro' && pathname !== '/recuperar-senha') {
        event.cookies.delete('token', { path: '/' });
        throw redirect(303, '/login');
    }

    // If has token and trying to access login/register/reset pages, redirect to home
    if (token && (pathname === '/login' || pathname === '/cadastro' || pathname === '/recuperar-senha')) {
        throw redirect(303, '/');
    }

    return await resolve(event);
} 