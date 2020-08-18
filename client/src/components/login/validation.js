import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Enter valid email").required("Email is required"),
  password: Yup.string()
    .min(4, "should be 4 characters minimum")
    .matches(
      "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])",
      "password must contain letter and capital letter and numbers"
    )
    .required("password is require"),
});

export default loginSchema;
