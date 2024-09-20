// src/pages/ArticleDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ArticleDetail() {
  const { id } = useParams();  // Get the article ID from the URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`/api/articles/${id}`);
      setArticle(response.data);
    } catch (error) {
      console.error("Error fetching article", error);
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <p>{article.text}</p>
      <p>Likes: {article.likes}</p>
      <img src={article.imageUrl} alt={article.title} />
    </div>
  );
}

export default ArticleDetail;