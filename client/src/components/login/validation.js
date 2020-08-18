import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Enter valid email").required("Email is required"),
  password: Yup.string().required("password is require"),
});

export default loginSchema;
