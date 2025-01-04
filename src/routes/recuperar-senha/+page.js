import { redirectIfAuthenticated } from '$lib/utils/auth';

/** @type {import('./$types').PageLoad} */
export function load() {
    redirectIfAuthenticated();
    return {};
} 