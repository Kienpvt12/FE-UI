import React from 'react';
import '../css/login.css'; // Đảm bảo đường dẫn file CSS đúng

function Register({ closeModal, switchToLogin }) {
  return (
    <div className="auth-modal active" onClick={closeModal}>
      <div className="auth-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-center">Register</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" />
          </div>
          <button type="submit" className="btn btn-success w-100">
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
