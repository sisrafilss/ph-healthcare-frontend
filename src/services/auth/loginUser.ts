'use server';

import z from 'zod';

/* eslint-disable @typescript-eslint/no-explicit-any */

const loginValidationZodSchema = z.object({
  email: z.email({ error: 'Email is required' }),
  password: z
    .string({
      error: 'Password is required',
    })
    .min(6, {
      error: 'Password is required and must be at least 6 characters long',
    })
    .max(100, {
      error: 'Password must be at most 100 characters long',
    }),
});

export const loginUser = async (_currentState: any, formData: any): Promise<any> => {
  try {
    const loginData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const validatedFields = loginValidationZodSchema.safeParse(loginData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((err) => {
          return {
            field: err.path[0],
            message: err.message,
          };
        }),
      };
    }

    const res = await fetch('http://localhost:5000/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    return res;
  } catch (err) {
    console.log(err);
    return {
      error: 'Login Failed',
    };
  }
};
