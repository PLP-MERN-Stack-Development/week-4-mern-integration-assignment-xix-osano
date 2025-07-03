import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categoryService, postService } from '../services/api';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPostAndCategories = async () => {
      try {
        const [{ data: post }, { data: catList }] = await Promise.all([
          postService.searchPosts(id),
          categoryService.searchCategories(),
        ]);
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category || '');
        setCategories(catList);
      } catch (err) {
        setError('Failed to load post or categories');
      } finally {
        setLoading(false);
      }
    };
    loadPostAndCategories();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postService.updatePost(id, { title, content, category });
      navigate(`/posts/${id}`);
    } catch (err) {
      setError('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await postService.deletePost(id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="6"
            style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
          ></textarea>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Post'}
        </button>
        <button type="button" onClick={handleDelete} style={{ marginLeft: '1rem', backgroundColor: 'red', color: 'white' }}>
          Delete Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
