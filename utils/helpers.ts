/**
 * @function extractParams
 * @description
 * Converts an object of key–value pairs into a URL query string.
 * Useful for dynamically building API request URLs with parameters.
 * 
 * @param {Object} params - An object containing query parameters as key–value pairs.
 * Example: `{ page: 1, limit: 10, search: 'john' }`
 * 
 * @returns {string} A formatted query string starting with '?'.
 * Example output: `'?page=1&limit=10&search=john'`
 * 
 * @example
 * // Example usage:
 * const query = extractParams({ page: 1, limit: 10, search: 'john' });
 * // Returns: "?page=1&limit=10&search=john"
 */
export function extractParams(params: Object) {
    let result = '';

    const entries = Object.entries(params)

    for (var i = 0; i < entries.length; i++) {
        const symbol = i === 0 ? '?' : '&';
        const [key, value] = entries[i];

        if (value !== '') {
            result = `${result}${symbol}${key}=${value}`
        }
    }
    
    return result;
}