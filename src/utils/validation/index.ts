import * as Yup from "yup";
import PhoneNumber from "awesome-phonenumber";

export const PhoneValidation = Yup.string()
  .required("Required")
  .test("validate", "Invalid Number", (value): boolean =>
    new PhoneNumber(value ?? "").isValid()
  );

export const EmailValidation = Yup.string().required("Required").email("Invalid email");

  export const PasswordValidation = Yup.string()
  .required("Required").min(2);

export const NameValidation = Yup.string().required("Required").trim().min(2);

export const StringValidation = Yup.string().required("Required").trim();

 