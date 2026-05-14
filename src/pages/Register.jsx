import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
});

export default function Register({ addToast }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: registerSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        const registeredUsers = JSON.parse(
          localStorage.getItem('registeredUsers') || '[]'
        );

        const emailExists = registeredUsers.some(
          (u) => u.email === values.email
        );
        if (emailExists) {
          addToast('Email already registered. Please login.', 'error');
          setErrors({ submit: 'Email already registered. Please login.' });
          setSubmitting(false);
          return;
        }

        const username = values.email.split('@')[0];

        const newUser = {
          id: Date.now().toString(),
          firstName: values.name.split(' ')[0],
          lastName: values.name.split(' ').slice(1).join(' ') || '',
          username: username,
          email: values.email,
          password: values.password,
          image: 'https://i.pravatar.cc/150?img=12',
          dummyUsername: 'emilys',        
          dummyPassword: 'emilyspass',   
        };

        registeredUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

        addToast('Account created successfully! Please login.', 'success');

        resetForm();

        setTimeout(() => navigate('/login'), 1000);

      } catch (err) {
        console.error('Register error:', err);
        setErrors({ submit: err.message || 'Something went wrong. Please try again.' });
        addToast(err.message || 'Something went wrong. Please try again.', 'error');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const NAME_MAX = 50;
  const EMAIL_MAX = 50;
  const PASSWORD_MAX = 20;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f5f8] px-4 py-20">
      <div className="w-full max-w-[380px] bg-white p-10 rounded-[30px] border border-slate-200 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.18)]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-950 mb-1 tracking-[-0.04em]">Create Account</h1>
          <p className="text-sm text-slate-500">Join GENZ.STORE for exclusive drops</p>
        </div>

        {formik.errors.submit && (
          <div className="bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-2xl p-4 mb-5 text-xs font-medium text-red-700">
            {formik.errors.submit}
          </div>
        )}

        <form className="space-y-4" onSubmit={formik.handleSubmit} noValidate>
          <div className="space-y-2">
            <label className="block text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-600">Full Name</label>
            <input
              type="text"
              name="name"
              className={`w-full rounded-[16px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition duration-200 ease-in-out focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 focus:outline-none ${formik.touched.name && formik.errors.name ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              placeholder="Enter your full name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={NAME_MAX}
              disabled={formik.isSubmitting}
              autoComplete="off"
            />
            <div className="space-y-1">
              {formik.values.name.length === NAME_MAX && (
                <span className="text-[11px] font-medium text-red-600">Maximum limit reached</span>
              )}
              {formik.touched.name && formik.errors.name && (
                <span className="text-[11px] font-medium text-red-600">{formik.errors.name}</span>
              )}
            </div>
          </div>

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
              placeholder="Min. 6 chars, Max. 20 chars"
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
            {formik.isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-slate-500">
          Already have an account? <Link to="/login" className="font-semibold text-slate-950 hover:text-slate-700">Sign in</Link>
        </div>
      </div>
    </div>
  );
}