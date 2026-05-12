import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import './Contact.css';

export default function Contact({ addToast }) {
    const navigate = useNavigate();

    //Yup validation

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required')
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name must not exceed 50 characters'),

        email: Yup.string()
            .required('email is required')
            .email('Invalid  email format')
            .max(50, 'Email must  not  exceed 50 characters'),

        phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
            .min(10, 'Phone number must be 10 digits')
            .max(10, 'Phone number must  be 10 digits'),

        message: Yup.string()
            .required('Message is required')
            .min(10, 'Message  must be at least 10 characters')
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

            addToast && addToast('Message sent successfully!', 'success')

            formik.resetForm();

            setTimeout(() => {
                navigate('/')
            }, 2000);
        },
    });

    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-header">
                    <h1>Contact Us</h1>
                    <p>Have questions? We'd love to hear from you!</p>
                </div>

                <form className="contact-form" onSubmit={formik.handleSubmit}>
                    <div className="form-field">
                        <label className="form-label" htmlFor="name">Full Name * </label>
                        <input
                            id="name"
                            name="name"
                            type="text" className={`form-input ${formik.touched.name && formik.errors.name ? 'input-error' : ''}`}
                            placeholder="Enter your full name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.touched.name && formik.errors.name && (
                            <span className="error-msg">{formik.errors.name}</span>
                        )}
                    </div>

                    <div className="form-field">
                        <label htmlFor="email" className="form-label">Email Address * </label>
                        <input type="text"
                            id="email"
                            name="email"
                            className={`form-input ${formik.touched.email && formik.errors.email ? 'input-error' : ''}`}
                            placeholder="your@email.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label" htmlFor="phone">
                            Phone Number (Optional)
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            className={`form-input ${formik.touched.phone && formik.errors.phone ? 'input-error' : ''}`}
                            placeholder="Enter your number"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            maxLength={10}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <span className="error-msg">{formik.errors.phone}</span>
                        )}
                    </div>
                    <div className="form-field">
                        <label className="form-label" htmlFor="message">
                            Your Message *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            className={`form-input ${formik.touched.message && formik.errors.message ? 'input-error' : ''}`}
                            placeholder="Write your message here..."
                            value={formik.values.message}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.message && formik.errors.message && (
                            <span className="error-msg">{formik.errors.message}</span>
                        )}

                        <span className="char-count">
                            {formik.values.message.length}/500 characters
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>

                </form>
            </div>
        </div>
    )
}
