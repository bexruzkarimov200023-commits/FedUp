/**
 * API service for handling HTTP requests
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

/**
 * Make HTTP request
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Request options
 * @returns {Promise} Response data
 */
export const apiCall = async (endpoint, options = {}) => {
  const {
    method = 'GET',
    body = null,
    headers = {},
    ...rest
  } = options;

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

/**
 * POST request
 */
export const post = (endpoint, body, options = {}) => {
  return apiCall(endpoint, {
    method: 'POST',
    body,
    ...options,
  });
};

/**
 * GET request
 */
export const get = (endpoint, options = {}) => {
  return apiCall(endpoint, {
    method: 'GET',
    ...options,
  });
};

/**
 * PUT request
 */
export const put = (endpoint, body, options = {}) => {
  return apiCall(endpoint, {
    method: 'PUT',
    body,
    ...options,
  });
};

/**
 * PATCH request
 */
export const patch = (endpoint, body, options = {}) => {
  return apiCall(endpoint, {
    method: 'PATCH',
    body,
    ...options,
  });
};

/**
 * DELETE request
 */
export const del = (endpoint, options = {}) => {
  return apiCall(endpoint, {
    method: 'DELETE',
    ...options,
  });
};

/**
 * Example API services
 */
export const authService = {
  login: (email, password) => 
    post('/auth/login', { email, password }),
  
  register: (userData) => 
    post('/auth/register', userData),
  
  logout: () => 
    post('/auth/logout'),
};

export const userService = {
  getProfile: () => 
    get('/users/profile'),
  
  updateProfile: (userData) => 
    put('/users/profile', userData),
};

export const formService = {
  submitForm: (formData) => 
    post('/forms/submit', formData),
  
  getFormData: (formId) => 
    get(`/forms/${formId}`),
};
