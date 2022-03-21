import { object, string } from "yup";

export const createUserDto = object({
  firstName: string().required().trim().min(2),
  lastName: string().required().trim().min(2),
  email: string().required().trim().lowercase().email(),
  password: string().required().trim().min(6),
  confirmPassword: string()
    .required()
    .trim()
    .min(6)
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

export const loginUserDto = object({
  email: string().required().trim().lowercase().email(),
  password: string().required().trim().min(6),
});

// Just for reference
// export const createUserSchema = object({
//   body: object({
//     firstName: string().required(),
//     lastName: string().required(),
//     email: string().required(),
//     password: string().required(),
//   }),
//   query: object({}),
//   params: object({}),
// });
