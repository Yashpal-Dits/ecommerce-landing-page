import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAppStore } from "../store/useAppStore";
import { loginSchema } from "../validations/schemas";
import { fetchUserByEmail } from "../api";
import { UserRole } from '../types';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser, addToast } = useAppStore();

  const formik = useFormik<{ email: string; password: string }>({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
      try {
        const user = await fetchUserByEmail(values.email);

        if (!user) {
          addToast('Email not found. Please register first.', 'error');
          setStatus({ submit: 'Email not found. Please register first.' });
          setSubmitting(false);
          return;
        }

        if (user.password !== values.password) {
          addToast('Incorrect password', 'error');
          setStatus({ submit: 'Incorrect password' });
          setSubmitting(false);
          return;
        }

        const userData = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          image: user.image,
          role: user.role as UserRole,
          tokenVerified: true,
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));
        setCurrentUser(userData);
        addToast(`Welcome back, ${user.firstName}!`, 'success');
        resetForm();
        setTimeout(() => navigate('/'), 1000);
      } catch (err) {
        console.error('Login error:', err);

        const isNetworkError =
          axios.isAxiosError(err) && !err.response;

        const errorMessage = isNetworkError
          ? 'Cannot connect to server. Make sure json-server is running:\n  npm run dev:all'
          : (err as Error).message || 'Something went wrong. Please try again.';

        addToast(errorMessage, 'error');
        setStatus({ submit: errorMessage });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const EMAIL_MAX = 50;
  const PASSWORD_MAX = 20;

  const inputClass = (touched: boolean | undefined, error: string | undefined) => {
    const baseClasses = 'w-full px-4 py-3 md:py-4 border-2 rounded text-sm md:text-base bg-white transition-all duration-200 ease-in focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed';
    if (touched && error) {
      return `${baseClasses} border-red-500 bg-red-50 focus:border-red-500`;
    }
    return `${baseClasses} border-gray-300 focus:border-black`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-16 bg-gray-100 md:py-20">
      <div className="w-full max-w-md px-6 py-12 bg-white border border-gray-200 rounded-lg md:px-10">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-black text-black md:text-3xl">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600">Sign in to continue to GENZ.STORE</p>
        </div>

        {formik.status?.submit && (
          <div className="px-4 py-3 mb-6 text-xs font-medium text-red-600 border border-red-200 rounded bg-red-50 md:text-sm animate-slide-down">
            {formik.status.submit}
          </div>
        )}

        <form className="space-y-5" onSubmit={formik.handleSubmit} noValidate>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest text-gray-800 uppercase">
              Email Address * (required)
            </label>
            <input
              type="email"
              name="email"
              className={inputClass(formik.touched.email, formik.errors.email)}
              placeholder="your@email.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={EMAIL_MAX}
              disabled={formik.isSubmitting}
              autoComplete="off"
            />
            <div className="h-5">
              {formik.values.email.length === EMAIL_MAX && (
                <span className="text-xs font-bold text-red-500 animate-fade-in">
                  Maximum limit reached
                </span>
              )}
              {formik.touched.email && formik.errors.email && (
                <span className="text-xs font-medium text-red-500 animate-slide-down">
                  {formik.errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest text-gray-800 uppercase">
              Password * (required)
            </label>
            <input
              type="password"
              name="password"
              className={inputClass(formik.touched.password, formik.errors.password)}
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={PASSWORD_MAX}
              disabled={formik.isSubmitting}
              autoComplete="off"
            />
            <div className="h-5">
              {formik.values.password.length === PASSWORD_MAX && (
                <span className="text-xs font-bold text-red-500 animate-fade-in">
                  Maximum limit reached
                </span>
              )}
              {formik.touched.password && formik.errors.password && (
                <span className="text-xs font-medium text-red-500 animate-slide-down">
                  {formik.errors.password}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full py-3 mt-2 text-sm font-bold text-white uppercase transition-all duration-200 bg-black rounded md:py-4 md:text-base hover:bg-gray-800 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer" 
          >
            {formik.isSubmitting ? 'Signing In…' : 'Sign In'}
          </button>
        </form>

        <div className="pt-6 mt-6 text-sm text-center text-gray-600 border-t border-gray-200">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-bold text-black transition-opacity duration-200 hover:opacity-70"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;