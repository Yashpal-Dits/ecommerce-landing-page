import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  // Character limits
  const EMAIL_MAX = 50;
  const PASSWORD_MAX = 20;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Real-time validation
  const validateField = (name, value) => {
    let error = '';

    if (name === 'email') {
      if (!value.trim()) {
        error = 'Email is required';
      } else if (!emailRegex.test(value)) {
        error = 'Invalid email format';
      } else if (value.length > EMAIL_MAX) {
        error = `Email must not exceed ${EMAIL_MAX} characters`;
      }
    }

    if (name === 'password') {
      if (!value) {
        error = 'Password is required';
      } else if (value.length > PASSWORD_MAX) {
        error = `Password must not exceed ${PASSWORD_MAX} characters`;
      }
    }

    return error;
  };

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email' && value.length > EMAIL_MAX) return;
    if (name === 'password' && value.length > PASSWORD_MAX) return;

    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });

    if (apiError) setApiError('');
  };

  // Handle blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ email: true, password: true });

    let newErrors = {};
    newErrors.email = validateField('email', formData.email);
    newErrors.password = validateField('password', formData.password);

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      setLoading(true);
      setApiError('');

      try {
        // Generate username from email
        const username = formData.email.split('@')[0];

        // Get registered users from localStorage
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        // Find user by email
        const localUser = registeredUsers.find(u => u.email === formData.email);

        // Check if user exists in localStorage OR try DummyJSON pre-existing users
        if (localUser) {
          // Custom registered user - check password
          if (localUser.password !== formData.password) {
            setApiError('Incorrect password');
            setLoading(false);
            return;
          }

          // Store tokens
          localStorage.setItem('accessToken', 'token_' + localUser.id);
          localStorage.setItem('refreshToken', 'refresh_token_' + localUser.id);

          // Store current user
          localStorage.setItem('currentUser', JSON.stringify({
            id: localUser.id,
            firstName: localUser.firstName,
            lastName: localUser.lastName,
            email: localUser.email,
            username: localUser.username,
            image: localUser.image
          }));

          alert(`Welcome back, ${localUser.firstName}!`);
        } else {
          
          try {
            const response = await axios.post('https://dummyjson.com/user/login', {
              username: username,
              password: formData.password,
              expiresInMins: 60
            });

            const data = response.data;

            // Store tokens from API
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            // Store current user
            localStorage.setItem('currentUser', JSON.stringify({
              id: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              username: data.username,
              image: data.image
            }));

            alert(`Welcome back, ${data.firstName}!`);
          } catch (apiError) {
            setApiError('Email not found or incorrect password');
            setLoading(false);
            return;
          }
        }

        // Reset form
        setFormData({ email: '', password: '' });
        setErrors({});
        setTouched({});

        // Redirect to HOME page
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } catch (error) {
        console.log('Login failed:', error);
        setApiError(error.message || 'Login failed');
      } finally {
        setLoading(false);
      }
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
              {isEmailLimitReached && <span className="limit-msg">Maximum limit reached</span>}
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
              {isPasswordLimitReached && <span className="limit-msg">Maximum limit reached</span>}
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