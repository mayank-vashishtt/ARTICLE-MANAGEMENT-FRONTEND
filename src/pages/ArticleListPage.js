import React, { useState, useEffect } from 'react';
import { fetchArticles } from '../services/api';  // Import the fetchArticles function
import { Link } from 'react-router-dom';  // Import Link for navigation
import ArticleCard from '../components/ArticleCard';  // Import the ArticleCard component
import './ArticleListPage.css';  // Import the CSS for styling

function ArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [sortOption, setSortOption] = useState('date');
  const loggedInUserId = localStorage.getItem('userId');  // Get logged-in user ID

  useEffect(() => {
    fetchArticlesList();
  }, [sortOption]);

  const fetchArticlesList = async () => {
    try {
      const response = await fetchArticles(sortOption);
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles', error);
    }
  };

  return (
    <div className="page-container">
      <h2>Articles</h2>

      {/* Flexbox for Sort and Write Article Button */}
      <div className="controls-container">
        <select className="sort-select" onChange={(e) => setSortOption(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
          <option value="likes">Sort by Likes</option>
        </select>

        <Link to="/add-article" className="write-article-button">Write an Article</Link>
      </div>

      {/* Grid for displaying articles */}
      <ul className="article-grid">
        {articles.map((article) => (
          <li 
            className={`article-list-item ${article.author === loggedInUserId ? 'my-article' : ''}`} 
            key={article._id}
          >
            <ArticleCard article={article} onLike={fetchArticlesList} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleListPage;
