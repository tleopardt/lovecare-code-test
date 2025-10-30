import axios from 'axios';

/**
 * Public API connection
 */
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const API_URL = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

export { API_URL };