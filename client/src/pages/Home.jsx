import { useEffect, useState } from 'react';
import { postService } from '../services/api';
import PostCard from '@/components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await postService.getAllPosts(1, 10);
        setPosts(data.posts);    // adjust to your API’s shape
      } catch (err) {
        setError(err.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  // if (!posts.length) return <p>Loading…</p>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="p-4 border rounded">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
// import React, { useEffect, useState } from 'react';
// import { fetchPosts } from '../services/api';
// import PostCard from '../components/PostCard';

// const Home = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getPosts = async () => {
//       try {
//         const { data } = await fetchPosts();
//         setPosts(data);
//       } catch (err) {
//         setError('Failed to fetch posts');
//       } finally {
//         setLoading(false);
//       }
//     };
//     getPosts();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>All Blog Posts</h2>
//       {posts.length === 0 ? (
//         <p>No posts found.</p>
//       ) : (
//         posts.map((post) => <PostCard key={post._id} post={post} />)
//       )}
//     </div>
//   );
// };

// export default Home;