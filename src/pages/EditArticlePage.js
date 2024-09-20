import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchArticleById, updateArticle } from '../services/api';  // Fetch and update API functions

function EditArticlePage() {
  const { id } = useParams();  // Get the article ID from the URL
  const navigate = useNavigate();  // For navigating back after update
  
  // State to hold the article data
  const [article, setArticle] = useState({
    title: '',
    description: '',
    text: '',
    imageUrl: '',
    videoUrl: ''
  });

  // Load the article data when the page loads
  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await fetchArticleById(id);  // Fetch article by its ID
        setArticle(response.data);  // Populate the form with the fetched article data
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    loadArticle();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateArticle(id, article);  // Send updated article data to the backend
      navigate('/articles');  // Redirect to the articles list after successful update
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  return (
    <div className="page-container">
      <h2>Edit Article</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={article.title}  // Pre-populate with the existing title
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={article.description}  // Pre-populate with the existing description
          onChange={handleChange}
          required
        />

        <label>Article Text:</label>
        <textarea
          name="text"
          value={article.text}  // Pre-populate with the existing article text
          onChange={handleChange}
          required
        />

        <label>Image URL (optional):</label>
        <input
          type="text"
          name="imageUrl"
          value={article.imageUrl}  // Pre-populate with the existing image URL
          onChange={handleChange}
        />

        <label>Video URL (optional):</label>
        <input
          type="text"
          name="videoUrl"
          value={article.videoUrl}  // Pre-populate with the existing video URL
          onChange={handleChange}
        />

        <button type="submit" className="submit-button">Update Article</button>
      </form>
    </div>
  );
}

export default EditArticlePage;