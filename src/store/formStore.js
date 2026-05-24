import { create } from 'zustand';

/**
 * Zustand store for managing form state globally
 */
export const useFormStore = create((set, get) => ({
  // Form state
  formData: {},
  formErrors: {},
  isSubmitting: false,
  isDirty: false,

  // Form actions
  setFormData: (data) => set({ formData: data }),
  updateFormData: (updates) => 
    set((state) => ({ 
      formData: { ...state.formData, ...updates },
      isDirty: true,
    })),
  
  setFormErrors: (errors) => set({ formErrors: errors }),
  clearFormErrors: () => set({ formErrors: {} }),
  
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setIsDirty: (isDirty) => set({ isDirty }),

  // Reset form
  resetForm: () => set({
    formData: {},
    formErrors: {},
    isSubmitting: false,
    isDirty: false,
  }),

  // Get specific field value
  getFieldValue: (fieldName) => {
    const state = get();
    return state.formData[fieldName];
  },

  // Set specific field value
  setFieldValue: (fieldName, value) => {
    const state = get();
    set({
      formData: { ...state.formData, [fieldName]: value },
      isDirty: true,
    });
  },

  // Get form state snapshot
  getFormState: () => get(),
}));

/**
 * Hook for using specific parts of form store
 */
export const useFormState = () => {
  const { formData, formErrors, isSubmitting, isDirty } = useFormStore();
  return { formData, formErrors, isSubmitting, isDirty };
};

/**
 * Hook for form actions
 */
export const useFormActions = () => {
  const {
    setFormData,
    updateFormData,
    setFormErrors,
    clearFormErrors,
    setIsSubmitting,
    resetForm,
    setFieldValue,
  } = useFormStore();

  return {
    setFormData,
    updateFormData,
    setFormErrors,
    clearFormErrors,
    setIsSubmitting,
    resetForm,
    setFieldValue,
  };
};
