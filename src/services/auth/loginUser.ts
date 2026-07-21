'use server';

import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from '@/lib/auth-utils';
import { parseCookie } from 'cookie';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import z from 'zod';
import { setCookie } from './tokenHandler';

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
    const redirectTo = formData.get('redirect') || null;
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

    const result = await res.json();

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

    await setCookie('accessToken', accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject['Max-Age']) || 60 * 60 * 1000,
      path: accessTokenObject['Path'] || '/',
      sameSite: accessTokenObject['SameSite'] || 'none',
    });

    await setCookie('refreshToken', refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(refreshTokenObject['Max-Age']) || 60 * 60 * 1000 * 24 * 90,
      path: refreshTokenObject['Path'] || '/',
      sameSite: refreshTokenObject['SameSite'] || 'none',
    });

    const verifiedToken: JwtPayload | string = jwt.verify(
      accessTokenObject.accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET as Secret
    );

    if (typeof verifiedToken === 'string') {
      throw new Error('Invalid token');
    }

    const userRole: UserRole = verifiedToken.role;

    if (!result.success) throw new Error(result?.message || 'Login failed!');

    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectForRole(requestedPath, userRole)) redirect(requestedPath);
      else redirect(getDefaultDashboardRoute(userRole));
    } else redirect(getDefaultDashboardRoute(userRole));
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Login Failed. You might have entered incorrect email or password.'}`,
    };
  }
};
