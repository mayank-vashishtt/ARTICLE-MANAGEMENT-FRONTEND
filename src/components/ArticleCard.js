import React, { useState } from 'react';
import { likeArticle } from '../services/api';
import { FaThumbsUp } from 'react-icons/fa';  // Thumbs-up icon
import { Link } from 'react-router-dom';  // Link for routing
import Modal from './Modal';  // Import the Modal component

function ArticleCard({ article, onLike, loggedInUserId }) {
  const [localLikes, setLocalLikes] = useState(article.likes);
  const [isModalOpen, setIsModalOpen] = useState(false);  // State for modal visibility

  const handleLike = async () => {
    try {
      await likeArticle(article._id);
      setLocalLikes(localLikes + 1);
      onLike();  // Refresh the list after liking
    } catch (error) {
      console.error('Error liking article', error);
    }
  };

  // Toggle Modal Visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="article-card">
      <h3 onClick={toggleModal} style={{ cursor: 'pointer' }}>{article.title}</h3>
      {article.imageUrl && <img src={article.imageUrl} alt={article.title} onClick={toggleModal} style={{ cursor: 'pointer' }} />}
      <p>{article.description}</p>
      
      {/* Like Button */}
      <button onClick={handleLike}>
        <FaThumbsUp />  {/* Thumbs-up icon */}
        {localLikes}
      </button>

      {/* Conditionally render Edit button if the user is the author */}
      {article.author === loggedInUserId && (
        <Link to={`/edit-article/${article._id}`} className="edit-article-button">
          Edit Article
        </Link>
      )}

      {/* Modal to display full article */}
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h2>{article.title}</h2>
        {article.imageUrl && <img src={article.imageUrl} alt={article.title} />}
        <p>{article.text}</p>  {/* Full article text */}
      </Modal>
    </div>
  );
}

export default ArticleCard;