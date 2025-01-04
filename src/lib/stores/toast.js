import { writable } from 'svelte/store';

/**
 * @typedef {'success' | 'error' | 'warning' | 'info'} ToastType
 * 
 * @typedef {Object} Toast
 * @property {string} id
 * @property {string} message
 * @property {ToastType} type
 */

const TOAST_DURATION = 5000; // 5 seconds

function createToastStore() {
    const { subscribe, update } = writable(/** @type {Toast[]} */ ([]));

    /**
     * @param {string} message
     * @param {ToastType} type
     */
    function show(message, type = 'info') {
        const id = Math.random().toString(36).slice(2);
        
        update(toasts => [
            ...toasts,
            { id, message, type }
        ]);

        setTimeout(() => {
            dismiss(id);
        }, TOAST_DURATION);
    }

    /**
     * @param {string} id
     */
    function dismiss(id) {
        update(toasts => toasts.filter(t => t.id !== id));
    }

    /**
     * @param {string} message
     */
    const success = (message) => show(message, 'success');

    /**
     * @param {string} message
     */
    const error = (message) => show(message, 'error');

    /**
     * @param {string} message
     */
    const warning = (message) => show(message, 'warning');

    /**
     * @param {string} message
     */
    const info = (message) => show(message, 'info');

    return {
        subscribe,
        show,
        success,
        error,
        warning,
        info
    };
}

export const toast = createToastStore(); 