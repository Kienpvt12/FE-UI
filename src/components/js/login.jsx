import React from 'react';
import '../css/login.css';
import { useLoginMutation } from '../../apis/userApi';
import { useState } from 'react';

function Login({ closeModal, switchToRegister }) {
  const [login, { isLoading, error }] = useLoginMutation();
  const [user, setUser] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    if (!e.target.checkValidity()) {
      return;
    }
    e.preventDefault();
    try {
      const response = await login(user).unwrap();
      console.log('Login Success:', response);
    } catch (err) {
      setMessage(err.data.message);
    }
  };

  return (
    <div className="auth-modal active" onClick={closeModal}>
      <div className="auth-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleLogin}>
          {error && <div className="alert alert-danger">{message}</div>}
          <div className="mb-3">
            <label className="form-label">Username or email</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your username or email"
              required
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
              required
            />
          </div>
          <button type="submit" disabled={isLoading} className="btn btn-primary w-100">
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
