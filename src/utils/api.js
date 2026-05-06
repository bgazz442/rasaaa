// API utility for making requests
// Uses REACT_APP_API_URL from environment variables
// Falls back to relative path for production/ngrok compatibility

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

/**
 * Make an API request
 * @param {string} endpoint - API endpoint (e.g., '/api/users')
 * @param {Object} options - Fetch options
 * @returns {Promise} - Fetch promise
 */
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include', // Include cookies for auth
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * GET request
 */
export const get = (endpoint) => apiRequest(endpoint, { method: 'GET' });

/**
 * POST request
 */
export const post = (endpoint, data) => apiRequest(endpoint, {
  method: 'POST',
  body: JSON.stringify(data)
});

/**
 * PUT request
 */
export const put = (endpoint, data) => apiRequest(endpoint, {
  method: 'PUT',
  body: JSON.stringify(data)
});

/**
 * DELETE request
 */
export const del = (endpoint) => apiRequest(endpoint, { method: 'DELETE' });

const apiService = {
  get,
  post,
  put,
  delete: del,
  apiRequest
};

export default apiService;
