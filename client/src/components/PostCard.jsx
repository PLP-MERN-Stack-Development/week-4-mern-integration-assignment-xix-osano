import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div style={{ border: '1px solid #ddd', marginBottom: '1rem', padding: '1rem' }}>
      <h3>{post.title}</h3>
      <p>{post.excerpt || post.content.substring(0, 100)}...</p>
      <Link to={`/posts/${post._id}`}>Read more</Link>
    </div>
  );
};

export default PostCard;