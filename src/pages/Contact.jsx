import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";


export default function Contact({ addToast }) {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters'),
    email: Yup.string()
      .required('Email is required')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
      .max(50, 'Email must not exceed 50 characters'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
      .min(10, 'Phone number must be 10 digits')
      .max(10, 'Phone number must be 10 digits'),
    message: Yup.string()
      .required('Message is required')
      .min(10, 'Message must be at least 10 characters')
      .max(500, 'Message must not exceed 500 characters')
  });


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted', values);
      addToast?.('Message sent successfully!', 'success');
      formik.resetForm();
      setTimeout(() => {
        navigate('/');
      }, 2000);
    },
  });

  
  const inputBaseClass = "w-full px-4 py-3 border-2 border-gray-200 rounded-md text-[15px] outline-none transition-all duration-200 focus:border-black resize-none";
  const errorInputClass = "border-red-500 focus:border-red-500 bg-red-50/30";
  return (
    <div className="min-h-screen bg-[#ebe7e7] pt-[120px] pb-16 px-4">
      <div className="w-full max-w-[600px] mx-auto bg-white rounded-xl shadow-sm p-8 md:p-10">
       
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-[32px] font-black text-black mb-2">
            Contact Us
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Have questions? We'd love to hear from you!
          </p>
        </div>
       
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-800" htmlFor="name">
              Full Name 
            </label>
            <input
              id="name"
              name="name"
              type="text" 
              className={`${inputBaseClass} ${formik.touched.name && formik.errors.name ? errorInputClass : ''}`}
              placeholder="Enter your full name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} 
            />
            {formik.touched.name && formik.errors.name && (
              <span className="text-xs text-red-500 font-medium">{formik.errors.name}</span>
            )}
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-800" htmlFor="email">
              Email Address 
            </label>
            <input 
              type="text"
              id="email"
              name="email"
              className={`${inputBaseClass} ${formik.touched.email && formik.errors.email ? errorInputClass : ''}`}
              placeholder="your@email.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-xs text-red-500 font-medium">{formik.errors.email}</span>
            )}
          </div>
         
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-800" htmlFor="phone">
              Phone Number (Optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              className={`${inputBaseClass} ${formik.touched.phone && formik.errors.phone ? errorInputClass : ''}`}
              placeholder="Enter your number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={10}
            />
            {formik.touched.phone && formik.errors.phone && (
              <span className="text-xs text-red-500 font-medium">{formik.errors.phone}</span>
            )}
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-800" htmlFor="message">
              Your Message 
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className={`${inputBaseClass} min-h-[120px] ${formik.touched.message && formik.errors.message ? errorInputClass : ''}`}
              placeholder="Write your message here..."
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="flex justify-between items-start mt-1">
              {formik.touched.message && formik.errors.message ? (
                <span className="text-xs text-red-500 font-medium">{formik.errors.message}</span>
              ) : <div />}
              <span className="text-[11px] text-gray-400 font-medium">
                {formik.values.message.length}/500 characters
              </span>
            </div>
          </div>
         
          <button
            type="submit"
            className="w-full bg-black text-white py-4 mt-2 rounded-lg font-bold text-base uppercase tracking-wide transition-all duration-200 hover:bg-gray-800 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
