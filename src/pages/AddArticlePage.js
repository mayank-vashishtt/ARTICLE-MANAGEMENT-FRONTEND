import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createArticle } from '../services/api';

const AddArticlePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !text) {
      alert('All fields are required');
      return;
    }

    try {
      const formData = {
        title,
        description,
        text,
        imageUrl,  // Send image and video URLs
        videoUrl,
      };

      await createArticle(formData);
      navigate('/articles');
    } catch (error) {
      console.error('Error adding article', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <textarea
        placeholder="Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Video URL (optional)"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <button type="submit">Add Article</button>
    </form>
  );
};

export default AddArticlePage;