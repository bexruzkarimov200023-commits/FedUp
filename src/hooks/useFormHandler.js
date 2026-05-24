import { useForm } from 'react-hook-form';

/**
 * Custom hook for handling forms with React Hook Form
 * @param {Object} options - Configuration options
 * @param {Object} options.defaultValues - Default form values
 * @param {Object} options.resolver - Validation resolver (yup, zod, etc.)
 * @param {Function} options.onSubmit - Submit handler
 * @returns {Object} - Form methods and state
 */
export const useFormHandler = ({ 
  defaultValues = {}, 
  resolver = null, 
  onSubmit = null 
} = {}) => {
  const methods = useForm({
    defaultValues,
    resolver,
    mode: 'onChange',
  });

  const handleSubmit = async (data) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return {
    ...methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
  };
};

/**
 * Hook for managing form field state
 */
export const useFormField = (name, control, rules = {}) => {
  return {
    name,
    control,
    rules,
  };
};
