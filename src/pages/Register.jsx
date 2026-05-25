import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFormInput } from '../hooks/useFormInput';

const registerSchema = Yup.object({
  name: Yup.string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format')
    .max(50, 'Email must not exceed 50 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must not exceed 20 characters'),
  role: Yup.string()
    .required('Please select a role')
    .oneOf(['customer', 'admin', 'super_admin'], 'Invalid role selected'),
});

const NAME_MAX = 50;
const EMAIL_MAX = 50;
const PASSWORD_MAX = 20;

export default function Register({ addToast }) {
  const navigate = useNavigate();
  const { getInputClass, getErrorMessage, getMaxLengthWarning } = useFormInput();

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', role: 'customer' },
    validationSchema: registerSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        const registeredUsers = JSON.parse(
          localStorage.getItem('registeredUsers') || '[]'
        );
        const emailExists = registeredUsers.some((u) => u.email === values.email);
        if (emailExists) {
          addToast?.('Email already registered. Please login.', 'error');
          setErrors({ submit: 'Email already registered. Please login.' });
          setSubmitting(false);
          return;
        }
        const username = values.email.split('@')[0];
        const newUser = {
          id: Date.now().toString(),
          firstName: values.name.split(' ')[0],
          lastName: values.name.split(' ').slice(1).join(' ') || '',
          username,
          email: values.email,
          password: values.password,
          role: values.role,
          image: 'https://i.pravatar.cc/150?img=12',
          dummyUsername: 'emilys',
          dummyPassword: 'emilyspass',
        };
        registeredUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        addToast?.('Account created successfully! Please login.', 'success');
        resetForm();
        setTimeout(() => navigate('/login'), 1000);
      } catch (err) {
        console.error('Register error:', err);
        setErrors({ submit: err.message || 'Something went wrong. Please try again.' });
        addToast?.(err.message || 'Something went wrong. Please try again.', 'error');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-16 bg-gray-100 md:py-20">
      <div className="w-full max-w-md px-6 py-12 bg-white border border-gray-200 rounded-lg md:px-10">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-black text-black md:text-3xl">
            Create Account
          </h1>
          <p className="text-sm text-gray-600">Join GENZ.STORE for exclusive drops</p>
        </div>

        {formik.errors.submit && (
          <div className="px-4 py-3 mb-6 text-xs font-medium text-red-600 border border-red-200 rounded bg-red-50 md:text-sm animate-slide-down">
            {formik.errors.submit}
          </div>
        )}

        <form className="space-y-5" onSubmit={formik.handleSubmit} noValidate>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest text-gray-800 uppercase">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              className={getInputClass(formik.touched.name, formik.errors.name)}
              placeholder="Enter your full name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={NAME_MAX}
              disabled={formik.isSubmitting}
              autoComplete="off"
            />
            <div className="h-5">
              {getMaxLengthWarning(formik.values.name.length, NAME_MAX)}
              {getErrorMessage(formik.touched.name, formik.errors.name)}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest text-gray-800 uppercase">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              className={getInputClass(formik.touched.email, formik.errors.email)}
              placeholder="your@email.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={EMAIL_MAX}
              disabled={formik.isSubmitting}
              autoComplete="off"
            />
            <div className="h-5">
              {getMaxLengthWarning(formik.values.email.length, EMAIL_MAX)}
              {getErrorMessage(formik.touched.email, formik.errors.email)}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest text-gray-800 uppercase">
              Password *
            </label>
            <input
              type="password"
              name="password"
              className={getInputClass(formik.touched.password, formik.errors.password)}
              placeholder="Min. 6 chars, Max. 20 chars"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={PASSWORD_MAX}
              disabled={formik.isSubmitting}
              autoComplete="off"
            />
            <div className="h-5">
              {getMaxLengthWarning(formik.values.password.length, PASSWORD_MAX)}
              {getErrorMessage(formik.touched.password, formik.errors.password)}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest text-gray-800 uppercase">
              Select Role *
            </label>
            <select
              name="role"
              className={getInputClass(formik.touched.role, formik.errors.role)}
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
            <div className="h-5">
              {getErrorMessage(formik.touched.role, formik.errors.role)}
            </div>
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full py-3 mt-2 text-sm font-bold text-white uppercase transition-all duration-200 bg-black rounded md:py-4 md:text-base hover:bg-gray-800 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? 'Creating Account…' : 'Create Account'}
          </button>
        </form>

        <div className="pt-6 mt-6 text-sm text-center text-gray-600 border-t border-gray-200">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-bold text-black transition-opacity duration-200 hover:opacity-70"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}