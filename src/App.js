import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ArticlesListPage from './pages/ArticleListPage';
import AddArticlePage from './pages/AddArticlePage';
import EditArticlePage from './pages/EditArticlePage';
function App() {
  const isAuthenticated = localStorage.getItem('token');  // Check if user is authenticated

  return (
    <Router>
      <Routes>
        {/* Redirect to registration if user isn't authenticated */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/articles" /> : <Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/articles" element={isAuthenticated ? <ArticlesListPage /> : <Navigate to="/login" />} />
        <Route path="/add-article" element={isAuthenticated ? <AddArticlePage /> : <Navigate to="/login" />} />
        <Route path="/edit-article/:id" element={<EditArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;