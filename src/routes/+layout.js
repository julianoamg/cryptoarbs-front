import { isAuthenticated } from '$lib/utils/auth';
import { redirect } from '@sveltejs/kit';

const PUBLIC_ROUTES = ['/login', '/cadastro', '/recuperar-senha'];

/** @type {import('./$types').LayoutLoad} */
export function load({ url }) {
    const isPublicRoute = PUBLIC_ROUTES.includes(url.pathname);
    
    if (!isPublicRoute && !isAuthenticated()) {
        throw redirect(302, `/login?redirect=${encodeURIComponent(url.pathname)}`);
    }

    return {
        isAuthenticated: isAuthenticated()
    };
} 