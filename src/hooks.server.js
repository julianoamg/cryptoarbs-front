import { redirect } from '@sveltejs/kit';

const PUBLIC_ROUTES = ['/login', '/cadastro', '/recuperar-senha'];

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const pathname = event.url.pathname;
    
    // Always clear cookies if we're accessing login page
    if (pathname === '/login') {
        event.cookies.delete('token', { path: '/' });
        return await resolve(event);
    }

    const token = event.cookies.get('token');

    // For public routes, just proceed
    if (PUBLIC_ROUTES.includes(pathname)) {
        return await resolve(event);
    }

    // For protected routes, require token
    if (!token) {
        event.cookies.delete('token', { path: '/' });
        throw redirect(303, '/login');
    }

    return await resolve(event);
} 