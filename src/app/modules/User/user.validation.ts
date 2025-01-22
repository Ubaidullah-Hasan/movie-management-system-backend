import { z } from 'zod';


const createUserValidationSchema = z.object({
  body: z.object({
    userName: z.string({
      required_error: 'Name is required',
      invalid_type_error: "User name must be string",
    }),
    email: z
      .string({
          required_error: 'Email is required'
        })
      .email({
        message: 'Invalid email',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
    confirmPassword: z.string({
      invalid_type_error: "Password must be string",
      required_error: 'Password is required',
    }),
  }),
});



export const UserValidation = {
  createUserValidationSchema
};
