/**
 * Form helper utilities
 */

/**
 * Get error message for a field
 * @param {Object} errors - Form errors object
 * @param {string} fieldName - Field name
 * @returns {string} Error message or empty string
 */
export const getFieldError = (errors, fieldName) => {
  return errors?.[fieldName]?.message || '';
};

/**
 * Check if field has error
 * @param {Object} errors - Form errors object
 * @param {string} fieldName - Field name
 * @returns {boolean} True if field has error
 */
export const hasFieldError = (errors, fieldName) => {
  return !!errors?.[fieldName];
};

/**
 * Get error class for styling
 * @param {Object} errors - Form errors object
 * @param {string} fieldName - Field name
 * @param {Object} options - Additional options
 * @returns {string} CSS class string
 */
export const getErrorClass = (errors, fieldName, options = {}) => {
  const {
    errorClass = 'border-red-500',
    normalClass = 'border-gray-300',
  } = options;

  return hasFieldError(errors, fieldName) ? errorClass : normalClass;
};

/**
 * Clear form errors
 * @param {Object} formMethods - React Hook Form methods
 * @param {Array} fieldNames - Field names to clear
 */
export const clearFormErrors = (formMethods, fieldNames = []) => {
  if (fieldNames.length === 0) {
    formMethods.clearErrors();
  } else {
    fieldNames.forEach(fieldName => {
      formMethods.clearErrors(fieldName);
    });
  }
};

/**
 * Reset form to initial state
 * @param {Object} formMethods - React Hook Form methods
 * @param {Object} values - Values to reset to
 */
export const resetForm = (formMethods, values = {}) => {
  formMethods.reset(values);
};

/**
 * Set field value programmatically
 * @param {Object} formMethods - React Hook Form methods
 * @param {string} fieldName - Field name
 * @param {*} value - Value to set
 */
export const setFieldValue = (formMethods, fieldName, value) => {
  formMethods.setValue(fieldName, value, { shouldValidate: true });
};

/**
 * Get all form values
 * @param {Object} formMethods - React Hook Form methods
 * @returns {Object} All form values
 */
export const getFormValues = (formMethods) => {
  return formMethods.getValues();
};

/**
 * Format form errors for display
 * @param {Object} errors - Form errors object
 * @returns {Array} Formatted error messages
 */
export const formatFormErrors = (errors) => {
  return Object.entries(errors).map(([field, error]) => ({
    field,
    message: error?.message || 'Xatolik yuz berdi',
  }));
};

/**
 * Disable form submission (useful for async operations)
 * @param {Object} formMethods - React Hook Form methods
 * @param {boolean} disabled - Disable state
 */
export const setFormDisabled = (formMethods, disabled = true) => {
  // This is a helper function for tracking disabled state
  return { isDisabled: disabled };
};

/**
 * Validate a single field
 * @param {Object} formMethods - React Hook Form methods
 * @param {string} fieldName - Field name to validate
 */
export const validateField = async (formMethods, fieldName) => {
  return await formMethods.trigger(fieldName);
};

/**
 * Validate multiple fields
 * @param {Object} formMethods - React Hook Form methods
 * @param {Array} fieldNames - Field names to validate
 */
export const validateFields = async (formMethods, fieldNames = []) => {
  return await formMethods.trigger(fieldNames.length > 0 ? fieldNames : undefined);
};
