import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const NAME_MAX = 50;
  const EMAIL_MAX = 50;
  const PASSWORD_MAX = 20;
  const PASSWORD_MIN = 6;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 
  const validateField = (name, value) => {
    let error = '';

    if (name === 'name') {
      if (!value.trim()) {
        error = 'Full name is required';
      } else if (value.length > NAME_MAX) {
        error = `Name must not exceed ${NAME_MAX} characters`;
      }
    }

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
      } else if (value.length < PASSWORD_MIN) {
        error = `Password must be at least ${PASSWORD_MIN} characters`;
      } else if (value.length > PASSWORD_MAX) {
        error = `Password must not exceed ${PASSWORD_MAX} characters`;
      }
    }

    return error;
  };

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name' && value.length > NAME_MAX) return;
    if (name === 'email' && value.length > EMAIL_MAX) return;
    if (name === 'password' && value.length > PASSWORD_MAX) return;

    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }

    if (apiError) setApiError('');
  };

  // Handle blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ name: true, email: true, password: true });

    let newErrors = {};
    newErrors.name = validateField('name', formData.name);
    newErrors.email = validateField('email', formData.email);
    newErrors.password = validateField('password', formData.password);

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.password) {
      setLoading(true);
      setApiError('');

      try {
        
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        
        const emailExists = existingUsers.some(u => u.email === formData.email);

        if (emailExists) {
          setApiError('Email already registered. Please login.');
          setLoading(false);
          return;
        }

    
        const username = formData.email.split('@')[0];

      
        const response = await axios.post('https://dummyjson.com/users/add', {
          firstName: formData.name.split(' ')[0],
          lastName: formData.name.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          username: username,
          password: formData.password
        });

        console.log('User added to API:', response.data);

        // Save user to localStorage for login
        const newUser = {
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: formData.email,
          username: username,
          password: formData.password,
          image: response.data.image
        };

        existingUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

        alert('Account created successfully! Please login.');

        // Reset form
        setFormData({ name: '', email: '', password: '' });
        setErrors({});
        setTouched({});

        // Redirect to LOGIN page
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } catch (error) {
        console.log('Registration failed:', error);
        setApiError(error.response?.data?.message || error.message || 'Registration failed');
      } finally {
        setLoading(false);
      }
    }
  };

  const isNameLimitReached = formData.name.length === NAME_MAX;
  const isEmailLimitReached = formData.email.length === EMAIL_MAX;
  const isPasswordLimitReached = formData.password.length === PASSWORD_MAX;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join GENZ.STORE for exclusive drops</p>
        </div>

        {apiError && <div className="api-error">{apiError}</div>}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className={`form-input ${touched.name && errors.name ? 'input-error' : ''}`}
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={NAME_MAX}
              disabled={loading}
              autoComplete="off"
            />
            <div className="field-messages">
              {isNameLimitReached && <span className="limit-msg">Maximum limit reached</span>}
              {touched.name && errors.name && <span className="error-msg">{errors.name}</span>}
            </div>
          </div>

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
              placeholder={`Min. ${PASSWORD_MIN} chars, Max. ${PASSWORD_MAX} chars`}
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}