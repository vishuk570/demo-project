import axios from 'axios';
// import { DEV_API_END_POINT } from '@env';

const httpCommon = axios.create({
  // baseURL: DEV_API_END_POINT,
  baseURL: ' http://15.206.194.208:5001/api', // Replace with your actual API endpoint
  timeout: 60000, // Adjust the timeout as per your requirement
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need, such as Authorization headers
  },
});

// Add a function to set the authorization token
const setAuthToken = (token) => {
  if (token) {
    httpCommon.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete httpCommon.defaults.headers.common['Authorization'];
  }
};

const api = {
  get: async (url, params = {}) => {
    try {
      const response = await httpCommon.get(url, { params });
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  post: async (url, data = {}) => {
    try {
      const response = await httpCommon.post(url, data);
      return response;
    } catch (error) {
      console.error('Error creating data:', error);
      throw error;
    }
  },

  update: async (url, data = {}) => {
    try {
      const response = await httpCommon.put(url, data);
      return response;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  },

  delete: async (url, data = {}) => {
    try {
      const response = await httpCommon.delete(url, {data});
      return response;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  },
};

export { api, setAuthToken };
