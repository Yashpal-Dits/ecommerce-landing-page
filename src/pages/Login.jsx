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
    <div className="min-h-screen flex items-center justify-center bg-[#f3f5f8] px-4 py-20">
      <div className="w-full max-w-[380px] bg-white p-10 rounded-[30px] border border-slate-200 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.18)]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-950 mb-1 tracking-[-0.04em]">Welcome Back</h1>
          <p className="text-sm text-slate-500">Sign in to continue to GENZ.STORE</p>
        </div>

        {formik.errors.submit && (
          <div className="bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-2xl p-4 mb-5 text-xs font-medium text-red-700">
            {formik.errors.submit}
          </div>
        )}

        <form className="space-y-4" onSubmit={formik.handleSubmit} noValidate>
          <div className="space-y-2">
            <label className="block text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-600">Email</label>
            <input
              type="text"
              name="email"
              className={`w-full rounded-[16px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition duration-200 ease-in-out focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 focus:outline-none ${formik.touched.email && formik.errors.email ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              placeholder="your@email.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={EMAIL_MAX}
              disabled={formik.isSubmitting}
              autoComplete="off"
            />
            <div className="space-y-1">
              {formik.values.email.length === EMAIL_MAX && (
                <span className="text-[11px] font-medium text-red-600">Maximum limit reached</span>
              )}
              {formik.touched.email && formik.errors.email && (
                <span className="text-[11px] font-medium text-red-600">{formik.errors.email}</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-600">Password</label>
            <input
              type="password"
              name="password"
              className={`w-full rounded-[16px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition duration-200 ease-in-out focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 focus:outline-none ${formik.touched.password && formik.errors.password ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={PASSWORD_MAX}
              disabled={formik.isSubmitting}
              autoComplete="off"
            />
            <div className="space-y-1">
              {formik.values.password.length === PASSWORD_MAX && (
                <span className="text-[11px] font-medium text-red-600">Maximum limit reached</span>
              )}
              {formik.touched.password && formik.errors.password && (
                <span className="text-[11px] font-medium text-red-600">{formik.errors.password}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full rounded-[16px] bg-slate-950 py-3.5 text-sm font-semibold uppercase text-white transition duration-200 ease-in-out ${formik.isSubmitting ? 'cursor-wait opacity-80' : 'hover:bg-slate-800'} disabled:bg-slate-400 disabled:cursor-not-allowed`}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-slate-500">
          Don't have an account? <Link to="/register" className="font-semibold text-slate-950 hover:text-slate-700">Create one</Link>
        </div>
      </div>
    </div>
  );
}