import axios from 'axios';

// Axios instance with base URL pointing to your backend
const api = axios.create({
  baseURL: 'https://article-management-backend.onrender.com/api/',  // Adjusted for your deployed backend
});

// Intercept every request to include the JWT token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Attach token to the Authorization header
  }
  return config;  // Return the modified request configuration
});

// ----------------------------------------
// Auth functions
// ----------------------------------------

// Register a new user by sending email and password to /auth/register
export const registerUser = (email, password) => api.post('/auth/register', { email, password });

// Login the user by sending email and password to /auth/login
export const loginUser = (email, password) => api.post('/auth/login', { email, password });

// ----------------------------------------
// Article functions
// ----------------------------------------

// Fetch articles with optional sorting (sortOption can be 'date', 'likes', etc.)
export const fetchArticles = (sortOption) => api.get(`/articles?sort=${sortOption}`);

// Create a new article (formData should contain title, description, imageUrl, etc.)
export const createArticle = (formData) => api.post('/articles', formData);

// Like an article by sending a POST request to /articles/:id/like
export const likeArticle = (articleId) => {
  console.log('articleId', articleId);  // Logging for debugging purposes
  return api.post(`/articles/${articleId}/like`);  // Like the article
};

// Fetch an article by its ID (for viewing or editing)
export const fetchArticleById = (id) => api.get(`/articles/${id}`);

// Update an existing article by its ID
export const updateArticle = (id, updatedArticle) => api.put(`/articles/${id}`, updatedArticle);

// Export the api instance for other usages
export default api;
