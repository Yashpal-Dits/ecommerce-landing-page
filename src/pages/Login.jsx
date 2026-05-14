import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format')
    .max(50, 'Email must not exceed 50 characters'),
  password: Yup.string()
    .required('Password is required')
    .max(20, 'Password must not exceed 20 characters'),
});

export default function Login({ setCurrentUser, addToast }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        // ── Local check 
        const registeredUsers = JSON.parse(
          localStorage.getItem('registeredUsers') || '[]'
        );
        const localUser = registeredUsers.find((u) => u.email === values.email);

        if (!localUser) {
          addToast('Email not found. Please register first.', 'error');
          setErrors({ submit: 'Email not found. Please register first.' });
          setSubmitting(false);
          return;
        }

        if (localUser.password !== values.password) {
          addToast('Incorrect password', 'error');
          setErrors({ submit: 'Incorrect password' });
          setSubmitting(false);
          return;
        }

        // ── Get token from DummyJSON 
        const dummyUsername = localUser.dummyUsername || 'emilys';
        const dummyPassword = localUser.dummyPassword || 'emilyspass';

        const tokenRes = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: dummyUsername,
            password: dummyPassword,
            expiresInMins: 60,
          }),
        });

        if (!tokenRes.ok) {
          throw new Error('Authentication failed');
        }

        const tokenData = await tokenRes.json();

        // ── Verify token 
        const verifyRes = await fetch('https://dummyjson.com/user/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${tokenData.accessToken}`,
          },
          credentials: 'include',
        });

        if (!verifyRes.ok) {
          throw new Error('Token verification failed');
        }

        await verifyRes.json();

        // ── Save tokens 
        localStorage.setItem('accessToken', tokenData.accessToken);
        localStorage.setItem('refreshToken', tokenData.refreshToken);

        const userData = {
          id: localUser.id,
          firstName: localUser.firstName,
          lastName: localUser.lastName,
          email: localUser.email,
          username: localUser.username,
          image: localUser.image,
          tokenVerified: true,
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));
        setCurrentUser(userData);

        addToast(`Welcome back, ${localUser.firstName}!`, 'success');

        resetForm();

        setTimeout(() => navigate('/'), 1000);

      } catch (err) {
        console.error('Login error:', err);
        setErrors({ submit: err.message || 'Something went wrong. Please try again.' });
        addToast(err.message || 'Something went wrong. Please try again.', 'error');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const EMAIL_MAX = 50;
  const PASSWORD_MAX = 20;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ebe7e7] pt-[100px] px-5 pb-15">
      <div className="w-full max-w-[400px] bg-white rounded-xl py-10 px-[30px] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
        <div className="text-center mb-8">
          <h1 className="text-[32px] font-black text-black mb-2">Welcome Back</h1>
          <p className="text-base text-gray-500">Sign in to continue to GENZ.STORE</p>
        </div>

        {formik.errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded py-3 px-4 mb-5 text-xs font-medium text-red-600 animate-slide-down">
            {formik.errors.submit}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit} noValidate>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#333]">Email Address *</label>
            <input
              type="text"
              name="email"
              className={`py-3 px-4 border-2 border-[#e5e7eb] rounded-md text-[15px] bg-white transition-colors focus:outline-none focus:border-black ${formik.touched.email && formik.errors.email ? 'border-red-500 bg-red-50 focus:border-red-500' : ''}`}
              placeholder="your@email.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={EMAIL_MAX}
              disabled={formik.isSubmitting}
              autoComplete="off"
            />
            <div>
              {formik.values.email.length === EMAIL_MAX && (
                <span className="text-xs font-medium text-red-500 animate-fade-in">Maximum limit reached</span>
              )}
              {formik.touched.email && formik.errors.email && (
                <span className="text-xs font-medium text-red-500 animate-slide-down">{formik.errors.email}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#333]">Password *</label>
            <input
              type="password"
              name="password"
              className={`py-3 px-4 border-2 border-[#e5e7eb] rounded-md text-[15px] bg-white transition-colors focus:outline-none focus:border-black ${formik.touched.password && formik.errors.password ? 'border-red-500 bg-red-50 focus:border-red-500' : ''}`}
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={PASSWORD_MAX}
              disabled={formik.isSubmitting}
              autoComplete="off"
            />
            <div>
              {formik.values.password.length === PASSWORD_MAX && (
                <span className="text-xs font-medium text-red-500 animate-fade-in">Maximum limit reached</span>
              )}
              {formik.touched.password && formik.errors.password && (
                <span className="text-xs font-medium text-red-500 animate-slide-down">{formik.errors.password}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-black text-white py-3.5 text-[16px] font-bold uppercase rounded-md cursor-pointer transition-all mt-2 hover:bg-[#333] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed ${formik.isSubmitting ? 'opacity-80' : ''}`}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6 text-[15px] text-gray-500">
          Don't have an account? <Link to="/register" className="text-black font-bold hover:underline">Create one</Link>
        </div>
      </div>
    </div>
  );
}