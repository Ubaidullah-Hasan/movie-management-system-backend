import { z } from 'zod';

const loginValidationSchema = z.object({
    body: z.object({
        identifier: z
            .string({ 
                invalid_type_error: 'User must be string.',
                required_error: "Username or Email is required"
            }),
        password: z
            .string({ required_error: 'Password is required' }),
    }),
});



export const AuthValidation = {
    loginValidationSchema,
};
