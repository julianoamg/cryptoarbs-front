import { handlePublicRoute } from '$lib/utils/auth';

/** @type {import('./$types').PageLoad} */
export function load() {
    handlePublicRoute();
    return {};
} 