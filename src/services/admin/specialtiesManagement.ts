import { serverFetch } from '@/lib/auth-fetch';
import { zodValidator } from '@/lib/zodValidator';
import { createSpecialtiesZodSchema } from '@/zod/specialties.validation';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const createSpecialties = async (_prevState: any, formData: FormData) => {
  try {
    const payload = {
      title: formData.get('title') as string,
    };

    if (zodValidator(payload, createSpecialtiesZodSchema).success === false) {
      return zodValidator(payload, createSpecialtiesZodSchema);
    }

    const validationPayload = zodValidator(payload, createSpecialtiesZodSchema).data;
    const newFormData = new FormData();
    newFormData.append('data', JSON.stringify(validationPayload));
    if (formData.get('file')) newFormData.append('file', formData.get('file') as Blob);

    const response = await serverFetch.post('/specialties', {
      body: newFormData,
    });

    return await response.json();
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`,
    };
  }
};

export const getSpecialties = async () => {
  try {
    const response = await serverFetch.get('/specialties');
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`,
    };
  }
};

export const deleteSpecialties = async (id: string) => {
  try {
    const response = await serverFetch.delete('/specialties');
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`,
    };
  }
};
