/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/server-fetch';
import { zodValidator } from '@/lib/zodValidator';
import { registerValidationZodSchema } from '@/zod/auth.validation';
import { loginUser } from './loginUser';

export const registerPatient = async (_currentState: any, formData: any) => {
  try {
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      address: formData.get('address'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    };

    if (zodValidator(payload, registerValidationZodSchema).success === false)
      return zodValidator(payload, registerValidationZodSchema);

    const validatedPayload: any = zodValidator(payload, registerValidationZodSchema).data;

    const registerData = {
      password: validatedPayload.password,
      patient: {
        name: validatedPayload.name,
        email: validatedPayload.email,
        address: validatedPayload.address,
      },
    };

    const newFormData = new FormData();
    newFormData.append('data', JSON.stringify(registerData));

    const res = await serverFetch.post('/user/create-patient', {
      body: newFormData,
    });

    const result = await res.json();

    if (result?.success) {
      await loginUser(_currentState, formData);
    }

    return result;
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }

    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Register Failed. Please try again.'}`,
    };
  }
};
