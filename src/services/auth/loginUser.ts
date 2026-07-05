'use server';

import { parseCookie } from 'cookie';
import { cookies } from 'next/headers';
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
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

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
    });

    const setCookieHeaders = res.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parseCookie(cookie);

        if (parsedCookie['accessToken']) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie['refreshToken']) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error('No Set-Cookie header found');
    }

    const cookieStore = await cookies();

    cookieStore.set('accessToken', accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject['Max-Age']) || 60 * 60 * 1000,
      path: accessTokenObject['Path'] || '/',
      sameSite: accessTokenObject['SameSite'] || 'none',
    });

    cookieStore.set('refreshToken', refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(refreshTokenObject['Max-Age']) || 60 * 60 * 1000 * 24 * 90,
      path: refreshTokenObject['Path'] || '/',
      sameSite: refreshTokenObject['SameSite'] || 'none',
    });

    const result = await res.json();

    return result;
  } catch (err) {
    console.log(err);
    return {
      error: 'Login Failed',
    };
  }
};
