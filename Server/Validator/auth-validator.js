import { z } from 'zod';

const signupSchema = z.object({
    userName: z
        .string({ required_error: 'user name required' })
        .trim()
        .min(3, 'min 3 required')
        .max(255, 'max 255 required'),
    email: z
        .string({ required_error: 'email required' })
        .trim()
        .email({ message: 'Enter valid email address' })
        .min(3, 'min 3 required')
        .max(255, 'max 255 required'),
    phone: z
        .string({ required_error: 'phone required' })
        .trim()
        .min(10, 'min 10 required'),
    password: z
        .string({ required_error: 'password required' })
        .trim()
        .min(3, 'min 3 required')
})