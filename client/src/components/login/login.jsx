import React from "react";
import { Formik } from "formik";
import LoginForm from "./loginForm";
import loginSchema from "./validation";

const Login = () => {
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(handleChange, handleSubmit, error, setFieldTouched, touched) => (
          <>
            <LoginForm />
          </>
        )}
      </Formik>
    </>
  );
};

export default Login;
