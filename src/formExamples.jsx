/**
 * FORM EXAMPLES - Pages va Components fayllarida qanday ishlatishni ko'rsatish
 * Bu faylni o'qib, o'z forma yaratishingiz uchun namuna sifatida foydalaning
 */

import { useFormHandler } from './hooks/useFormHandler';
import { validationRules, customValidators } from './utils/validationRules';
import { useFormStore } from './store/formStore';
import { getFieldError, hasFieldError } from './utils/formHelpers';

/**
 * MISOL 1: Oddiy Login Formas
 * Pages/Home.jsx yoki boshqa joyda ishlatish uchun
 */
export const LoginFormExample = () => {
  const { register, handleSubmit, formState: { errors } } = useFormHandler({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async (data) => {
      console.log('Login data:', data);
      // API ga yuborish
      // const response = await authService.login(data.email, data.password);
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          {...register('email', validationRules.email)}
          className={`w-full px-4 py-2 border rounded-lg ${
            hasFieldError(errors, 'email') ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="email@example.com"
        />
        {getFieldError(errors, 'email') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'email')}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Parol</label>
        <input
          type="password"
          {...register('password', validationRules.password())}
          className={`w-full px-4 py-2 border rounded-lg ${
            hasFieldError(errors, 'password') ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="••••••••"
        />
        {getFieldError(errors, 'password') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'password')}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Kirish
      </button>
    </form>
  );
};

/**
 * MISOL 2: Ro'yxatdan O'tish Formas
 * Pages/Kontakt.jsx yoki boshqa joyda ishlatish uchun
 */
export const RegisterFormExample = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useFormHandler({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    onSubmit: async (data) => {
      console.log('Register data:', data);
      // API ga yuborish
      // const response = await authService.register(data);
    },
  });

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Ism</label>
          <input
            type="text"
            {...register('firstName', validationRules.required('Ism'))}
            className="w-full px-4 py-2 border rounded-lg border-gray-300"
            placeholder="Ism"
          />
          {getFieldError(errors, 'firstName') && (
            <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'firstName')}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Familiya</label>
          <input
            type="text"
            {...register('lastName', validationRules.required('Familiya'))}
            className="w-full px-4 py-2 border rounded-lg border-gray-300"
            placeholder="Familiya"
          />
          {getFieldError(errors, 'lastName') && (
            <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'lastName')}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          {...register('email', validationRules.email)}
          className="w-full px-4 py-2 border rounded-lg border-gray-300"
          placeholder="email@example.com"
        />
        {getFieldError(errors, 'email') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'email')}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Telefon</label>
        <input
          type="tel"
          {...register('phone', validationRules.phone)}
          className="w-full px-4 py-2 border rounded-lg border-gray-300"
          placeholder="+998 (XX) XXX-XX-XX"
        />
        {getFieldError(errors, 'phone') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'phone')}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Parol</label>
        <input
          type="password"
          {...register('password', validationRules.password(8))}
          className="w-full px-4 py-2 border rounded-lg border-gray-300"
          placeholder="••••••••"
        />
        {getFieldError(errors, 'password') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'password')}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Parolni Tasdiqlang</label>
        <input
          type="password"
          {...register('confirmPassword', {
            validate: customValidators.matchPassword(() => password),
          })}
          className="w-full px-4 py-2 border rounded-lg border-gray-300"
          placeholder="••••••••"
        />
        {getFieldError(errors, 'confirmPassword') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'confirmPassword')}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('acceptTerms', validationRules.required())}
          className="w-4 h-4"
        />
        <label className="ml-2 text-sm">Shartlar va qoidalarga roziман</label>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
      >
        Ro'yxatdan O'tish
      </button>
    </form>
  );
};

/**
 * MISOL 3: Zustand Store Bilan Form State Management
 * Komplek formlarda ishlatish uchun
 */
export const FormWithStoreExample = () => {
  const { formData, isSubmitting } = useFormStore();
  const { setIsSubmitting, updateFormData } = useFormStore();

  const { register, handleSubmit, formState: { errors } } = useFormHandler({
    defaultValues: formData,
    onSubmit: async (data) => {
      setIsSubmitting(true);
      try {
        console.log('Submitting:', data);
        updateFormData(data);
        // API ga yuborish
        // await apiCall('/submit', data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Savol</label>
        <textarea
          {...register('question', validationRules.required('Savol'))}
          className="w-full px-4 py-2 border rounded-lg border-gray-300"
          rows="5"
          placeholder="Savolingizni yozing..."
        />
        {getFieldError(errors, 'question') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'question')}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting ? 'Yuborilmoqda...' : 'Yuborish'}
      </button>
    </form>
  );
};

/**
 * MISOL 4: Kontakt Formas
 * Pages/Kontakt.jsx da ishlatish uchun
 */
export const ContactFormExample = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useFormHandler({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    onSubmit: async (data) => {
      console.log('Contact form:', data);
      // Yuboringiz API ga
      // await formService.submitForm(data);
      reset();
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Ismingiz</label>
        <input
          type="text"
          {...register('name', validationRules.required('Ismingiz'))}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {getFieldError(errors, 'name') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'name')}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          {...register('email', validationRules.email)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {getFieldError(errors, 'email') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'email')}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Mavzu</label>
        <input
          type="text"
          {...register('subject', validationRules.required('Mavzu'))}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {getFieldError(errors, 'subject') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'subject')}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Xabar</label>
        <textarea
          {...register('message', validationRules.required('Xabar'))}
          className="w-full px-4 py-2 border rounded-lg"
          rows="6"
        />
        {getFieldError(errors, 'message') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'message')}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Xabar Yuborish
      </button>
    </form>
  );
};

/**
 * QO'LLANMA:
 * 
 * 1. O'z Pages/Components fayllaringizda bu misollardagi kodni taqlid qiling
 * 
 * 2. Validation Rules:
 *    - validationRules.required('Nomi') - Majbur maydon
 *    - validationRules.email - Email validation
 *    - validationRules.phone - Telefon validation
 *    - validationRules.password() - Parol validation
 *    - validationRules.minLength(5) - Minimum uzunlik
 * 
 * 3. Zustand Store ishlatish:
 *    import { useFormStore, useFormState, useFormActions } from './store/formStore';
 *    const { formData } = useFormState();
 *    const { setFormData } = useFormActions();
 * 
 * 4. API Chaqirishlar:
 *    import { post, get, authService } from './services/api';
 *    const response = await post('/endpoint', data);
 * 
 * 5. Error Handlers:
 *    import { getFieldError, hasFieldError } from './utils/formHelpers';
 *    {hasFieldError(errors, 'fieldName') && ...}
 */
