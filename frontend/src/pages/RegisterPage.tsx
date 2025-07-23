import { useState } from 'react';
import { register } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContainer, AuthBox } from '../styles/AuthStyles';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ email, password });
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContainer>
      <AuthBox>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </AuthBox>
    </AuthContainer>
  );
};

export default RegisterPage;