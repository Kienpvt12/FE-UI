import React, { useState } from 'react';
import '../css/login.css';
import { useRegisterMutation } from '../../apis/userApi';

function Register({ closeModal, switchToLogin }) {
  const [login, { isLoading, error }] = useRegisterMutation();
  const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' });
  const [isMatchPassword, setIsMatchPassword] = useState(true);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'confirmPassword') {
      setIsMatchPassword(true);
    }
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    if (!e.target.checkValidity()) {
      return;
    }
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setIsMatchPassword(false);
      return;
    }
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
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleRegister}>
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
          <div className="mb-3">
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
          <div className="mb-3">
            <label className="form-label">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your password again"
              required
              ref={(input) => {
                if (!isMatchPassword && input) {
                  input.focus();
                }
              }}
            />
            {!isMatchPassword && <div className="small text-danger">Password does not match!</div>}
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={isLoading}>
            Register
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account?{' '}
          <a
            href="#"
            className="text-decoration-none"
            onClick={(e) => {
              e.preventDefault();
              switchToLogin();
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
