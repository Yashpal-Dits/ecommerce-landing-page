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
    <div className="min-h-screen flex items-center justify-center bg-[#ebe7e7] pt-[100px] px-5 pb-15">
      <div className="w-full max-w-[400px] bg-white rounded-xl py-10 px-[30px] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
        <div className="text-center mb-8">
          <h1 className="text-[32px] font-black text-black mb-2">Create Account</h1>
          <p className="text-base text-gray-500">Join GENZ.STORE for exclusive drops</p>
        </div>

        {formik.errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded py-3 px-4 mb-5 text-xs font-medium text-red-600 animate-slide-down">
            {formik.errors.submit}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit} noValidate>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#333]">Full Name *</label>
            <input
              type="text"
              name="name"
              className={`py-3 px-4 border-2 border-[#e5e7eb] rounded-md text-[15px] bg-white transition-colors focus:outline-none focus:border-black ${formik.touched.name && formik.errors.name ? 'border-red-500 bg-red-50 focus:border-red-500' : ''}`}
              placeholder="Enter your full name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={NAME_MAX}
              disabled={formik.isSubmitting}
              autoComplete="off"
            />
            <div>
              {formik.values.name.length === NAME_MAX && (
                <span className="text-xs font-medium text-red-500 animate-fade-in">Maximum limit reached</span>
              )}
              {formik.touched.name && formik.errors.name && (
                <span className="text-xs font-medium text-red-500 animate-slide-down">{formik.errors.name}</span>
              )}
            </div>
          </div>

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
              placeholder="Min. 6 chars, Max. 20 chars"
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
            {formik.isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-6 text-[15px] text-gray-500">
          Already have an account? <Link to="/login" className="text-black font-bold hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
}