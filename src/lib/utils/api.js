/**
 * @typedef {Object.<string, string[]>} ApiErrors
 */

/**
 * @typedef {Object} ApiResponse
 * @property {string} [detail] - Optional error detail
 * @property {Object.<string, string[]>} [errors] - Optional field errors
 */

/**
 * Handles API response and extracts errors
 * @param {Response} response - Fetch API response
 * @param {ApiResponse} data - Response data
 * @returns {ApiErrors} Object with field errors
 * @throws {Error} For network or unexpected errors
 */
export function handleApiResponse(response, data) {
    /** @type {ApiErrors} */
    const fieldErrors = {};

    if (!response.ok) {
        // Handle validation errors (field-specific)
        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                fieldErrors[key] = value;
            }
        });

        // If we have any field errors, return them
        if (Object.keys(fieldErrors).length > 0) {
            return fieldErrors;
        }

        // Handle non-field or unexpected errors
        throw new Error(data.detail || 'Request failed');
    }
    return fieldErrors;
} 