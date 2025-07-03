import { useState } from 'react';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" value={formData.username}
             onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
      <input placeholder="Email" value={formData.email}
             onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <input placeholder="Password" type="password" value={formData.password}
             onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
}