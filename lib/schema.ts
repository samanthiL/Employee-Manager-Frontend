import { z } from "zod";
export const schema = z.object({
  first_name: z
    .string()
    .min(1, {
      message:
        "Should not be null and should only allow alphabets, min 6 character and max 10 characters",
    }),
  last_name: z
    .string()
    .min(1, {
      message:
        "Should not be null and should only allow alphabets, min 6 character and max 10 characters",
    }),
  email: z.string().email({ message: "email validation." }),
  number: z.string().min(6, { message: "LK phone number validation." }),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Dropdown with two options M and F" }),
  }),
});
export type FormData = z.infer<typeof schema>;
