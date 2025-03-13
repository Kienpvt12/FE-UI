import React from "react";
import "../css/login.css";

function Login({ closeModal, switchToRegister }) {
  return (
    <div className="auth-modal active" onClick={closeModal}>
      <div className="auth-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-center">Login</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" />
          </div>
          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          Don't have an account?{" "}
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
