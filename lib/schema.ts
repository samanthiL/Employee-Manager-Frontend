
import { z } from "zod";

const nameValidationMsg =
  "Should not be null and should only allow alphabets, min 6 characters and max 10 characters";

export const employeeSchema = z.object({
  first_name: z
    .string()
    .min(6, { message: nameValidationMsg })
    .max(10, { message: nameValidationMsg })
    .regex(/^[A-Za-z]+$/, { message: "First name should contain only alphabets" }),

  last_name: z
    .string()
    .min(6, { message: nameValidationMsg })
    .max(10, { message: nameValidationMsg })
    .regex(/^[A-Za-z]+$/, { message: "Last name should contain only alphabets" }),

  email: z.string().email({ message: "Email validation." }),

  number: z
    .string()
  .regex(/^\+94\d{9}$/, {
      message: "LK phone number validation. Format: +94XXXXXXXXX ",
    }), 

   gender: z.enum(['M', 'F'], { message: 'Gender is required' })

});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
