import { protectRoute } from '$lib/utils/auth';

const publicRoutes = ['/login', '/cadastro', '/recuperar-senha'];

/** @type {import('./$types').LayoutLoad} */
export function load({ url }) {
    // Don't protect public routes
    if (publicRoutes.includes(url.pathname)) {
        return {};
    }

    // Protect all other routes
    protectRoute(url);
    
    return {};
} 