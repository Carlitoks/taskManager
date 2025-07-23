import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { login } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContainer, AuthBox } from '../styles/AuthStyles';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      setToken(res.data.token);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContainer>
      <AuthBox>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </AuthBox>
    </AuthContainer>
  );
};

export default LoginPage;