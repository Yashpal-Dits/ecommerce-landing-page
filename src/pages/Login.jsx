import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  
  const EMAIL_MAX = 50;
  const PASSWORD_MAX = 20;

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    } else if (formData.email.length > EMAIL_MAX) {
      newErrors.email = `Email must not exceed ${EMAIL_MAX} characters`;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length > PASSWORD_MAX) {
      newErrors.password = `Password must not exceed ${PASSWORD_MAX} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Login Data:', formData);
      alert('Login Successful!');
      
      setFormData({ email: '', password: '' });
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (value.length <= EMAIL_MAX) {
      setFormData({ ...formData, email: value });
      setErrors({ ...errors, email: '' });
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (value.length <= PASSWORD_MAX) {
      setFormData({ ...formData, password: value });
      setErrors({ ...errors, password: '' }); 
    }
  };


  const isEmailLimitReached = formData.email.length === EMAIL_MAX;
  const isPasswordLimitReached = formData.password.length === PASSWORD_MAX;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to GENZ.STORE</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleEmailChange}
              maxLength={EMAIL_MAX}
            />
            {isEmailLimitReached && <span className="limit-msg">Maximum limit reached</span>}
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handlePasswordChange}
              maxLength={PASSWORD_MAX}
            />
            {isPasswordLimitReached && <span className="limit-msg">Maximum limit reached</span>}
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          <button type="submit" className="submit-btn">Sign In</button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  );
}