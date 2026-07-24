/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import z from 'zod';
import { loginUser } from './loginUser';

const registerValidationZodSchema = z
  .object({
    name: z
      .string('Name is required')
      .min(2, { error: 'Name should be atleast 2 characters long' }),
    address: z.string().optional(),
    email: z.email('Email is required'),
    password: z
      .string()
      .min(6, 'Password is required and mininum 6 characters long')
      .max(100, 'Password should be maximum 100 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm Password is required and mininum 6 characters long')
      .max(100, 'Password should be maximum 100 characters long'),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    error: 'Password do not matched',
    path: ['confirmPassword'],
  });

export const registerPatient = async (_currentState: any, formData: any) => {
  try {
    const validationData = {
      name: formData.get('name'),
      email: formData.get('email'),
      address: formData.get('address'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    };

    const validationFields = registerValidationZodSchema.safeParse(validationData);

    if (validationFields.error) {
      return {
        success: false,
        errors: validationFields.error.issues.map((err) => {
          return {
            field: err.path[0],
            message: err.message,
          };
        }),
      };
    }

    const registerData = {
      password: formData.get('password'),
      patient: {
        name: formData.get('name'),
        email: formData.get('email'),
        address: formData.get('address'),
      },
    };

    const newFormData = new FormData();
    newFormData.append('data', JSON.stringify(registerData));

    const res = await fetch('http://localhost:5000/api/v1/user/create-patient', {
      method: 'POST',
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
