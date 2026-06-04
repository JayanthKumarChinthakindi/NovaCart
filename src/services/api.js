import axios from 'axios';

// Create an Axios instance that would be used for real endpoints
const api = axios.create({
  baseURL: 'https://api.novacart.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to simulate realistic API request latency (e.g., 500ms)
export const simulateApiCall = async (data, delayMs = 600) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delayMs);
  });
};

export default api;
