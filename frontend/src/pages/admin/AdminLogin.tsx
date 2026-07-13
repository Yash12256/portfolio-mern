import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', { username, password });
      login(res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 text-center">Admin</p>
        <h1 className="font-serif text-3xl text-ivory mb-10 text-center">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs text-slate tracking-wide uppercase mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-transparent border border-hairline px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors duration-300"
            />
          </div>

          <div>
            <label className="block text-xs text-slate tracking-wide uppercase mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border border-hairline px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors duration-300"
            />
          </div>

          {error ? <p className="text-red-400 text-sm">{error}</p> : null}

          <button
            type="submit"
            className="w-full px-8 py-3 border border-gold text-gold text-sm tracking-wide hover:bg-gold hover:text-ink transition-colors duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;