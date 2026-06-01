import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format')
    .max(50, 'Email must not exceed 50 characters'),
  password: Yup.string()
    .required('Password is required')
    .max(20, 'Password must not exceed 20 characters'),
});

export const registerSchema = Yup.object({
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

export const contactSchema = Yup.object({
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
