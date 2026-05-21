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
  const NAME_MAX = 50;
  const EMAIL_MAX = 50;
  const PASSWORD_MAX = 20;
  const inputClass = (touched, error) => {
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
            Create Account
          </h1>
          <p className="text-sm text-gray-600">Join GENZ.STORE for exclusive drops</p>
        </div>
      
        {formik.errors.submit && (
          <div className="px-4 py-3 mb-6 text-xs font-medium text-red-600 border border-red-200 rounded bg-red-50 md:text-sm animate-slide-down">
            {formik.errors.submit}
          </div>
        )}
        {/* Form */}
        <form className="space-y-5" onSubmit={formik.handleSubmit} noValidate>
          
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest text-gray-800 uppercase">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              className={inputClass(formik.touched.name, formik.errors.name)}
              placeholder="Enter your full name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={NAME_MAX}
              disabled={formik.isSubmitting}
              autoComplete="off"
            />
            <div className="h-5">
              {formik.values.name.length === NAME_MAX && (
                <span className="text-xs font-bold text-red-500 animate-fade-in">
                  Maximum limit reached
                </span>
              )}
              {formik.touched.name && formik.errors.name && (
                <span className="text-xs font-medium text-red-500 animate-slide-down">
                  {formik.errors.name}
                </span>
              )}
            </div>
          </div>
         
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest text-gray-800 uppercase">
              Email Address *
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
              Password *
            </label>
            <input
              type="password"
              name="password"
              className={inputClass(formik.touched.password, formik.errors.password)}
              placeholder="Min. 6 chars, Max. 20 chars"
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
