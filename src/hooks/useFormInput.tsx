import { ReactNode } from 'react';

type ErrorMessageFn = (touched?: boolean, error?: string) => ReactNode;

type InputClassFn = (touched?: boolean, error?: string, baseClass?: string) => string;

type MaxLengthWarningFn = (currentLength: number, maxLength: number) => ReactNode;

export const useFormInput = () => {
  const getInputClass: InputClassFn = (touched, error, baseClass) => {
    const defaultBase = baseClass || 'w-full px-4 py-3 md:py-4 border-2 rounded text-sm md:text-base bg-white transition-all duration-200 ease-in focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed';

    if (touched && error) {
      return `${defaultBase} border-red-500 bg-red-50 focus:border-red-500`;
    }
    return `${defaultBase} border-gray-300 focus:border-black`;
  };

  const getErrorMessage: ErrorMessageFn = (touched, error) => {
    if (touched && error) {
      return (
        <span className="text-xs font-medium text-red-500 animate-slide-down">
          {error}
        </span>
      );
    }
    return null;
  };

  const getMaxLengthWarning: MaxLengthWarningFn = (currentLength, maxLength) => {
    if (currentLength === maxLength) {
      return (
        <span className="text-xs font-bold text-red-500 animate-fade-in">
          Maximum limit reached
        </span>
      );
    }
    return null;
  };

  return {
    getInputClass,
    getErrorMessage,
    getMaxLengthWarning,
  };
};