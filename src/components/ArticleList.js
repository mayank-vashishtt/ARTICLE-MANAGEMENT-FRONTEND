import React, { useState, useEffect } from 'react';
import { fetchArticles } from '../services/api';
import ArticleCard from '../components/ArticleCard';

const ArticlesListPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticlesList();
  }, []);

  const fetchArticlesList = async () => {
    try {
      const response = await fetchArticles();
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles', error);
    }
  };

  return (
    <div>
      <h1>Articles Feed</h1>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesListPage;