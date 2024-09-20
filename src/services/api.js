import axios from 'axios';

const api = axios.create({
  baseURL: 'https://article-management-backend.onrender.com/api/',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth functions
export const registerUser = (email, password) => api.post('/auth/register', { email, password });
export const loginUser = (email, password) => api.post('/auth/login', { email, password });

// Articles
export const fetchArticles = (sortOption) => api.get(`/articles?sort=${sortOption}`);
export const createArticle = (formData) => api.post('/articles', formData);
// export const likeArticle = (id) => api.post(`/articles/${id}/like`);
// src/services/api.js
export const likeArticle = (articleId) => {
  console.log('articleId', articleId);
  return api.post(`/articles/${articleId}/like`);
};

// Update an article
// Fetch an article by ID
export const fetchArticleById = (id) => api.get(`/articles/${id}`);

export const updateArticle = (id, updatedArticle) => api.put(`/articles/${id}`, updatedArticle);
export default api;
