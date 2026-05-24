/**
 * Common validation rules for forms
 */

export const validationRules = {
  // Text fields
  required: (fieldName = 'Field') => ({
    required: `${fieldName} talab qilinadi`,
  }),

  email: {
    required: 'Email talab qilinadi',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Noto\'g\'ri email adresi',
    },
  },

  password: (minLength = 6) => ({
    required: 'Parol talab qilinadi',
    minLength: {
      value: minLength,
      message: `Parol kamida ${minLength} ta belgini o'z ichiga olishi kerak`,
    },
  }),

  phone: {
    required: 'Telefon raqami talab qilinadi',
    pattern: {
      value: /^[\d\s\-\+\(\)]+$/,
      message: 'Noto\'g\'ri telefon raqami',
    },
    minLength: {
      value: 9,
      message: 'Telefon raqami juda qisqa',
    },
  },

  url: {
    required: 'URL talab qilinadi',
    pattern: {
      value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      message: 'Noto\'g\'ri URL',
    },
  },

  minLength: (length) => ({
    minLength: {
      value: length,
      message: `Kamida ${length} ta belgi kiriting`,
    },
  }),

  maxLength: (length) => ({
    maxLength: {
      value: length,
      message: `Ko'p bilan ${length} ta belgi kiritish mumkin`,
    },
  }),

  textLength: (min, max) => ({
    required: 'Ushbu maydon talab qilinadi',
    minLength: {
      value: min,
      message: `Kamida ${min} ta belgi kiriting`,
    },
    maxLength: {
      value: max,
      message: `Ko'p bilan ${max} ta belgi kiritish mumkin`,
    },
  }),

  number: {
    required: 'Raqam talab qilinadi',
    pattern: {
      value: /^[0-9]+$/,
      message: 'Faqat raqamlar kiritilishi mumkin',
    },
  },

  customPattern: (pattern, message = 'Noto\'g\'ri format') => ({
    required: 'Ushbu maydon talab qilinadi',
    pattern: {
      value: pattern,
      message,
    },
  }),
};

/**
 * Custom validators
 */
export const customValidators = {
  matchPassword: (getValues) => (value) => {
    return value === getValues('password') || 'Parollar mos kelmadi';
  },

  isAgeValid: (minAge = 18) => (value) => {
    const age = parseInt(value);
    return age >= minAge || `Siz ${minAge} yoshda bo'lishingiz kerak`;
  },

  isPhoneValid: (value) => {
    const phoneRegex = /^(\+?[0-9]{1,3}[-.\s]?)?[0-9]{2,14}$/;
    return phoneRegex.test(value) || 'Noto\'g\'ri telefon raqami';
  },

  isNameValid: (value) => {
    return value?.trim().length >= 2 || 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak';
  },
};
