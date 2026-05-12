import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Login({ setCurrentUser, addToast }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const EMAIL_MAX = 50;
  const PASSWORD_MAX = 20;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name, value) => {
    let error = '';
    if (name === 'email') {
      if (!value.trim()) error = 'Email is required';
      else if (!emailRegex.test(value)) error = 'Invalid email format';
      else if (value.length > EMAIL_MAX) error = `Email must not exceed ${EMAIL_MAX} characters`;
    }
    if (name === 'password') {
      if (!value) error = 'Password is required';
      else if (value.length > PASSWORD_MAX) error = `Password must not exceed ${PASSWORD_MAX} characters`;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email' && value.length > EMAIL_MAX) return;
    if (name === 'password' && value.length > PASSWORD_MAX) return;
    setFormData({ ...formData, [name]: value });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
    if (apiError) setApiError('');
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({ email: true, password: true });

    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
    };
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      setLoading(true);
      setApiError('');

      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const localUser = registeredUsers.find((u) => u.email === formData.email);

      if (!localUser) {
        addToast('Email not found. Please register first.', 'error');
        setApiError('Email not found. Please register first.');
        setLoading(false);
        return;
      }

      if (localUser.password !== formData.password) {
        addToast('Incorrect password', 'error');
        setApiError('Incorrect password');
        setLoading(false);
        return;
      }

      // Save token and user data
      const accessToken = 'token_' + localUser.id + '_' + Date.now();
      const refreshToken = 'refresh_' + localUser.id + '_' + Date.now();

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      const userData = {
        id: localUser.id,
        firstName: localUser.firstName,
        lastName: localUser.lastName,
        email: localUser.email,
        username: localUser.username,
        image: localUser.image,
      };

      localStorage.setItem('currentUser', JSON.stringify(userData));
      setCurrentUser(userData);

      addToast(`Welcome back, ${localUser.firstName}!`, 'success');

      setFormData({ email: '', password: '' });
      setErrors({});
      setTouched({});

      setTimeout(() => {
        navigate('/');
      }, 1000);

      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to GENZ.STORE</p>
        </div>

        {apiError && <div className="api-error">{apiError}</div>}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label className="form-label">Email</label>
            <input
              type="text"
              name="email"
              className={`form-input ${touched.email && errors.email ? 'input-error' : ''}`}
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={EMAIL_MAX}
              disabled={loading}
              autoComplete="off"
            />
            <div className="field-messages">
              {touched.email && errors.email && <span className="error-msg">{errors.email}</span>}
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className={`form-input ${touched.password && errors.password ? 'input-error' : ''}`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={PASSWORD_MAX}
              disabled={loading}
              autoComplete="off"
            />
            <div className="field-messages">
              {touched.password && errors.password && <span className="error-msg">{errors.password}</span>}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  );
}