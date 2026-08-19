/* eslint-disable @typescript-eslint/no-explicit-any */
import z from 'zod';

export const loginValidationZodSchema = z.object({
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

export const registerValidationZodSchema = z
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
