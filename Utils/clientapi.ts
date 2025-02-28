import axios from 'axios';

import * as SecureStore from 'expo-secure-store';

// Create an Axios instance
export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get token securely
const getToken = async () => {
  try {
    return await SecureStore.getItemAsync('token');
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

// Request Interceptor to add token dynamically
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for handling errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log('Error in Axios Interceptor:', error);
      
      if (error.response.status === 401 || error.response.status === 403) {
        // Handle token expiration
        SecureStore.deleteItemAsync('token'); // Remove expired token
        // Navigate to login screen (Use your navigation method here)
        console.log('Redirecting to Login...');
      }
    }
    return Promise.reject(error?.response?.data || error);
  }
);

export default apiClient;
