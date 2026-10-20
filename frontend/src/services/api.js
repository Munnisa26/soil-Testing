import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const logout = () => api.post('/auth/logout');
export const getMe = () => api.get('/auth/me');

// Users
export const getProfile = () => api.get('/users/profile');
export const updateProfile = (data) => api.put('/users/profile', data);
export const changePassword = (data) => api.put('/users/change-password', data);

// Soil Samples
export const createSample = (formData) =>
  api.post('/soil-samples', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
export const getMySamples = (params) => api.get('/soil-samples', { params });
export const getSampleById = (id) => api.get(`/soil-samples/${id}`);
export const updateSample = (id, data) => api.put(`/soil-samples/${id}`, data);
export const deleteSample = (id) => api.delete(`/soil-samples/${id}`);
export const getDashboardStats = () => api.get('/soil-samples/dashboard/stats');

// Test Results
export const getResultBySample = (sampleId) => api.get(`/test-results/${sampleId}`);
export const createResult = (data) => api.post('/test-results', data);
export const updateResult = (id, data) => api.put(`/test-results/${id}`, data);

// Reports
export const getMyReports = () => api.get('/reports');
export const getReportById = (id) => api.get(`/reports/${id}`);
export const downloadReportPdf = (id) =>
  api.get(`/reports/${id}/pdf`, { responseType: 'blob' });
export const generateReport = (sample_id) => api.post('/reports/generate', { sample_id });

// Admin
export const getAdminStats = () => api.get('/admin/stats');
export const getAdminUsers = (params) => api.get('/admin/users', { params });
export const updateUserStatus = (id, is_active) =>
  api.put(`/admin/users/${id}/status`, { is_active });
export const getAdminSamples = (params) => api.get('/admin/samples', { params });
export const updateSampleStatus = (id, status) =>
  api.put(`/admin/samples/${id}/status`, { status });
export const getContactMessages = () => api.get('/admin/contact-messages');
export const markMessageRead = (id) => api.put(`/admin/contact-messages/${id}/read`);

// Blog
export const getBlogPosts = () => api.get('/blog');
export const getBlogPost = (id) => api.get(`/blog/${id}`);
export const createBlogPost = (data) => api.post('/blog', data);
export const updateBlogPost = (id, data) => api.put(`/blog/${id}`, data);
export const deleteBlogPost = (id) => api.delete(`/blog/${id}`);

// Contact
export const submitContact = (data) => api.post('/contact', data);

// Notifications
export const getNotifications = () => api.get('/notifications');
export const markNotificationRead = (id) => api.put(`/notifications/${id}/read`);
export const markAllNotificationsRead = () => api.put('/notifications/read-all');

export default api;
