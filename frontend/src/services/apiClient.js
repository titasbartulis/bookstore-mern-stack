import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

apiClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/refresh-token`, {
        refresh_token: refreshToken,
      });
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      originalRequest.headers.Authorization = `Bearer ${access_token}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
});

export default apiClient;
