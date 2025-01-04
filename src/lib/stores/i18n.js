import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Available languages
export const languages = {
    'pt-BR': 'Português',
    'en': 'English',
    'es': 'Español'
};

// Create the language store
function createLanguageStore() {
    const defaultLanguage = 'pt-BR';
    const initialLanguage = browser ? localStorage.getItem('language') || defaultLanguage : defaultLanguage;
    
    const { subscribe, set } = writable(initialLanguage);

    return {
        subscribe,
        set: (language) => {
            if (browser) {
                localStorage.setItem('language', language);
            }
            set(language);
        }
    };
}

export const language = createLanguageStore(); 