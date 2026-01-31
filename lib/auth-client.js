// Client-side authentication utility for JWT token management

/**
 * Save JWT token to localStorage
 * @param {string} token - JWT token from login API
 */
export function saveToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
}

/**
 * Get JWT token from localStorage
 * @returns {string|null} JWT token or null if not found
 */
export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

/**
 * Remove JWT token from localStorage (logout)
 */
export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    // Redirect to login page
    window.location.href = '/login';
  }
}

/**
 * Logout user - removes token and redirects to login
 */
export function logout() {
  removeToken();
}

/**
 * Check if user is authenticated
 * @returns {boolean} true if token exists
 */
export function isAuthenticated() {
  return !!getToken();
}

/**
 * Make authenticated API request with JWT token
 * @param {string} url - API endpoint URL
 * @param {object} options - fetch options (method, headers, body, etc.)
 * @returns {Promise<object>} API response data
 */
export async function authenticatedFetch(url, options = {}) {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid - logout user
    removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    throw new Error('Authentication required');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Get authenticated user from token
 * @returns {Promise<object>} User data
 */
export async function getAuthenticatedUser() {
  return authenticatedFetch('/api/student/profile');
}
