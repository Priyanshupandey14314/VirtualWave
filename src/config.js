const isProduction = import.meta.env.PROD;

// On Hostinger, if you upload the php_backend files to a folder named 'api' in public_html:
// Production URL: https://yourdomain.com/api
// Development URL: http://localhost/virtual_wave_api

export const API_BASE_URL = isProduction
    ? '/api' // Relative path for production (assumes backend is in /api folder)
    : 'http://localhost/virtual_wave_api';

export const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    // Remove any leading slash from path to avoid double slashes if needed, 
    // but usually API_BASE_URL ends without slash and path might need one.
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${API_BASE_URL}/${cleanPath}`;
};
