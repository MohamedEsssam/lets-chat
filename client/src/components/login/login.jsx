import React from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { toast } from "react-toastify";
import LoginForm from "./loginForm";
import loginSchema from "./validation";
import { login } from "../../services/userServices";

const Login = React.memo(() => {
  const history = useHistory();

  const onSubmit = async (values) => {
    try {
      const user = await login(values);
      if (user) {
        toast.success(`Welcome ${user.name} 🎉🎊`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 6000,
        });

        history.push({
          pathname: "/",
          user: user,
        });
      }
    } catch (err) {
      if (err.response.status === 404)
        toast.error("invalid email or password 😞", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 6000,
        });
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={onSubmit}
      >
        {(handleChange, handleSubmit, error, setFieldTouched, touched) => (
          <>
            <LoginForm />
          </>
        )}
      </Formik>
    </>
  );
});

export default Login;
