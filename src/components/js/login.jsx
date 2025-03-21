import React from 'react';
import '../css/login.css';
import { useLoginMutation } from '../../apis/userApi';
import { useState } from 'react';

function Login({ closeModal, switchToRegister }) {
  const [login, { isLoading, error }] = useLoginMutation();
  const [user, setUser] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(user).unwrap();
      console.log('Login Success:', response);
    } catch (err) {
      console.error('Login Failed:', err);
    }
  };

  return (
    <div className="auth-modal active" onClick={closeModal}>
      <div className="auth-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-center">Login</h2>
        <form>
          {error && <div className="alert alert-danger">Invalid account! Please check again!</div>}
          <div className="mb-3">
            <label className="form-label">Username or email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your username or email"
            />
          </div>
          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" onClick={handleLogin} disabled={isLoading} className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account?{' '}
          <a
            href="#"
            className="text-decoration-none"
            onClick={(e) => {
              e.preventDefault();
              switchToRegister();
            }}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
