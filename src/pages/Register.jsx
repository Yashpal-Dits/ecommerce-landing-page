import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  
  const NAME_MAX = 50;
  const EMAIL_MAX = 50;
  const PASSWORD_MAX = 20;
  const PASSWORD_MIN = 6;

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.length > NAME_MAX) {
      newErrors.name = `Name must not exceed ${NAME_MAX} characters`;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    } else if (formData.email.length > EMAIL_MAX) {
      newErrors.email = `Email must not exceed ${EMAIL_MAX} characters`;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < PASSWORD_MIN) {
      newErrors.password = `Password must be at least ${PASSWORD_MIN} characters`;
    } else if (formData.password.length > PASSWORD_MAX) {
      newErrors.password = `Password must not exceed ${PASSWORD_MAX} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Register Data:', formData);
      alert('Account Created Successfully!');
      
      setFormData({ name: '', email: '', password: '' });
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= NAME_MAX) {
      setFormData({ ...formData, name: value });
      setErrors({ ...errors, name: '' }); 
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

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleNameChange}
              maxLength={NAME_MAX}
            />
            {isNameLimitReached && <span className="limit-msg">Maximum limit reached</span>}
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

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
              placeholder={`Min. ${PASSWORD_MIN} chars, Max. ${PASSWORD_MAX} chars`}
              value={formData.password}
              onChange={handlePasswordChange}
              maxLength={PASSWORD_MAX}
            />
            {isPasswordLimitReached && <span className="limit-msg">Maximum limit reached</span>}
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          <button type="submit" className="submit-btn">Create Account</button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}